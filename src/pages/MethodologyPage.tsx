import React from 'react';
import { BookCheck, ShieldCheck } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Where Data Originates',
      desc: 'Demonstration records mirror five source families: government geographical references, employer vacancies, institute capacity, market signals, and verified placement outcomes. Each record retains its source tag and synchronization timestamp.'
    },
    {
      num: '2',
      title: 'Processing & Field Normalization',
      desc: 'Raw textual vacancy feeds are normalized, district and occupation taxonomies are reconciled, and low-confidence or incomplete records are routed to the Data Quality Centre.'
    },
    {
      num: '3',
      title: 'Evidence-Backed Skill Extraction',
      desc: 'Deterministic and semantic rules parse known competency terms, retaining quoted snippet context as verifiable evidence and assigning explicit confidence scores.'
    },
    {
      num: '4',
      title: 'De-duplication & Clustering',
      desc: 'Cross-platform duplicate vacancies are identified by combining employer identity, title, location, date, and description similarity to prevent signal inflation.'
    },
    {
      num: '5',
      title: 'Curriculum Gap Analysis',
      desc: 'Institutional course syllabus competencies are compared with market demand. Threshold rules flag deficits and draft recommendations without autonomous curriculum alterations.'
    },
    {
      num: '6',
      title: 'Synchronization & Freshness',
      desc: 'The prototype displays a fixed snapshot synchronized on 26 Sep 2026 at 18:30 IST. A production deployment establishes scheduled pipeline ingestions with data staleness flags.'
    },
    {
      num: '7',
      title: 'Confidence & Transparency',
      desc: 'Confidence indicates match precision and record completeness. All consequential analytical outputs provide assumptions, limitations, and direct links to underlying records.'
    },
    {
      num: '8',
      title: 'Limitations & Governance',
      desc: 'Synthetic datasets cannot establish statistical causality or forecast macro trends. All strategic policy, budget allocation, and certification decisions require human review.'
    }
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-amber-500" />
            <span>Analytical Methodology &amp; Governance</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            How raw workforce evidence moves from vacancy feeds to reviewable government decision support.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          PUBLIC TRUST PROTOCOL
        </span>
      </div>

      <div className="bg-[#102c49] text-white p-5 rounded-xl border-l-4 border-l-amber-500 shadow-md">
        <h2 className="text-base font-bold mb-1">Transparent &amp; Accountable by Design</h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          MS-LMI is a government-focused academic demonstration platform. Its data is synthetic and demonstrates how a governed, transparent analytical workflow functions without opaque black-box decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {steps.map(s => (
          <article
            key={s.num}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#173a5e] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {s.num}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {s.title}
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed pl-8">
              {s.desc}
            </p>
          </article>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Constitutional Accountability Principle</strong>
          <span>
            AI algorithms may extract, cluster, correlate, and draft recommendations. Authorized government officials, ITI principals, and accredited industry panels must evaluate, review, and authorize all curriculum and funding actions.
          </span>
        </div>
      </div>
    </div>
  );
};
