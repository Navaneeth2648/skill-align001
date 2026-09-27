import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#081525] text-slate-300 border-t border-[#1a334d] text-xs py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded border border-amber-400/40 bg-[#102c49] flex items-center justify-center font-bold text-amber-300 text-[10px]">
                MH
              </div>
              <span className="font-bold text-white text-sm">
                Maharashtra Skill &amp; Labour Market Intelligence Platform
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Skill, Employment, Entrepreneurship &amp; Innovation Department • Government of Maharashtra
            </p>
            <p className="text-[11px] text-slate-500">
              Technical Decision Support Prototype • Designed in compliance with National Skill Qualification Framework (NSQF) &amp; Digital India Standards.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <button 
              type="button" 
              onClick={() => navigate('about')} 
              className="hover:text-amber-300 hover:underline cursor-pointer"
            >
              About Platform
            </button>
            <button 
              type="button" 
              onClick={() => navigate('datasources')} 
              className="hover:text-amber-300 hover:underline cursor-pointer"
            >
              Data Provenance
            </button>
            <button 
              type="button" 
              onClick={() => navigate('methodology')} 
              className="hover:text-amber-300 hover:underline cursor-pointer"
            >
              Methodology
            </button>
            <button 
              type="button" 
              onClick={() => navigate('faq')} 
              className="hover:text-amber-300 hover:underline cursor-pointer"
            >
              Help &amp; FAQ
            </button>
            <button 
              type="button" 
              onClick={() => navigate('contact')} 
              className="hover:text-amber-300 hover:underline cursor-pointer"
            >
              Nodal Contact
            </button>
          </div>
        </div>

        {/* Regulatory Safeguard Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              <strong>Statutory Human Review:</strong> Algorithmic signals and AI extractions do not constitute autonomous administrative actions. Final approvals remain with authorized government officers.
            </span>
          </div>
          <span className="font-mono text-slate-500 text-[10px] shrink-0">
            © 2026 Government of Maharashtra. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
