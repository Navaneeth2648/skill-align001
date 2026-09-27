import React, { useState } from 'react';
import { EvidenceInfo, RouteId } from '../../types';
import { useApp } from '../../context/AppContext';
import { ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';

interface EvidencePanelProps {
  evidence: EvidenceInfo;
  title?: string;
  defaultOpen?: boolean;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ 
  evidence, 
  title = "Evidence & Traceability Details", 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { navigate } = useApp();

  const fields = [
    { label: 'WHY', value: evidence.why },
    { label: 'DATA USED', value: evidence.data },
    { label: 'TIME PERIOD', value: evidence.period },
    { label: 'SOURCE', value: evidence.source },
    { label: 'CONFIDENCE', value: evidence.confidence },
    { label: 'ASSUMPTIONS', value: evidence.assumptions },
    { label: 'LIMITATIONS', value: evidence.limitations },
    { label: 'EVIDENCE', value: evidence.evidence },
    { label: 'RECOMMENDED ACTION', value: evidence.action },
  ];

  return (
    <div className="mt-3 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 text-xs shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-semibold text-[#173a5e] dark:text-sky-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          {title}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {fields.map((f, i) => (
              <div key={i} className="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80">
                <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-0.5">
                  {f.label}
                </span>
                <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          {evidence.route && (
            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={() => navigate(evidence.route as RouteId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#173a5e] text-white hover:bg-[#102c49] font-medium transition-colors text-xs"
              >
                <span>View Underlying Evidence</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
