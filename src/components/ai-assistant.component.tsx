import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { unlockAchievement } from '../utils/achievements';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  skills:
    "Miraj is a Full-Stack Engineer with deep expertise in React 19, TypeScript, JavaScript (ESNext), Node.js, Next.js, Redux Toolkit, Tailwind CSS, Three.js (3D WebGL), Docker, and REST/GraphQL APIs.",
  experience:
    "Miraj has worked as a Software Engineer contributing to high-impact projects at Sysfore Technologies, Brillio Technologies, and Crisis24, building scalable enterprise web portals and cloud services.",
  projects:
    "Some of Miraj's top featured projects include:\n• DomainsDB Explorer (live DNS and domain search)\n• Math Magicians (interactive calculations)\n• Movie Metro (movie trailers & cinema discovery)\n• Government Services Portal & Live Global Holidays Hub\n• Museum Art Inspector (Art Institute of Chicago API)",
  contact:
    "You can reach Miraj directly via email at clevercottonmouth@gmail.com or connect via GitHub at https://github.com/MdMirajAnsari.",
  apis:
    "This web portal integrates multiple live public APIs:\n• DomainsDB API (Domain registration & DNS search)\n• Nager.Date & GOV.UK (Global public holidays)\n• Art Institute of Chicago API (Museum masterpieces)\n• CoinGecko & DefiLlama (Crypto & DeFi market rates)\n• Open Library & Gutendex (Books & literature)\n• Open-Meteo (Real-time weather)",
  hire:
    "Miraj is available for Full-Stack Developer roles (Frontend, Backend, or 3D Web engineering). Feel free to send a message via the Contact page or email clevercottonmouth@gmail.com!",
};

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hi there! I'm Miraj's AI Portfolio Assistant. Ask me anything about his technical skills, background, projects, or how to get in touch!",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getAiAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language')) {
      return KNOWLEDGE_RESPONSES.skills;
    }
    if (q.includes('experience') || q.includes('company') || q.includes('career') || q.includes('work') || q.includes('brillio') || q.includes('sysfore')) {
      return KNOWLEDGE_RESPONSES.experience;
    }
    if (q.includes('project') || q.includes('portfolio') || q.includes('work done') || q.includes('app')) {
      return KNOWLEDGE_RESPONSES.projects;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('github') || q.includes('linkedin') || q.includes('reach')) {
      return KNOWLEDGE_RESPONSES.contact;
    }
    if (q.includes('api') || q.includes('domainsdb') || q.includes('weather') || q.includes('holiday')) {
      return KNOWLEDGE_RESPONSES.apis;
    }
    if (q.includes('hire') || q.includes('job') || q.includes('available') || q.includes('resume')) {
      return KNOWLEDGE_RESPONSES.hire;
    }
    return `Miraj is a Full-Stack Engineer who specializes in building modern web applications with React, TypeScript, Node.js, and Three.js. You can reach out directly via email at clevercottonmouth@gmail.com!`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    unlockAchievement('ai_collaborator');

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = getAiAnswer(text);
      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const QUICK_PROMPTS = [
    'What are your core skills?',
    'Tell me about your projects',
    'How can I contact you?',
    'What APIs are integrated?',
  ];

  return (
    <>
      {/* Floating Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-poppins text-xs font-bold shadow-2xl flex items-center gap-2.5 hover:scale-105 transition-all duration-300 border border-white/20"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse" />
        <span>Ask AI Assistant</span>
        <span className="text-base">🤖</span>
      </button>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-6 z-50 w-full max-w-sm sm:max-w-md h-[550px] glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-lg shadow-md">
                  🤖
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-poppins">Ask Miraj AI</h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full glass-button flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                        : 'bg-black/40 text-slate-200 border border-white/10'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] text-slate-400 mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-black/40 text-slate-400 rounded-2xl p-3 border border-white/10 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-black/20 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[11px] pb-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white whitespace-nowrap transition border border-white/10"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-900/90 border-t border-white/10 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, experience, or hire..."
                className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-cyan-400 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="glass-button-active px-4 py-2 rounded-xl text-xs font-semibold text-white disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
