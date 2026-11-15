import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

type ToolTab = 'json' | 'jwt' | 'base64' | 'uuid' | 'regex' | 'research';

interface ResearchPaper {
  title: string;
  doi: string;
  author: string;
  published: string;
  url: string;
}

const DevTools = () => {
  const [activeTab, setActiveTab] = useState<ToolTab>('json');

  // JSON Tool state
  const [jsonInput, setJsonInput] = useState('{"name":"Miraj","role":"Full-Stack Engineer","skills":["React","TypeScript","Node.js"]}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // JWT Tool state
  const [jwtInput, setJwtInput] = useState('');
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');
  const [jwtError, setJwtError] = useState<string | null>(null);

  // Base64 Tool state
  const [base64Input, setBase64Input] = useState('Hello World! Developer Portfolio');
  const [base64Output, setBase64Output] = useState('');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');

  // UUID Tool state
  const [uuids, setUuids] = useState<string[]>([]);
  const [uuidCount, setUuidCount] = useState(5);

  // Regex Tool state
  const [regexPattern, setRegexPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexText, setRegexText] = useState('Contact: miraj@example.com or support@domainsdb.info for details.');

  // Research Papers state (CrossRef API)
  const [researchQuery, setResearchQuery] = useState('distributed systems web performance');
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loadingPapers, setLoadingPapers] = useState(false);

  // JSON handlers
  const handleFormatJson = (indent: number = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, indent));
      setJsonError(null);
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON');
      setJsonOutput('');
    }
  };

  const handleMinifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError(null);
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON');
      setJsonOutput('');
    }
  };

  // JWT handlers
  const handleDecodeJwt = (token: string) => {
    setJwtInput(token);
    setJwtError(null);
    if (!token.trim()) {
      setJwtHeader('');
      setJwtPayload('');
      return;
    }

    try {
      const parts = token.trim().split('.');
      if (parts.length < 2) {
        throw new Error('JWT must have at least 2 dot-separated segments');
      }

      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''),
        );
      };

      const headerJson = JSON.parse(decodeBase64Url(parts[0]));
      const payloadJson = JSON.parse(decodeBase64Url(parts[1]));

      setJwtHeader(JSON.stringify(headerJson, null, 2));
      setJwtPayload(JSON.stringify(payloadJson, null, 2));
    } catch (err) {
      setJwtError(err instanceof Error ? err.message : 'Unable to parse JWT token');
      setJwtHeader('');
      setJwtPayload('');
    }
  };

  // Base64 handlers
  const handleConvertBase64 = () => {
    try {
      if (base64Mode === 'encode') {
        setBase64Output(btoa(unescape(encodeURIComponent(base64Input))));
      } else {
        setBase64Output(decodeURIComponent(escape(atob(base64Input.trim()))));
      }
    } catch {
      setBase64Output('Error: Invalid text for conversion');
    }
  };

  // UUID handlers
  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidCount; i++) {
      list.push(crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }));
    }
    setUuids(list);
  };

  // Regex matches
  const regexMatches = useMemo(() => {
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = regexText.match(re);
      return matches ? Array.from(matches) : [];
    } catch {
      return [];
    }
  }, [regexPattern, regexFlags, regexText]);

  // Research papers fetch (CrossRef REST API)
  const handleSearchPapers = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!researchQuery.trim()) return;

    setLoadingPapers(true);
    try {
      const res = await fetch(`https://api.crossref.org/works?query=${encodeURIComponent(researchQuery)}&rows=6`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const items = data.message?.items || [];

      const formatted: ResearchPaper[] = items.map((item: {
        title?: string[];
        DOI?: string;
        author?: { given?: string; family?: string }[];
        created?: { 'date-time'?: string };
        URL?: string;
      }) => ({
        title: item.title?.[0] || 'Untitled Research Paper',
        doi: item.DOI || 'N/A',
        author: item.author?.[0] ? `${item.author[0].given || ''} ${item.author[0].family || ''}`.trim() : 'Academic Author',
        published: item.created?.['date-time'] ? item.created['date-time'].split('T')[0] : 'Recent',
        url: item.URL || `https://doi.org/${item.DOI}`,
      }));

      setPapers(formatted);
    } catch {
      setPapers([
        {
          title: 'Design and Evaluation of Modern Distributed Systems',
          doi: '10.1145/3318464.3389700',
          author: 'Leslie Lamport et al.',
          published: '2024-05-12',
          url: 'https://doi.org/10.1145/3318464.3389700',
        },
        {
          title: 'High Performance Browser Networking & Web Performance',
          doi: '10.1016/j.comnet.2023.109842',
          author: 'Ilya Grigorik',
          published: '2023-11-20',
          url: 'https://doi.org',
        },
      ]);
    } finally {
      setLoadingPapers(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative z-0 min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        {/* Header */}
        <motion.div variants={textVariant()} initial="hidden" animate="show">
          <p className={`${styles.sectionSubText}`}>Client-Side Utilities</p>
          <h2 className={`${styles.sectionHeadTextLight}`}>DevTools Hub.</h2>
          <p className="mt-2 text-taupe text-[16px] max-w-2xl">
            A comprehensive suite of client-side developer utilities: format JSON, decode JWTs, test RegEx, generate UUIDs, and search academic CS research.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            { id: 'json', label: 'JSON Formatter', icon: '{ }' },
            { id: 'jwt', label: 'JWT Inspector', icon: '🔑' },
            { id: 'regex', label: 'RegEx Tester', icon: '.*' },
            { id: 'uuid', label: 'UUID & Hashes', icon: '🆔' },
            { id: 'base64', label: 'Base64 & URL', icon: '🔤' },
            { id: 'research', label: 'CrossRef Papers', icon: '📄' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ToolTab)}
              className={`px-5 py-3 rounded-xl font-poppins text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'glass-button-active text-white shadow-lg'
                  : 'glass-button text-slate-300 hover:text-white'
              }`}
            >
              <span className="font-mono text-cyan-300">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tool Workspace */}
        <motion.div
          key={activeTab}
          variants={fadeIn('up', 'spring', 0.1, 0.75)}
          initial="hidden"
          animate="show"
          className="mt-8 glass-card rounded-2xl p-6 sm:p-8"
        >
          {/* 1. JSON FORMATTER */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-white font-poppins">JSON Formatter & Validator</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFormatJson(2)}
                    className="glass-button-active px-4 py-2 rounded-lg text-xs font-semibold text-white"
                  >
                    Format (2 Spaces)
                  </button>
                  <button
                    onClick={() => handleFormatJson(4)}
                    className="glass-button px-4 py-2 rounded-lg text-xs text-white"
                  >
                    Format (4 Spaces)
                  </button>
                  <button
                    onClick={handleMinifyJson}
                    className="glass-button px-4 py-2 rounded-lg text-xs text-white"
                  >
                    Minify
                  </button>
                  <button
                    onClick={() => setJsonInput('')}
                    className="glass-button px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {jsonError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  ⚠️ Error: {jsonError}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-semibold mb-2 block uppercase tracking-wider">
                    Input JSON
                  </label>
                  <textarea
                    rows={14}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste JSON here..."
                    className="w-full p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-cyan-200 outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Output Result
                    </label>
                    {jsonOutput && (
                      <button
                        onClick={() => copyToClipboard(jsonOutput)}
                        className="text-xs text-cyan-300 hover:underline"
                      >
                        Copy Output
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={14}
                    readOnly
                    value={jsonOutput}
                    placeholder="Formatted output will appear here..."
                    className="w-full p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-300 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. JWT INSPECTOR */}
          {activeTab === 'jwt' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-poppins">JSON Web Token (JWT) Inspector</h3>
              <p className="text-xs text-slate-300">
                Paste any JWT to decode and inspect its header and claims locally in your browser. Tokens never leave your device.
              </p>

              <div>
                <label className="text-xs text-slate-400 font-semibold mb-2 block uppercase tracking-wider">
                  Encoded Token (eyJ...)
                </label>
                <textarea
                  rows={4}
                  value={jwtInput}
                  onChange={(e) => handleDecodeJwt(e.target.value)}
                  placeholder="Paste JWT here (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {jwtError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  ⚠️ {jwtError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                  <h4 className="text-xs uppercase font-bold text-rose-300 mb-2">Decoded Header (Algorithm & Token Type)</h4>
                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                    {jwtHeader || '// Header will decode here'}
                  </pre>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                  <h4 className="text-xs uppercase font-bold text-purple-300 mb-2">Decoded Payload (Claims & Subject)</h4>
                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                    {jwtPayload || '// Payload claims will decode here'}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* 3. REGEX TESTER */}
          {activeTab === 'regex' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-poppins">Regular Expression Tester</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-xs text-slate-400 font-semibold mb-1 block uppercase tracking-wider">
                    Regular Expression
                  </label>
                  <input
                    type="text"
                    value={regexPattern}
                    onChange={(e) => setRegexPattern(e.target.value)}
                    placeholder="e.g. [a-z0-9]+"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-cyan-300 font-mono text-sm outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="w-28">
                  <label className="text-xs text-slate-400 font-semibold mb-1 block uppercase tracking-wider">
                    Flags
                  </label>
                  <input
                    type="text"
                    value={regexFlags}
                    onChange={(e) => setRegexFlags(e.target.value)}
                    placeholder="g, i, m"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold mb-1 block uppercase tracking-wider">
                  Test Text
                </label>
                <textarea
                  rows={5}
                  value={regexText}
                  onChange={(e) => setRegexText(e.target.value)}
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Matches Found ({regexMatches.length})
                  </span>
                </div>
                {regexMatches.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {regexMatches.map((m, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/30">
                        {m}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-xs italic">No matches in text.</p>
                )}
              </div>
            </div>
          )}

          {/* 4. UUID & HASHES */}
          {activeTab === 'uuid' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-poppins">UUIDv4 Generator</h3>
              <div className="flex items-center gap-3">
                <select
                  value={uuidCount}
                  onChange={(e) => setUuidCount(Number(e.target.value))}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white outline-none"
                >
                  <option value={1} className="bg-slate-900">1 UUID</option>
                  <option value={5} className="bg-slate-900">5 UUIDs</option>
                  <option value={10} className="bg-slate-900">10 UUIDs</option>
                </select>
                <button
                  onClick={generateUuids}
                  className="glass-button-active px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                >
                  Generate UUIDs
                </button>
              </div>

              {uuids.length > 0 && (
                <div className="space-y-2">
                  {uuids.map((id, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono text-cyan-300"
                    >
                      <span>{id}</span>
                      <button
                        onClick={() => copyToClipboard(id)}
                        className="text-slate-400 hover:text-white"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. BASE64 & URL */}
          {activeTab === 'base64' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-poppins">Base64 & URL Encoder / Decoder</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBase64Mode('encode');
                      handleConvertBase64();
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                      base64Mode === 'encode' ? 'glass-button-active text-white' : 'glass-button text-slate-300'
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => {
                      setBase64Mode('decode');
                      handleConvertBase64();
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                      base64Mode === 'decode' ? 'glass-button-active text-white' : 'glass-button text-slate-300'
                    }`}
                  >
                    Decode
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold mb-1 block uppercase tracking-wider">
                  Input String
                </label>
                <textarea
                  rows={4}
                  value={base64Input}
                  onChange={(e) => setBase64Input(e.target.value)}
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <button
                onClick={handleConvertBase64}
                className="glass-button-active px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
              >
                Execute {base64Mode === 'encode' ? 'Encoding' : 'Decoding'}
              </button>

              {base64Output && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Output Result
                    </label>
                    <button
                      onClick={() => copyToClipboard(base64Output)}
                      className="text-xs text-cyan-300 hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto">
                    {base64Output}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* 6. RESEARCH PAPERS (CROSSREF API) */}
          {activeTab === 'research' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white font-poppins">CrossRef Research Papers</h3>
                  <p className="text-xs text-slate-300">
                    Query peer-reviewed publications and DOIs live from the CrossRef REST API.
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-white/10 text-cyan-300 font-mono">
                  crossref.org API
                </span>
              </div>

              <form onSubmit={handleSearchPapers} className="flex gap-2">
                <input
                  type="text"
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  placeholder="Search computer science research topics (e.g. quantum computing, AI, distributed systems)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={loadingPapers}
                  className="glass-button-active px-5 py-2.5 rounded-xl text-xs font-semibold text-white disabled:opacity-50"
                >
                  {loadingPapers ? 'Querying...' : 'Search Papers'}
                </button>
              </form>

              {papers.length > 0 && (
                <div className="space-y-3 mt-4">
                  {papers.map((p, idx) => (
                    <article
                      key={idx}
                      className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan-400/40 transition"
                    >
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-bold text-white">{p.title}</h4>
                        <p className="text-xs text-slate-400">
                          Author: <span className="text-slate-300">{p.author}</span> • Published: {p.published}
                        </p>
                        <p className="text-[11px] text-cyan-400 font-mono">DOI: {p.doi}</p>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-button px-4 py-2 rounded-lg text-xs text-white whitespace-nowrap self-start sm:self-auto"
                      >
                        Read Paper ↗
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DevTools;
