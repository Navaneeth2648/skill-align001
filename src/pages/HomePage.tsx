import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, Users, GraduationCap, Briefcase, FileCheck, MapPin, 
  ArrowRight, ShieldCheck, Database, Award, ArrowUpRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-white via-slate-50 to-sky-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-800 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Labour Market Intelligence • Skill Development • Workforce Planning</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102c49] dark:text-white tracking-tight leading-tight">
              Connecting Skills, Training &amp; Industry Across Maharashtra
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              An evidence-driven government intelligence platform for evaluating real-time workforce demand, pinpointing district skill gaps, and synchronizing training curricula with evolving industry standards.
            </p>

            <div className="flex items-center flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('labour')}
                className="px-5 py-2.5 rounded-lg bg-[#173a5e] text-white font-semibold text-xs sm:text-sm hover:bg-[#102c49] transition-all shadow-sm flex items-center gap-2"
              >
                <span>Explore Labour Market</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('reportscentre')}
                className="px-5 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[#173a5e] dark:text-sky-300 font-semibold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              >
                View Public Reports
              </button>

              <button
                type="button"
                onClick={() => navigate('login')}
                className="px-5 py-2.5 rounded-lg bg-amber-600 text-white font-semibold text-xs sm:text-sm hover:bg-amber-700 transition-colors shadow-sm"
              >
                Sign In Demo Roles
              </button>
            </div>
          </div>

          {/* Interactive Ecosystem Network SVG Graphic */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#0b2239] border border-[#274663] rounded-xl p-5 shadow-xl overflow-hidden text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2">
                <span className="text-xs font-bold text-amber-300 tracking-wide">
                  Workforce Ecosystem Signal
                </span>
                <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  DEMO DATA
                </span>
              </div>

              <div className="relative h-64 w-full">
                <svg viewBox="0 0 520 300" className="w-full h-full" aria-label="Interactive workforce network diagram">
                  {/* Connection lines */}
                  <g stroke="#6f90aa" strokeWidth="1.5" strokeDasharray="5,6" opacity="0.6">
                    <line x1="260" y1="145" x2="88" y2="68" />
                    <line x1="260" y1="145" x2="426" y2="62" />
                    <line x1="260" y1="145" x2="84" y2="236" />
                    <line x1="260" y1="145" x2="429" y2="235" />
                    <line x1="260" y1="145" x2="260" y2="266" />
                    <line x1="88" y1="68" x2="426" y2="62" />
                    <line x1="84" y1="236" x2="260" y2="266" />
                    <line x1="260" y1="266" x2="429" y2="235" />
                  </g>

                  {/* Core Node */}
                  <circle cx="260" cy="145" r="36" fill="#c96a0a" stroke="#ffd9a6" strokeWidth="2.5" />
                  <text x="260" y="142" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
                    SKILLS
                  </text>
                  <text x="260" y="156" textAnchor="middle" fill="#ffe2b8" fontSize="9" fontWeight="600">
                    Intelligence
                  </text>

                  {/* Outer Nodes */}
                  <g fontSize="9" fontWeight="700" textAnchor="middle" fill="#eef5fa">
                    <circle cx="88" cy="68" r="26" fill="#173a5e" stroke="#d6e4ef" strokeWidth="1.5" />
                    <text x="88" y="72">GOV</text>

                    <circle cx="426" cy="62" r="27" fill="#173a5e" stroke="#d6e4ef" strokeWidth="1.5" />
                    <text x="426" y="66">INDUSTRY</text>

                    <circle cx="84" cy="236" r="26" fill="#173a5e" stroke="#d6e4ef" strokeWidth="1.5" />
                    <text x="84" y="240">TRAINING</text>

                    <circle cx="429" cy="235" r="29" fill="#173a5e" stroke="#d6e4ef" strokeWidth="1.5" />
                    <text x="429" y="239">EMPLOYMENT</text>

                    <circle cx="260" cy="266" r="24" fill="#173a5e" stroke="#d6e4ef" strokeWidth="1.5" />
                    <text x="260" y="270">LEARNERS</text>
                  </g>
                </svg>
              </div>

              <div className="pt-2 text-[11px] text-slate-300 flex items-center justify-between border-t border-white/10">
                <span>Integrated multi-stakeholder feedback loop</span>
                <span className="text-amber-400 font-semibold">100% Traceable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statewide Stats Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102c49] text-white rounded-xl shadow-md p-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
            <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
              Maharashtra Statewide Baseline Snapshot
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
              SYNTHETIC VALUES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <div className="border-r border-white/10 last:border-0 pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-amber-300">
                1,23,456
              </strong>
              <span className="text-xs text-slate-300 font-medium">Jobs Analysed</span>
            </div>
            <div className="border-r border-white/10 last:border-0 pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-white">
                847
              </strong>
              <span className="text-xs text-slate-300 font-medium">Courses Mapped</span>
            </div>
            <div className="border-r border-white/10 last:border-0 pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-white">
                2,341
              </strong>
              <span className="text-xs text-slate-300 font-medium">Active Employers</span>
            </div>
            <div className="border-r border-white/10 last:border-0 pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-white">
                36
              </strong>
              <span className="text-xs text-slate-300 font-medium">Districts Covered</span>
            </div>
            <div className="pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-emerald-400">
                12,480
              </strong>
              <span className="text-xs text-slate-300 font-medium">Skills Identified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Six Stakeholders Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#102c49] dark:text-white">
              One Intelligence Layer, Six Stakeholders
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Synchronizing evidence and actions across Maharashtra's workforce-development ecosystem.
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2.5 py-1 rounded">
            DEMONSTRATION ECOSYSTEM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              role: 'Government & State Administration',
              desc: 'Formulate evidence-based skill policies, monitor statewide demand trends, allocate equipment budgets, and audit training outcomes.',
              icon: <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
              route: 'dashboard' as const,
              action: 'Open Executive Dashboard'
            },
            {
              role: 'Training Institutes & ITIs',
              desc: 'Align course offerings with local industry needs, optimize lab equipment utilization, and assess trainer upskilling paths.',
              icon: <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
              route: 'coursealignment' as const,
              action: 'Inspect Course Alignment'
            },
            {
              role: 'Employers & Industry Partners',
              desc: 'Communicate real-time vacancy skill requirements, validate AI-extracted competencies, and partner with regional institutes.',
              icon: <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
              route: 'employerportal' as const,
              action: 'Visit Employer Portal'
            },
            {
              role: 'Trainers & Instructors',
              desc: 'Track certifications, identify emerging subject gaps (e.g. EV diagnostics, Industrial IoT), and access professional development modules.',
              icon: <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
              route: 'trainers' as const,
              action: 'Explore Trainer Hub'
            },
            {
              role: 'Students & Job Seekers',
              desc: 'Discover high-demand local careers, trace personalized learning pathways, manage digital credential wallets, and find verified internships.',
              icon: <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
              route: 'studentportal' as const,
              action: 'Access Student Portal'
            },
            {
              role: 'District Administration',
              desc: 'Conduct district-level demand drill-downs, generate data-grounded annual training capacity plans, and prevent regional skill shortages.',
              icon: <MapPin className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
              route: 'districtintel' as const,
              action: 'View Pune Intelligence'
            },
          ].map((card, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs hover:shadow-md transition-all border-t-4 border-t-[#173a5e] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                  {card.role}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {card.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(card.route)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173a5e] dark:text-sky-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors pt-3 border-t border-slate-100 dark:border-slate-800"
              >
                <span>{card.action}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 9-Step Accountable Pipeline */}
      <section className="bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#102c49] dark:text-white">
              From Market Signal to Accountable Public Action
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              AI supports analytical extraction and pattern detection; authorized human reviewers inspect and decide all policy, curriculum, and budget changes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {[
              { num: '01', title: 'Job Market Data', desc: 'Raw vacancies' },
              { num: '02', title: 'Skill Extraction', desc: 'AI terminology parser' },
              { num: '03', title: 'Labour Analysis', desc: 'Demand & trends' },
              { num: '04', title: 'Skill Gap', desc: 'Curriculum deficit' },
              { num: '05', title: 'Curriculum Alignment', desc: 'Review proposals' },
              { num: '06', title: 'Trainer & Equipment', desc: 'Capacity planning' },
              { num: '07', title: 'Employer Connect', desc: 'Validated hiring' },
              { num: '08', title: 'Student Outcomes', desc: 'Placement records' },
              { num: '09', title: 'Decision Support', desc: 'Human authorization' },
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3.5 shadow-2xs relative flex flex-col justify-between"
              >
                <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                  {step.num}
                </span>
                <strong className="block text-xs font-bold text-slate-800 dark:text-slate-100 my-1 leading-snug">
                  {step.title}
                </strong>
                <small className="text-[10px] text-slate-500 dark:text-slate-400">
                  {step.desc}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
