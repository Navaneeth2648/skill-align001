import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 bg-[#102c49] text-white px-4 py-3 rounded-lg shadow-xl border-l-4 border-[#267653] text-xs max-w-sm flex items-center gap-2 animate-bounce-subtle"
      role="status"
      aria-live="polite"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
      <span>{toastMessage}</span>
    </div>
  );
};
