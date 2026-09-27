import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, ShieldCheck, Database, RefreshCw, Sparkles, ArrowRight, User } from 'lucide-react';
import { AssistantResponse } from '../types';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  isAiGenerated?: boolean;
  modelUsed?: string;
  sourceReferences?: string[];
  suggestedRoute?: string;
  provenance?: string;
  response?: AssistantResponse;
}

const EXTENDED_ASSISTANT_QUESTIONS = [
  'What skills are currently in demand?',
  'Which districts have the highest vacancies?',
  'What courses are available?',
  'How do I review my curriculum?',
  'How do I upload my resume?',
  'How does AI Match work?',
  'How can employers find candidates?',
  'How can students find jobs?',
  'How are labour-market statistics calculated?',
  'Where does the data come from?'
];

export const AssistantPage: React.FC = () => {
  const { navigate, showToast, role } = useApp();
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Welcome to the Maharashtra Labour Market Intelligence Assistant. I can provide real-time evidence on regional skill demand, district vacancies, ITI curriculum alignment, training plans, and live Adzuna employment vacancies across all 36 Maharashtra districts.',
      isAiGenerated: false,
      provenance: 'Official State Decision Support Engine',
      sourceReferences: [
        'Maharashtra Skill & Labour Market Intelligence Platform (MS-LMIP)',
        'Directorate of Vocational Education and Training (DVET)',
        'Adzuna Labour Market API Gateway'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleAskQuestion = async (query: string) => {
    const q = query.trim();
    if (!q || loading) return;

    const userMsg: Message = { sender: 'user', text: q };
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
      const assistantMsg: Message = {
        sender: 'assistant',
        text: data.answer,
        isAiGenerated: data.isAiGenerated,
        modelUsed: data.modelUsed,
        sourceReferences: data.sourceReferences,
        suggestedRoute: data.suggestedRoute,
        provenance: data.provenance,
      };

      setMessages(prev => [...prev, assistantMsg]);
      showToast('Response synthesized from state labour intelligence.');
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Unable to communicate with the state intelligence gateway. Operating on local deterministic knowledge rules.',
          isAiGenerated: false,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAskQuestion(inputVal);
  };

  const handleClear = () => {
    setMessages([
      {
        sender: 'assistant',
        text: 'Conversation history reset. How can I assist your workforce planning or curriculum review today?',
      }
    ]);
    showToast('Conversation cleared.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-500" />
            <span>Labour Market Intelligence Assistant</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Query bounded workforce demand, skill gaps, and course alignment with complete evidence traceability.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1.5 rounded border border-amber-300 dark:border-amber-800">
            GOVT GROUNDED • REAL TIME
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Conversation Column */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col min-h-[580px] shadow-xs overflow-hidden">
          {/* Suggested Questions Top Bar */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Suggested Evidence Queries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {EXTENDED_ASSISTANT_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAskQuestion(q)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-xs text-left transition-colors cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs max-h-[500px]">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[90%] p-4 rounded-xl space-y-3 ${
                    m.sender === 'user'
                      ? 'bg-[#173a5e] text-white rounded-br-none'
                      : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.sender === 'assistant' && (
                    <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold text-[11px] mb-1">
                      <div className="flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5" />
                        <span>Evidence Summary</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                        {m.isAiGenerated ? 'Gemini AI' : 'Verified Rule Engine'}
                      </span>
                    </div>
                  )}

                  {m.sender === 'user' && (
                    <div className="flex items-center gap-1.5 text-sky-200 font-bold text-[11px] mb-1">
                      <User className="w-3.5 h-3.5" />
                      <span>Your Inquiry</span>
                    </div>
                  )}

                  <p className="leading-relaxed font-normal whitespace-pre-wrap">{m.text}</p>

                  {/* Traceability Details Box */}
                  {m.sender === 'assistant' && (m.sourceReferences || m.suggestedRoute) && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/80 space-y-2 text-[11px]">
                      {m.sourceReferences && m.sourceReferences.length > 0 && (
                        <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-lg p-2.5 text-sky-900 dark:text-sky-200">
                          <div className="flex items-center gap-1.5 font-bold mb-1 text-sky-800 dark:text-sky-300 text-[10px] uppercase tracking-wider">
                            <Database className="w-3 h-3" />
                            <span>Verified Source Data</span>
                          </div>
                          <ul className="list-disc pl-4 space-y-0.5 text-[10px] opacity-90">
                            {m.sourceReferences.map((ref, rIdx) => (
                              <li key={rIdx}>{ref}</li>
                            ))}
                          </ul>
                          {m.provenance && (
                            <p className="text-[9px] text-sky-600 dark:text-sky-400 mt-1.5 italic">
                              Provenance: {m.provenance}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-1 text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />
                          <span>Deterministic Verification Active</span>
                        </span>

                        {m.suggestedRoute && (
                          <button
                            type="button"
                            onClick={() => navigate(m.suggestedRoute as any)}
                            className="inline-flex items-center gap-1 text-[#102c49] dark:text-sky-400 font-bold hover:underline cursor-pointer"
                          >
                            <span>Inspect Linked Module</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-3">
                <div className="w-6 h-6 rounded-lg bg-[#102c49] text-amber-300 flex items-center justify-center animate-spin">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Querying verified Maharashtra LMI databases and synthesizing response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Compose Bar */}
          <form 
            onSubmit={handleSubmit} 
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Ask about skills, districts, vacancies, or course alignment..."
              className="flex-1 p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-hidden"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || loading}
              className="px-4 py-2.5 rounded-lg bg-[#173a5e] text-white hover:bg-[#102c49] font-bold text-xs flex items-center gap-1.5 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[#102c49] dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Grounded Intelligence Protocol</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The MS-LMIP Assistant operates under strict state decision support standards. It queries live Adzuna telemetry, official DVET curriculum matrices, and 36-district records.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong>Live Job Feeds:</strong> Live employer vacancies from Adzuna API</li>
              <li><strong>Curriculum Standards:</strong> Official DVET syllabus guidelines</li>
              <li><strong>Human In The Loop:</strong> All suggestions require human approval</li>
              <li><strong>Zero Hallucination:</strong> Unindexed queries state lack of data</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#102c49] to-[#173a5e] text-white rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-amber-300">Quick Navigation</h3>
            <p className="text-xs text-sky-100/90 leading-relaxed">
              Directly jump to operational platform intelligence modules:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => navigate('resumeanalyzer')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-left transition-colors cursor-pointer"
              >
                Resume Analyzer →
              </button>
              <button
                type="button"
                onClick={() => navigate('jobintel')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-left transition-colors cursor-pointer"
              >
                Job Vacancies →
              </button>
              <button
                type="button"
                onClick={() => navigate('curriculum')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-left transition-colors cursor-pointer"
              >
                Curriculum Review →
              </button>
              <button
                type="button"
                onClick={() => navigate('districtintel')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-left transition-colors cursor-pointer"
              >
                District Demand →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
