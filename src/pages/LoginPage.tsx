import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import { UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { role, setRole, navigate, showToast } = useApp();
  const [selectedDemoRole, setSelectedDemoRole] = useState<Role>(role);

  const roles: { id: Role; label: string; desc: string; target: any }[] = [
    { id: 'State Admin', label: 'State Admin', desc: 'Statewide analytics, budget envelopes, and policy reporting.', target: 'dashboard' },
    { id: 'District Officer', label: 'District Officer', desc: 'Pune district workforce planning, local capacity, and alert review.', target: 'districtintel' },
    { id: 'ITI Principal', label: 'ITI Principal', desc: 'Institute courses, trainer development, and lab equipment.', target: 'institutes' },
    { id: 'Trainer', label: 'Trainer / Faculty', desc: 'Personal teaching credentials, proficiency meters, and development.', target: 'trainers' },
    { id: 'Employer', label: 'Employer Partner', desc: 'Vacancy creation, AI skill validation, and student apprenticeships.', target: 'employerportal' },
    { id: 'Student', label: 'Student / Learner', desc: 'Career pathway ladder, skill wallet, scholarships, and matched jobs.', target: 'studentportal' },
    { id: 'Super Admin', label: 'Super Admin', desc: 'User directories, role-permission matrix, audit logs, and telemetry.', target: 'usermanagement' },
  ];

  const handleContinue = () => {
    setRole(selectedDemoRole);
    const target = roles.find(r => r.id === selectedDemoRole)?.target || 'dashboard';
    navigate(target);
    showToast(`Logged into demonstration role as: ${selectedDemoRole}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 text-xs">
        {/* Left Intro Banner */}
        <div className="md:col-span-5 bg-[#102c49] text-white p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-block px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] tracking-widest uppercase border border-amber-400/30">
              PROTOTYPE ACCESS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white leading-snug">
              Role-Based Demonstration Login
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Explore how each stakeholder examines the same synchronized labour-market evidence through a role-appropriate lens.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-[11px] text-slate-300 space-y-1.5">
            <strong className="block text-amber-300 font-bold">Zero Credentials Required</strong>
            <p>All records are synthetic and scoped to this demonstration session.</p>
          </div>
        </div>

        {/* Right Selection Form */}
        <div className="md:col-span-7 p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Choose a Demonstration Stakeholder Role
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Select any role to instantly open its customized workspace view.
            </p>
          </div>

          <div className="space-y-2">
            {roles.map(r => {
              const isSelected = selectedDemoRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedDemoRole(r.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/40'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div>
                    <strong className="block text-xs font-bold">{r.label}</strong>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{r.desc}</span>
                  </div>
                  {isSelected && (
                    <UserCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-3 rounded-xl bg-[#173a5e] text-white font-bold text-xs hover:bg-[#102c49] shadow-md flex items-center justify-center gap-2"
          >
            <span>Continue to {selectedDemoRole} Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
