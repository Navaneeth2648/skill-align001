import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, X, Send, Bot, User, ArrowRight, Database, 
  TrendingUp, ShieldCheck, RefreshCw, HelpCircle
} from 'lucide-react';
import { PLATFORM_FAQS } from '../../../server/services/geminiAssistantService';

interface MessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isAiGenerated?: boolean;
  modelUsed?: string;
  sourceReferences?: string[];
  suggestedRoute?: string;
  provenance?: string;
  timestamp: string;
}

const DEFAULT_SUGGESTIONS = [
  'What skills are currently in demand?',
  'Which districts have the highest vacancies?',
  'What courses are available?',
  'How do I review my curriculum?',
  'How do I upload my resume?',
  'How does AI Match work?',
  'How can employers find candidates?',
  'How can students find jobs?',
  'Where does the data come from?',
];

export const IntelligenceAssistantModal: React.FC = () => {
  const { isAssistantOpen, closeAssistant, navigate, role } = useApp();
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Namaste! I am the Maharashtra Labour Market Intelligence Assistant. Ask me anything about real-time skill demands, district vacancies, ITI curriculum review, or resume analysis.',
      provenance: 'Official State Decision Support Engine',
      sourceReferences: ['Maharashtra Skill & Labour Market Intelligence Platform'],
      timestamp: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isAssistantOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAssistantOpen, messages]);

  if (!isAssistantOpen) return null;

  const handleSend = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || loading) return;

    const userMsg: MessageItem = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: messages.map(m => ({ role: m.sender, content: m.text })),
          userRole: role,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const assistantMsg: MessageItem = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        isAiGenerated: data.isAiGenerated,
        modelUsed: data.modelUsed,
        sourceReferences: data.sourceReferences,
        suggestedRoute: data.suggestedRoute,
        provenance: data.provenance,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: MessageItem = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Unable to query the state intelligence gateway at this time. Running on local deterministic rules.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputVal);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'init-fresh',
        sender: 'assistant',
        text: 'Conversation cleared. How can I assist your workforce planning or curriculum review today?',
        timestamp: 'Just now',
      }
    ]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4"
      onClick={closeAssistant}
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistantModalTitle"
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[700px] animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Assistant Header */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0b1c2f] via-[#102c49] to-[#173a5e] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 id="assistantModalTitle" className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>MS-LMIP Intelligence Assistant</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-900 uppercase">
                  Government LMI Grounded
                </span>
              </h3>
              <p className="text-[10px] text-sky-200/80">
                Grounded in live Adzuna jobs, DVET matrices, and 36 Maharashtra district records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs"
              title="Clear conversation"
              aria-label="Clear chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={closeAssistant}
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggested Questions Carousel */}
        <div className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 p-2.5 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mr-1">
              Suggested:
            </span>
            {DEFAULT_SUGGESTIONS.map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(question)}
                disabled={loading}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 text-slate-700 dark:text-slate-200 transition-all hover:shadow-2xs shrink-0 cursor-pointer disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#102c49] text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/30">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2.5 ${
                msg.sender === 'user' 
                  ? 'bg-[#102c49] text-white p-3 rounded-2xl rounded-tr-xs shadow-xs' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-3.5 rounded-2xl rounded-tl-xs border border-slate-200 dark:border-slate-700 shadow-xs'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Evidence & Provenance Card */}
                {msg.sender === 'assistant' && (msg.sourceReferences || msg.suggestedRoute) && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/80 space-y-2 text-[11px]">
                    {msg.sourceReferences && msg.sourceReferences.length > 0 && (
                      <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-lg p-2 text-sky-900 dark:text-sky-200">
                        <div className="flex items-center gap-1.5 font-bold mb-1 text-sky-800 dark:text-sky-300 text-[10px] uppercase tracking-wider">
                          <Database className="w-3 h-3" />
                          <span>Verified Data References</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5 text-[10px] opacity-90">
                          {msg.sourceReferences.map((ref, rIdx) => (
                            <li key={rIdx}>{ref}</li>
                          ))}
                        </ul>
                        {msg.provenance && (
                          <p className="text-[9px] text-sky-600 dark:text-sky-400 mt-1 italic">
                            {msg.provenance}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 pt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>
                          {msg.isAiGenerated ? 'AI Assisted (Google Gemini)' : 'Verified Platform Rule Engine'}
                        </span>
                      </span>

                      {msg.suggestedRoute && (
                        <button
                          type="button"
                          onClick={() => {
                            closeAssistant();
                            navigate(msg.suggestedRoute as any);
                          }}
                          className="inline-flex items-center gap-1 text-[#102c49] dark:text-sky-400 font-bold hover:underline cursor-pointer"
                        >
                          <span>Open Module</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <span className={`block text-[9px] opacity-60 text-right ${msg.sender === 'user' ? 'text-white/80' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs py-2">
              <div className="w-6 h-6 rounded-lg bg-[#102c49] text-amber-300 flex items-center justify-center animate-spin">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>Querying verified Maharashtra LMI databases and synthesizing response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Ask about high-demand skills, job vacancies, district shortages..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={!inputVal.trim() || loading}
            className="px-3.5 py-2 bg-[#102c49] hover:bg-[#173a5e] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <span>Send</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
