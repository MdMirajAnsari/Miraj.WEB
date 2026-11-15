import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import type {
  DomainRecord,
  DomainsDbAccountInfo,
  DomainsDbSearchResult,
} from '../models';
import {
  getEffectiveApiKey,
  setStoredApiKey,
  clearStoredApiKey,
  getDomainsDbAccountInfo,
  searchDomains,
  getDemoSearchResults,
  getRecentSearches,
  saveRecentSearch,
  POPULAR_TLDS,
} from '../utils/domainsdb';

const Domains = () => {
  const [query, setQuery] = useState('miraj');
  const [selectedZone, setSelectedZone] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'dead'>('all');
  const [useDemoMode, setUseDemoMode] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getEffectiveApiKey());
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState<DomainsDbAccountInfo | null>(null);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [searchResult, setSearchResult] = useState<DomainsDbSearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  // Load account info
  const loadAccount = useCallback(async (key?: string) => {
    setLoadingAccount(true);
    try {
      const info = await getDomainsDbAccountInfo(key);
      setAccountInfo(info);
      if (info.is_depleted_flag === 1 || info.error?.includes('credit')) {
        // Automatically hint demo mode if credits are depleted
        setUseDemoMode(true);
      }
    } catch {
      // Ignore
    } finally {
      setLoadingAccount(false);
    }
  }, []);

  useEffect(() => {
    loadAccount();
    setRecentSearches(getRecentSearches());
  }, [loadAccount]);

  // Execute Search
  const handleSearch = useCallback(
    async (searchTerm: string = query, zone: string = selectedZone) => {
      const cleanTerm = searchTerm.trim();
      if (!cleanTerm) return;

      setLoading(true);
      setErrorMessage(null);
      saveRecentSearch(cleanTerm);
      setRecentSearches(getRecentSearches());

      const isDeadParam =
        statusFilter === 'active' ? false : statusFilter === 'dead' ? true : undefined;

      if (useDemoMode) {
        const demoRes = getDemoSearchResults({
          domain: cleanTerm,
          zone: zone !== 'all' ? zone : undefined,
          isDead: isDeadParam,
        });
        setSearchResult(demoRes);
        setLoading(false);
        return;
      }

      try {
        const res = await searchDomains({
          domain: cleanTerm,
          zone: zone !== 'all' ? zone : undefined,
          isDead: isDeadParam,
        });

        if (res.error) {
          setErrorMessage(res.error);
          // If credit depletion, offer fallback
          if (res.error.toLowerCase().includes('credit') || res.error.toLowerCase().includes('limit')) {
            const fallback = getDemoSearchResults({
              domain: cleanTerm,
              zone: zone !== 'all' ? zone : undefined,
              isDead: isDeadParam,
            });
            setSearchResult({
              ...fallback,
              error: res.error,
            });
          } else {
            setSearchResult(null);
          }
        } else {
          setSearchResult(res);
        }
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    },
    [query, selectedZone, statusFilter, useDemoMode],
  );

  // Initial trigger
  useEffect(() => {
    handleSearch('miraj', 'all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleSaveApiKey = () => {
    setStoredApiKey(apiKeyInput);
    setShowKeySettings(false);
    loadAccount(apiKeyInput);
    handleSearch(query, selectedZone);
  };

  const handleResetApiKey = () => {
    clearStoredApiKey();
    const defaultKey = getEffectiveApiKey();
    setApiKeyInput(defaultKey);
    setShowKeySettings(false);
    loadAccount(defaultKey);
    handleSearch(query, selectedZone);
  };

  const filteredDomains = useMemo(() => {
    if (!searchResult?.domains) return [];
    let list = [...searchResult.domains];

    if (statusFilter === 'active') {
      list = list.filter((item) => item.isDead === 'false' || item.isDead === false || !item.isDead);
    } else if (statusFilter === 'dead') {
      list = list.filter((item) => item.isDead === 'true' || item.isDead === true);
    }

    return list;
  }, [searchResult, statusFilter]);

  return (
    <div className="relative z-0 min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        {/* Header */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className={`${styles.sectionSubText}`}>External API Integration</p>
            <h2 className={`${styles.sectionHeadTextLight}`}>Domain Intelligence.</h2>
            <p className="mt-2 text-taupe text-[16px] max-w-2xl">
              Query millions of registered domains, TLD distributions, nameservers, and live DNS records
              powered by the{' '}
              <a
                href="https://domainsdb.info"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline"
              >
                DomainsDB API
              </a>
              .
            </p>
          </div>

          {/* Account status widget button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowKeySettings(!showKeySettings)}
              className="glass-button px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              API Key & Quota
              {accountInfo?.license && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 uppercase tracking-wider text-cyan-300">
                  {accountInfo.license}
                </span>
              )}
            </button>
            <a
              href="https://domainsdb.info"
              target="_blank"
              rel="noreferrer"
              className="glass-button-active px-4 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2"
            >
              <span>domainsdb.info</span>
              <span>↗</span>
            </a>
          </div>
        </motion.div>

        {/* API Key / Account Drawer */}
        <AnimatePresence>
          {showKeySettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 glass-card rounded-2xl p-6 border border-white/20"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white font-poppins">DomainsDB Connection</h3>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Authenticated
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Registered account: <strong className="text-white">{accountInfo?.customer_email || 'mirajhadish48@gmail.com'}</strong>
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                    <div className="bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <span className="block text-slate-400">License Tier</span>
                      <span className="text-sm font-bold text-white capitalize">
                        {accountInfo?.license || 'Community'}
                      </span>
                    </div>
                    <div className="bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <span className="block text-slate-400">Calls Made</span>
                      <span className="text-sm font-bold text-white">
                        {accountInfo?.calls_made ?? 0}
                      </span>
                    </div>
                    <div className="bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <span className="block text-slate-400">Depletion Status</span>
                      <span
                        className={`text-sm font-bold ${
                          accountInfo?.is_depleted_flag === 1
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {accountInfo?.is_depleted_flag === 1 ? 'Credits Depleted' : 'Active Quota'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* API Key Editor */}
                <div className="w-full lg:w-96 space-y-3">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    API Key (Stored securely in .env / local state)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Paste your DomainsDB API key"
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={handleSaveApiKey}
                      className="glass-button-active px-3 py-2 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
                    >
                      Apply
                    </button>
                    <button
                      onClick={handleResetApiKey}
                      className="glass-button px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white"
                      title="Reset to default key"
                    >
                      Reset
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Need additional API credits? Visit{' '}
                    <a
                      href="https://domainsdb.info"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 underline"
                    >
                      domainsdb.info
                    </a>{' '}
                    to upgrade your quota or renew your key.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quota Depletion Notice Banner if applicable */}
        {accountInfo?.is_depleted_flag === 1 && (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="text-sm">
                <strong>DomainsDB Community Tier Notice:</strong> Your monthly API credits on the free tier are depleted ({accountInfo.calls_made} calls used).
                You can switch to <strong>Demo Simulation Mode</strong> to preview and test the complete interface with sample domain metadata.
              </p>
            </div>
            <button
              onClick={() => {
                setUseDemoMode(!useDemoMode);
                handleSearch(query, selectedZone);
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-500 text-black hover:bg-amber-400 whitespace-nowrap transition-colors"
            >
              {useDemoMode ? 'Demo Mode Active' : 'Enable Demo Mode'}
            </button>
          </div>
        )}

        {/* Search Controls Card */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.1, 0.75)}
          initial="hidden"
          animate="show"
          className="mt-8 glass-card rounded-2xl p-6 sm:p-8"
        >
          {/* Main Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query, selectedZone);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search domain name or keyword (e.g. miraj, google, tech, dev)..."
                className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-slate-400 font-poppins text-base focus:outline-none focus:border-cyan-400 transition"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glass-button-active px-8 py-4 rounded-xl font-poppins font-semibold text-white flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Search Domains</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Recent Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick suggestions:</span>
            {recentSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item);
                  handleSearch(item, selectedZone);
                }}
                className={`px-3 py-1 rounded-full transition-all ${
                  query === item
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* TLD Zones Filter Pills */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mr-1 whitespace-nowrap">
                  Zone (TLD):
                </span>
                {POPULAR_TLDS.map((tld) => (
                  <button
                    key={tld}
                    type="button"
                    onClick={() => {
                      setSelectedZone(tld);
                      handleSearch(query, tld);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all whitespace-nowrap ${
                      selectedZone === tld
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tld === 'all' ? 'All TLDs' : `.${tld}`}
                  </button>
                ))}
              </div>

              {/* Status & Mode Filter */}
              <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                {/* Status Toggle */}
                <div className="flex rounded-lg bg-black/40 p-0.5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      statusFilter === 'all' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('active')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      statusFilter === 'active' ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('dead')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      statusFilter === 'dead' ? 'bg-rose-500/30 text-rose-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Inactive
                  </button>
                </div>

                {/* Demo toggle pill */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !useDemoMode;
                    setUseDemoMode(next);
                    handleSearch(query, selectedZone);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition flex items-center gap-1.5 ${
                    useDemoMode
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      useDemoMode ? 'bg-amber-400' : 'bg-slate-500'
                    }`}
                  />
                  {useDemoMode ? 'Demo Simulation' : 'Live API'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copy Notification Toast */}
        <AnimatePresence>
          {copiedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 z-50 glass-card px-4 py-2.5 rounded-xl text-emerald-300 text-sm font-medium border border-emerald-500/30 shadow-2xl flex items-center gap-2"
            >
              <span>✓</span>
              <span>Copied {copiedText} to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-sm flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <p className="font-semibold">{errorMessage}</p>
              {searchResult?.isDemo && (
                <p className="mt-1 text-xs text-rose-300">
                  Showing simulated sample domain results below so you can test and inspect the DNS record interface.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Results Metadata Summary */}
        {searchResult && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">
                Found {searchResult.total} {searchResult.total === 1 ? 'domain' : 'domains'}
              </span>
              {searchResult.time && (
                <span className="bg-white/10 px-2 py-0.5 rounded text-slate-300 font-mono">
                  ⚡ {searchResult.time}
                </span>
              )}
              {searchResult.isDemo && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                  Demo Simulation
                </span>
              )}
            </div>
            <div className="text-slate-400">
              Showing {filteredDomains.length} records matching current filter
            </div>
          </div>
        )}

        {/* Domain Cards Grid */}
        <div className="mt-6 space-y-4">
          {loading && !searchResult && (
            <div className="text-center py-20 text-slate-400">
              <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
              <p>Querying DomainsDB registry...</p>
            </div>
          )}

          {!loading && filteredDomains.length === 0 && searchResult && (
            <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
              <span className="text-4xl block mb-3">🌐</span>
              <h3 className="text-lg font-bold text-white mb-1">No domains found</h3>
              <p className="text-sm max-w-md mx-auto">
                No registered domains matched &ldquo;{query}&rdquo; for zone &ldquo;{selectedZone}&rdquo;. Try another keyword or switch zone to &ldquo;all&rdquo;.
              </p>
            </div>
          )}

          {filteredDomains.map((domain) => {
            const isDead = domain.isDead === 'true' || domain.isDead === true;
            const isExpanded = expandedDomain === domain.domain;
            const aRecords = domain.A || [];
            const nsRecords = domain.NS || [];
            const mxRecords = domain.MX || [];
            const txtRecords = domain.TXT || [];
            const cnameRecords = domain.CNAME || [];

            return (
              <motion.article
                key={domain.domain}
                layout
                className="glass-card rounded-xl p-5 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Column: Domain info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
                        <span>{domain.domain}</span>
                      </h3>

                      {/* Status Badge */}
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                          isDead
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isDead ? 'Dropped / Inactive' : 'Active'}
                      </span>

                      {/* Zone Badge */}
                      {domain.zone && (
                        <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-mono uppercase">
                          .{domain.zone}
                        </span>
                      )}

                      {/* Country badge */}
                      {domain.country && (
                        <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300 uppercase">
                          📍 {domain.country}
                        </span>
                      )}
                    </div>

                    {/* Metadata dates */}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                      {domain.create_date && (
                        <span>
                          Registered: <strong className="text-slate-300">{domain.create_date}</strong>
                        </span>
                      )}
                      {domain.update_date && (
                        <span>
                          Updated: <strong className="text-slate-300">{domain.update_date}</strong>
                        </span>
                      )}
                      <span>
                        DNS Records:{' '}
                        <strong className="text-slate-300">
                          {aRecords.length} A, {nsRecords.length} NS, {mxRecords.length} MX
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                    <button
                      type="button"
                      onClick={() => handleCopy(domain.domain, domain.domain)}
                      className="glass-button px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                      title="Copy domain name"
                    >
                      <span>📋</span>
                      <span>Copy</span>
                    </button>

                    <a
                      href={`https://${domain.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                    >
                      <span>↗</span>
                      <span>Visit</span>
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedDomain(isExpanded ? null : domain.domain)
                      }
                      className="glass-button-active px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Hide DNS' : 'View DNS Records'}</span>
                      <span className="text-[10px]">{isExpanded ? '▲' : '▼'}</span>
                    </button>
                  </div>
                </div>

                {/* Expandable DNS Records Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 pt-4 border-t border-white/10"
                    >
                      <h4 className="text-xs uppercase tracking-wider text-cyan-300 font-bold mb-3">
                        DNS Configuration & Nameservers
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                        {/* A Records */}
                        <div className="bg-black/40 p-3.5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">A Records (IPv4)</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                              {aRecords.length}
                            </span>
                          </div>
                          {aRecords.length > 0 ? (
                            <ul className="space-y-1 font-mono text-slate-300">
                              {aRecords.map((ip) => (
                                <li
                                  key={ip}
                                  className="flex items-center justify-between hover:text-white"
                                >
                                  <span>{ip}</span>
                                  <button
                                    onClick={() => handleCopy(ip, `IP ${ip}`)}
                                    className="text-[10px] text-slate-400 hover:text-cyan-300"
                                  >
                                    copy
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-500 italic">No A records found</p>
                          )}
                        </div>

                        {/* NS Records */}
                        <div className="bg-black/40 p-3.5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">Nameservers (NS)</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                              {nsRecords.length}
                            </span>
                          </div>
                          {nsRecords.length > 0 ? (
                            <ul className="space-y-1 font-mono text-slate-300">
                              {nsRecords.map((ns) => (
                                <li
                                  key={ns}
                                  className="truncate hover:text-white"
                                  title={ns}
                                >
                                  {ns}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-500 italic">No NS records found</p>
                          )}
                        </div>

                        {/* MX Records */}
                        <div className="bg-black/40 p-3.5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">Mail Exchange (MX)</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                              {mxRecords.length}
                            </span>
                          </div>
                          {mxRecords.length > 0 ? (
                            <ul className="space-y-1 font-mono text-slate-300">
                              {mxRecords.map((mx) => (
                                <li
                                  key={mx}
                                  className="truncate hover:text-white"
                                  title={mx}
                                >
                                  {mx}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-500 italic">No MX records found</p>
                          )}
                        </div>

                        {/* TXT Records */}
                        {txtRecords.length > 0 && (
                          <div className="bg-black/40 p-3.5 rounded-xl border border-white/10 md:col-span-2">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-white">TXT Records</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                                {txtRecords.length}
                              </span>
                            </div>
                            <ul className="space-y-1 font-mono text-slate-300">
                              {txtRecords.map((txt) => (
                                <li
                                  key={txt}
                                  className="break-all hover:text-white"
                                >
                                  {txt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* CNAME Records */}
                        {cnameRecords.length > 0 && (
                          <div className="bg-black/40 p-3.5 rounded-xl border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-white">CNAME</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                                {cnameRecords.length}
                              </span>
                            </div>
                            <ul className="space-y-1 font-mono text-slate-300">
                              {cnameRecords.map((cn) => (
                                <li key={cn} className="truncate">
                                  {cn}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Feature Card */}
        <div className="mt-16 glass-card rounded-2xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white font-poppins">Need Bulk Domain Search or DNS Intel?</h3>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              DomainsDB indexes hundreds of millions of domains across major gTLDs and ccTLDs.
              Integrate API queries into your own workflows or upgrade quota for unlimited automated lookups.
            </p>
          </div>
          <a
            href="https://domainsdb.info"
            target="_blank"
            rel="noreferrer"
            className="glass-button-active px-6 py-3 rounded-xl font-poppins font-medium text-white hover:brightness-110 whitespace-nowrap"
          >
            Visit DomainsDB.info ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default Domains;
