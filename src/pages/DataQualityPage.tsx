import React from 'react';
import { useApp } from '../context/AppContext';
import { QUALITY_ISSUES_DATA } from '../data/mockData';
import { ShieldAlert, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export const DataQualityPage: React.FC = () => {
  const { showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Data Quality &amp; Hygiene Centre</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor and prioritize data remediation before analytical insights or policy planning reviews.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          SYNTHETIC QUALITY PROFILE
        </span>
      </div>

      {/* Prominent Notice */}
      <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-sm font-bold">23% of synthetic vacancy records are missing district identifiers</strong>
          <p className="mt-0.5 leading-relaxed">
            District-level demand analysis should not be treated as complete until affected records are reviewed and matched against official Maharashtra taluka and district gazettes.
          </p>
        </div>
      </div>

      {/* Quality Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
        {QUALITY_ISSUES_DATA.map((q, idx) => {
          const isCritical = q.severity === 'Critical';
          const isHigh = q.severity === 'High';

          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isCritical
                      ? 'bg-rose-100 text-rose-800'
                      : isHigh
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-sky-100 text-sky-800'
                  }`}>
                    {q.severity} Severity
                  </span>
                  <strong className="text-xl font-black text-slate-900 dark:text-slate-100">
                    {q.count}
                  </strong>
                </div>

                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
                  {q.issue}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {q.description}
                </p>

                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border text-[11px]">
                  <strong className="block text-slate-700 dark:text-slate-200 font-semibold mb-0.5">
                    Recommended Remediation:
                  </strong>
                  <span className="text-slate-500">{q.recommendedAction}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast(`Remediation queue opened for: ${q.issue}`)}
                className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#173a5e] dark:text-sky-300 font-semibold"
              >
                Review Issue in Queue
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
