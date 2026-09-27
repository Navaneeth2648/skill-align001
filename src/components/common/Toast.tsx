import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 bg-[#0c1e33] text-white px-4 py-3 rounded border border-[#1e3957] border-l-4 border-l-[#15803d] text-xs max-w-sm flex items-center gap-2.5 shadow-xl transition-all duration-150"
      role="status"
      aria-live="polite"
    >
      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
      <span className="font-medium text-slate-100">{toastMessage}</span>
    </div>
  );
};
