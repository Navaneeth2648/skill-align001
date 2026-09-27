import React from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { ChevronRight, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export const SkillDetailPage: React.FC = () => {
  const { navigate, selectedSkillName } = useApp();

  const skillName = selectedSkillName || 'React';
  const trendData = [36, 39, 42, 45, 49, 54, 58, 61, 68, 72, 79, 87];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          type="button"
          onClick={() => navigate('skills')}
          className="flex items-center gap-1 hover:text-[#173a5e] dark:hover:text-sky-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Skill Intelligence</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-900 dark:text-slate-100">{skillName}</span>
      </div>

      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight">
            {skillName} Competence Profile
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Demand signal trajectory, related competence network, and regional vocational supply.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO RELATIONSHIPS
        </span>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 bg-white dark:bg-slate-900">
          <strong className="block text-xl font-bold text-slate-900 dark:text-slate-100">
            ₹4.8–11.5L
          </strong>
          <span className="text-xs text-slate-500">Illustrative annual compensation range</span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900">
          <strong className="block text-xl font-bold text-slate-900 dark:text-slate-100">
            1–5 years
          </strong>
          <span className="text-xs text-slate-500">Typical experience signal requested in vacancies</span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900">
          <strong className="block text-xl font-bold text-slate-900 dark:text-slate-100">
            IT, Retail, Banking
          </strong>
          <span className="text-xs text-slate-500">Primary employing industries in demo records</span>
        </div>
      </div>

      {/* Row 1: Trend & District Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              {skillName} 12-Month Demand Trend
            </h2>
            <p className="text-xs text-slate-500">
              Apr 2025–Mar 2026 • Job requirement index • Synthetic employer feed
            </p>
          </div>
          <CanvasChart type="line" data={trendData} height={240} />
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                District Signals
              </h2>
              <p className="text-xs text-slate-500">
                Relative concentration of requirement mentions
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Pune</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                  High Demand
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Mumbai</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                  High Demand
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Thane</span>
                <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold">
                  Moderate Signal
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Nagpur</span>
                <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold">
                  Moderate Signal
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Source: 11 industry job postings corpus • Updated Sep 2026
          </div>
        </div>
      </div>

      {/* Row 2: Related Skills Network & Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Network Diagram */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Related Competencies Network
            </h2>
            <p className="text-xs text-slate-500">
              Co-occurrence strength in employer job descriptions
            </p>
          </div>

          <div className="relative h-72 w-full bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              <line x1="50%" y1="50%" x2="20%" y2="24%" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="80%" y2="22%" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="82%" y2="74%" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="24%" y2="78%" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="50%" y1="50%" x2="50%" y2="14%" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>

            {/* Center Focus Node */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 rounded-full bg-[#102c49] text-white border-2 border-amber-400 font-bold text-xs shadow-lg text-center z-10"
              style={{ left: '50%', top: '50%' }}
            >
              <div>{skillName}</div>
              <span className="text-[9px] text-amber-300 font-normal">focus skill</span>
            </div>

            {/* Satellite Nodes */}
            {[
              { name: 'JavaScript', pct: '92% correlation', left: '20%', top: '24%' },
              { name: 'TypeScript', pct: '78% correlation', left: '80%', top: '22%' },
              { name: 'Node.js', pct: '67% correlation', left: '82%', top: '74%' },
              { name: 'Next.js', pct: '64% correlation', left: '24%', top: '78%' },
              { name: 'AWS Cloud', pct: '49% correlation', left: '50%', top: '14%' },
            ].map((node, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold shadow-xs text-center"
                style={{ left: node.left, top: node.top }}
              >
                <div>{node.name}</div>
                <small className="text-[9px] text-slate-500 font-normal">{node.pct}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Linked Vocational Courses */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Mapped Courses &amp; Institutes
              </h2>
              <p className="text-xs text-slate-500">
                Programs teaching or missing {skillName} competency
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <strong className="block font-bold text-slate-900 dark:text-slate-100">
                  Advanced Web Development Module
                </strong>
                <span className="text-slate-500">Aundh ITI • Pune</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <strong className="block font-bold text-slate-900 dark:text-slate-100">
                  Full Stack Applications Specialization
                </strong>
                <span className="text-slate-500">Govt. Polytechnic Pune</span>
              </div>

              <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex items-center justify-between">
                  <strong className="font-bold text-amber-900 dark:text-amber-300">
                    COPA Enrichment Proposal (Skill Deficit)
                  </strong>
                  <span className="text-[10px] font-bold text-rose-600">Missing</span>
                </div>
                <span className="text-slate-500 mt-0.5 block">
                  Pimpri ITI &amp; Aundh ITI • Under Technical Review
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate('skillgap')}
              className="w-full py-2 rounded-lg bg-[#173a5e] text-white font-semibold text-xs hover:bg-[#102c49] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect COPA Course Skill Gap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
