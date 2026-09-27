import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#0b1c2f] text-slate-300 border-t border-slate-800 text-xs py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">
              Maharashtra Skill &amp; Labour Market Intelligence Platform
            </span>
            <span className="bg-amber-950/80 border border-amber-600/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
              SIH PROTOTYPE
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Government-focused academic and policy decision-support demonstration platform.
          </p>
          <p className="text-slate-500 text-[11px]">
            Fixed synthetic demonstration snapshot • Last synchronized: 26 Sep 2026, 18:30 IST
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-4 text-xs font-medium text-slate-300">
          <button 
            type="button" 
            onClick={() => navigate('about')} 
            className="hover:text-amber-400 hover:underline"
          >
            About
          </button>
          <button 
            type="button" 
            onClick={() => navigate('datasources')} 
            className="hover:text-amber-400 hover:underline"
          >
            Data Sources
          </button>
          <button 
            type="button" 
            onClick={() => navigate('methodology')} 
            className="hover:text-amber-400 hover:underline"
          >
            Methodology
          </button>
          <button 
            type="button" 
            onClick={() => navigate('faq')} 
            className="hover:text-amber-400 hover:underline"
          >
            FAQ
          </button>
          <button 
            type="button" 
            onClick={() => navigate('contact')} 
            className="hover:text-amber-400 hover:underline"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};
