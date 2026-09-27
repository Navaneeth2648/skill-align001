import React from 'react';
import { Database, ShieldCheck } from 'lucide-react';

export const DataSourcesPage: React.FC = () => {
  const sources = [
    {
      title: 'Government Reference Dataset — Demo',
      category: 'GOVERNMENT DATA',
      coverage: '36 Maharashtra districts; industrial and vocational classifications',
      updated: '26 Sep 2026',
      methodology: 'Standardized reference catalogues joined by district and occupation census identifiers.',
      limitations: 'Demonstration lists; not official or suitable for statutory reporting.'
    },
    {
      title: 'Employer Demand Feed — Demo',
      category: 'EMPLOYER DATA',
      coverage: '11 priority economic sectors; verified demonstration employers',
      updated: '26 Sep 2026',
      methodology: 'Structured vacancy descriptions with employer-validated AI competency tags.',
      limitations: 'Curated sample; does not represent exhaustive corporate hiring.'
    },
    {
      title: 'Training Supply Register — Demo',
      category: 'INSTITUTE DATA',
      coverage: 'ITI, polytechnic, and vocational skill-centre cohorts',
      updated: '25 Sep 2026',
      methodology: 'Course syllabus maps linked with lab tooling registers and certified trainer rosters.',
      limitations: 'Capacities are illustrative snapshots for demonstration planning.'
    },
    {
      title: 'Job Market Signal Corpus — Demo',
      category: 'JOB MARKET DATA',
      coverage: '11 sectors; Apr–Sep 2026 demonstration period',
      updated: '26 Sep 2026',
      methodology: 'Text normalization, duplicate resolution, and verified skill extraction.',
      limitations: 'Synthetic sample; excludes unadvertised or informal economy employment.'
    },
    {
      title: 'Learner Outcome Register — Demo',
      category: 'PLACEMENT DATA',
      coverage: 'Selected vocational programs and training batches',
      updated: '24 Sep 2026',
      methodology: 'Aggregate cohort graduation and verified placement verification checks.',
      limitations: 'Demonstration metrics; outcomes may be influenced by external macroeconomic factors.'
    }
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-sky-600" />
            <span>Data Sources &amp; Ingestion Lineage</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent provenance metadata across workforce demand, institute capacity, and learner outcomes.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          ALL SOURCES • DEMO DATA
        </span>
      </div>

      <div className="bg-[#102c49] text-white p-5 rounded-xl border-l-4 border-l-amber-500 shadow-md">
        <h2 className="text-base font-bold mb-1">Designed for Rigorous Traceability</h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          These catalog entries describe the schema and lineage of the evidence pipeline. No live government production database or proprietary employer exchange is connected to this academic demonstration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sources.map((s, idx) => (
          <article
            key={idx}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                {s.category}
              </span>
              <span className="text-[10px] text-slate-400">Updated: {s.updated}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {s.title}
            </h3>

            <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
              <div><strong>Geographic &amp; Sectoral Coverage:</strong> {s.coverage}</div>
              <div><strong>Ingestion Methodology:</strong> {s.methodology}</div>
              <div className="text-slate-500 dark:text-slate-400 italic">
                <strong>Data Limitations:</strong> {s.limitations}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
