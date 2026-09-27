import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSISTANT_QUESTIONS, ASSISTANT_RESPONSES } from '../data/mockData';
import { EvidencePanel } from '../components/common/EvidencePanel';
import { Bot, Send, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { AssistantResponse } from '../types';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  response?: AssistantResponse;
}

export const AssistantPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Welcome to the Maharashtra Labour Market Intelligence Assistant. I can summarize regional skill trends, course alignment metrics, district demand signals, and verified shortages contained within our synchronized demonstration dataset.'
    }
  ]);

  const handleAskQuestion = (query: string) => {
    const q = query.trim();
    if (!q) return;

    // Fuzzy matching against supported questions
    const lower = q.toLowerCase();
    const matchedKey = ASSISTANT_QUESTIONS.find(k => {
      const kl = k.toLowerCase();
      return (
        lower === kl ||
        (lower.includes('pune') && kl.includes('pune')) ||
        (lower.includes('missing') && kl.includes('missing')) ||
        (lower.includes('python') && kl.includes('python')) ||
        (lower.includes('alignment') && kl.includes('alignment')) ||
        (lower.includes('summary') && kl.includes('summary'))
      );
    });

    const userMsg: Message = { sender: 'user', text: q };

    if (matchedKey && ASSISTANT_RESPONSES[matchedKey]) {
      const resp = ASSISTANT_RESPONSES[matchedKey];
      setMessages(prev => [
        ...prev,
        userMsg,
        {
          sender: 'assistant',
          text: resp.answer,
          response: resp
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        userMsg,
        {
          sender: 'assistant',
          text: 'I am bounded to verifiable records in the centralized Maharashtra demonstration dataset. Please choose one of the five suggested inquiry patterns to inspect traceable evidence.'
        }
      ]);
    }

    setInputVal('');
    showToast('Analytical response synthesized from evidence records.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAskQuestion(inputVal);
  };

  return (
    <div className="space-y-6">
      {/* Head */}
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
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          AI-ASSISTED • DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Conversation Column */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col min-h-[580px] shadow-xs overflow-hidden">
          {/* Suggested Questions Top Bar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Suggested Evidence Queries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ASSISTANT_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAskQuestion(q)}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-xs text-left transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
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
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-[11px] mb-1">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Evidence Summary</span>
                    </div>
                  )}

                  <p className="leading-relaxed font-normal">{m.text}</p>

                  {/* Render Data Table if Present */}
                  {m.response?.rows && m.response.rows.length > 0 && (
                    <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-2">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800 border-b text-[10px] font-bold text-slate-500 uppercase">
                            {m.response.headers.map((h, i) => (
                              <th key={i} className="p-2">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {m.response.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 font-medium text-slate-700 dark:text-slate-200">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {m.sender === 'assistant' && (
                    <div className="pt-1 text-[10px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                      <span>AI-generated analysis. Verify against source datasets.</span>
                    </div>
                  )}

                  {/* Traceability Details Accordion */}
                  {m.response && (
                    <EvidencePanel
                      title="Inspect Provenance & Limitations"
                      evidence={m.response}
                    />
                  )}
                </div>
              </div>
            ))}
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
              placeholder="Ask about skills, districts, or course alignment..."
              className="flex-1 p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#173a5e] text-white hover:bg-[#102c49] font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Side Guidance Column */}
        <div className="lg:col-span-4 space-y-4 text-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Human Review Safeguard</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              AI assists with pattern recognition and synthesis. Consequential actions such as curriculum revisions, budget allocations, or admissions guidelines require human review by designated government officers.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Assistant Operational Scope
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Data Scope:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Centralized synthetic set</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Time Period:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Apr–Sep 2026</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Autonomous Decisions:</span>
                <span className="font-semibold text-rose-600">Strictly prohibited</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">External Web Query:</span>
                <span className="font-semibold text-slate-500">Disabled (Bounded sandbox)</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Trust &amp; Traceability
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Every assistant synthesis includes data period, confidence levels, assumptions, limitations, and direct links to underlying tables.
            </p>
            <button
              type="button"
              onClick={() => navigate('methodology')}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#173a5e] dark:text-sky-300 rounded font-semibold text-xs text-center"
            >
              Read Data &amp; Methodology →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
