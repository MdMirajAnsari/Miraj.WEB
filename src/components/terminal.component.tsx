import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { unlockAchievement } from '../utils/achievements';

interface CommandOutput {
  command: string;
  output: ReactNode;
}

const Terminal = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    unlockAchievement('terminal_hacker');
    inputRef.current?.focus();

    setHistory([
      {
        command: 'welcome',
        output: (
          <div className="space-y-2 text-cyan-300">
            <pre className="text-xs sm:text-sm font-mono text-emerald-400 leading-none">
{`
 __  __ _           _     __          ________ ____  
|  \\/  (_)         (_)    \\ \\        / /  ____|  _ \\ 
| \\  / |_ _ __ __ _ _      \\ \\  /\\  / /| |__  | |_) |
| |\\/| | | '__/ _\` | |      \\ \\/  \\/ / |  __| |  _ < 
| |  | | | | | (_| | |       \\  /\\  /  | |____| |_) |
|_|  |_|_|_|  \\__,_|_|        \\/  \\/   |______|____/ 
`}
            </pre>
            <p className="text-xs text-slate-300">
              Welcome to Miraj's Interactive Terminal CLI v2.4.0 (x86_64-pc-none)
            </p>
            <p className="text-xs text-amber-300">
              Type <strong className="text-white">help</strong> to view available commands or <strong className="text-white">exit</strong> to return to GUI.
            </p>
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const parts = cmd.split(' ');
    const root = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let output: ReactNode = '';

    switch (root) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-cyan-300 font-bold mb-1">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-mono">
              <div><strong className="text-emerald-400">about</strong> - Overview of Miraj's background</div>
              <div><strong className="text-emerald-400">skills</strong> - Tech stack and competencies</div>
              <div><strong className="text-emerald-400">projects</strong> - Key featured projects</div>
              <div><strong className="text-emerald-400">contact</strong> - Get in touch with Miraj</div>
              <div><strong className="text-emerald-400">cat resume</strong> - View resume summary</div>
              <div><strong className="text-emerald-400">theme [dark|glass]</strong> - Change interface theme</div>
              <div><strong className="text-emerald-400">clear</strong> - Clear terminal screen</div>
              <div><strong className="text-emerald-400">whoami</strong> - Current terminal user</div>
              <div><strong className="text-emerald-400">date</strong> - Display current local time</div>
              <div><strong className="text-emerald-400">exit</strong> - Return to main homepage</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p><strong>Miraj (Md Miraj Ansari)</strong> — Full-Stack Engineer & Creative Developer.</p>
            <p>Specializes in crafting responsive web applications, interactive 3D experiences with Three.js, and high-performance React architectures.</p>
            <p className="text-cyan-300">Location: Bengaluru, India</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-slate-200">
            <p className="text-cyan-300 font-bold">Technical Arsenal:</p>
            <div>React & Next.js       [████████████████████] 95%</div>
            <div>TypeScript & JS       [███████████████████░] 92%</div>
            <div>Node.js & Express     [█████████████████░░░] 85%</div>
            <div>Three.js / 3D Web     [████████████████░░░░] 80%</div>
            <div>Redux Toolkit & State [███████████████████░] 90%</div>
            <div>Tailwind CSS & UI     [████████████████████] 98%</div>
            <div>Docker & Cloud APIs   [███████████████░░░░░] 78%</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-cyan-300 font-bold">Featured Projects:</p>
            <div>
              <p className="font-bold text-white">▸ Math Magicians</p>
              <p className="text-slate-400">Interactive mathematics calculator built with React & Redux.</p>
            </div>
            <div>
              <p className="font-bold text-white">▸ Movie Metro</p>
              <p className="text-slate-400">Cinema discovery and movie trailers streaming portal.</p>
            </div>
            <div>
              <p className="font-bold text-white">▸ Leaderboard System</p>
              <p className="text-slate-400">Real-time gaming scores & leaderboard tracking API.</p>
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p>Email: <strong className="text-cyan-300">clevercottonmouth@gmail.com</strong></p>
            <p>GitHub: <strong className="text-cyan-300">https://github.com/MdMirajAnsari</strong></p>
            <p>Website: <strong className="text-cyan-300">Miraj.WEB (Active)</strong></p>
          </div>
        );
        break;

      case 'cat':
        if (arg.includes('resume')) {
          output = (
            <div className="text-xs text-slate-300 space-y-1">
              <p className="text-emerald-400 font-bold">=== RESUME OVERVIEW ===</p>
              <p>Miraj | Full-Stack Software Engineer</p>
              <p>Experience: Sysfore, Brillio, Crisis24 (Enterprise web & cloud systems)</p>
              <p>Education: Computer Science & Engineering</p>
            </div>
          );
        } else {
          output = `cat: ${arg || 'file'}: No such file or directory. Try: cat resume`;
        }
        break;

      case 'whoami':
        output = 'guest@miraj-terminal (Permissions: read-only explorer)';
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'sudo':
        output = 'guest is not in the sudoers file. This incident will be reported.';
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        navigate('/');
        return;

      default:
        output = `command not found: "${cmd}". Type "help" to view available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-[110px] pb-12 px-4 sm:px-8 font-mono">
      <div className="max-w-5xl mx-auto rounded-2xl bg-black/90 border border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col min-h-[650px]">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block cursor-pointer" onClick={() => navigate('/')} />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-3 text-xs text-slate-400">miraj@portfolio:~ (zsh)</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-white/5"
          >
            Exit Terminal ✕
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div
          className="p-6 flex-1 overflow-y-auto space-y-4 text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              {item.command !== 'welcome' && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400">miraj@portfolio:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              <div className="text-slate-300 pl-4">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="text-emerald-400">miraj@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none font-mono caret-emerald-400"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
