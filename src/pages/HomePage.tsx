import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, Users, GraduationCap, Briefcase, FileCheck, MapPin, 
  ArrowRight, ShieldCheck, Database, Award, ArrowUpRight
} from 'lucide-react';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

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
            <div className="relative bg-gradient-to-br from-[#0c233c] via-[#091b2e] to-[#05111d] border border-sky-500/25 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-hidden text-white backdrop-blur-md ring-1 ring-white/10 group transition-all duration-300 hover:border-sky-400/40 hover:shadow-sky-950/50">
              {/* Ambient Background Glows & Technical Grid */}
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

              {/* Card Header Status Row */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-100 tracking-wide block">
                      Workforce Ecosystem Signal
                    </span>
                    <span className="text-[10px] text-sky-300/80 font-mono">
                      State Decision Triangulation
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold tracking-wide shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-Time Signal</span>
                </div>
              </div>

              {/* Dynamic Interactive SVG Network Diagram */}
              <div className="relative h-68 w-full z-10">
                <svg viewBox="0 0 520 310" className="w-full h-full select-none" aria-label="Interactive workforce intelligence ecosystem network diagram">
                  <defs>
                    {/* Gradients */}
                    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                    <linearGradient id="govGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                    <linearGradient id="indGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="empGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="distGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    
                    {/* Core Glow Filter */}
                    <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Outer Radar Rings around Core */}
                  <circle cx="260" cy="148" r="74" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,6" opacity="0.35" className="animate-spin" style={{ transformOrigin: '260px 148px', animationDuration: '30s' }} />
                  <circle cx="260" cy="148" r="54" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />

                  {/* Data Pathways (Connecting lines) */}
                  <g stroke="#38bdf8" strokeWidth="1.75" strokeDasharray="5,5" opacity="0.55">
                    <line x1="260" y1="148" x2="90" y2="68" />
                    <line x1="260" y1="148" x2="430" y2="65" />
                    <line x1="260" y1="148" x2="85" y2="242" />
                    <line x1="260" y1="148" x2="432" y2="240" />
                    <line x1="260" y1="148" x2="260" y2="272" />
                  </g>
                  
                  {/* Secondary Inter-node Synapses */}
                  <g stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,6" opacity="0.25">
                    <line x1="90" y1="68" x2="430" y2="65" />
                    <line x1="85" y1="242" x2="260" y2="272" />
                    <line x1="260" y1="272" x2="432" y2="240" />
                    <line x1="90" y1="68" x2="85" y2="242" />
                    <line x1="430" y1="65" x2="432" y2="240" />
                  </g>

                  {/* Telemetry Particles traveling along lines */}
                  <circle cx="175" cy="108" r="2.5" fill="#fef08a" opacity="0.9" />
                  <circle cx="345" cy="106" r="2.5" fill="#38bdf8" opacity="0.9" />
                  <circle cx="172" cy="195" r="2.5" fill="#34d399" opacity="0.9" />
                  <circle cx="346" cy="194" r="2.5" fill="#c084fc" opacity="0.9" />
                  <circle cx="260" cy="210" r="2.5" fill="#fb923c" opacity="0.9" />

                  {/* Satellite Node 1: Government Policy */}
                  <g className="cursor-pointer transition-transform hover:scale-105" style={{ transformOrigin: '90px 68px' }}>
                    <circle cx="90" cy="68" r="32" fill="#0c233c" stroke="#38bdf8" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="90" cy="68" r="25" fill="url(#govGrad)" />
                    <text x="90" y="65" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.5">GOV</text>
                    <text x="90" y="76" textAnchor="middle" fill="#bae6fd" fontSize="7.5" fontWeight="600">Policy</text>
                    <rect x="52" y="104" width="76" height="15" rx="3" fill="#091a2d" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
                    <text x="90" y="114.5" textAnchor="middle" fill="#7dd3fc" fontSize="7.5" fontWeight="600">36 Districts</text>
                  </g>

                  {/* Satellite Node 2: Industry Demand */}
                  <g className="cursor-pointer transition-transform hover:scale-105" style={{ transformOrigin: '430px 65px' }}>
                    <circle cx="430" cy="65" r="32" fill="#0c233c" stroke="#38bdf8" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="430" cy="65" r="25" fill="url(#indGrad)" />
                    <text x="430" y="62" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.5">INDUSTRY</text>
                    <text x="430" y="73" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="600">Vacancies</text>
                    <rect x="390" y="101" width="80" height="15" rx="3" fill="#091a2d" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
                    <text x="430" y="111.5" textAnchor="middle" fill="#7dd3fc" fontSize="7.5" fontWeight="600">1.23L Openings</text>
                  </g>

                  {/* Satellite Node 3: Training / ITIs */}
                  <g className="cursor-pointer transition-transform hover:scale-105" style={{ transformOrigin: '85px 242px' }}>
                    <circle cx="85" cy="242" r="30" fill="#0c233c" stroke="#34d399" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="85" cy="242" r="24" fill="url(#trainGrad)" />
                    <text x="85" y="239" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800" letterSpacing="0.5">TRAINING</text>
                    <text x="85" y="250" textAnchor="middle" fill="#d1fae5" fontSize="7.5" fontWeight="600">ITIs &amp; Poly</text>
                    <rect x="47" y="276" width="76" height="15" rx="3" fill="#091a2d" stroke="#10b981" strokeWidth="0.8" opacity="0.8" />
                    <text x="85" y="286.5" textAnchor="middle" fill="#6ee7b7" fontSize="7.5" fontWeight="600">417 Institutes</text>
                  </g>

                  {/* Satellite Node 4: Employers Placement */}
                  <g className="cursor-pointer transition-transform hover:scale-105" style={{ transformOrigin: '432px 240px' }}>
                    <circle cx="432" cy="240" r="30" fill="#0c233c" stroke="#a78bfa" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="432" cy="240" r="24" fill="url(#empGrad)" />
                    <text x="432" y="237" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800" letterSpacing="0.5">EMPLOYERS</text>
                    <text x="432" y="248" textAnchor="middle" fill="#ede9fe" fontSize="7.5" fontWeight="600">Apprentices</text>
                    <rect x="394" y="274" width="76" height="15" rx="3" fill="#091a2d" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.8" />
                    <text x="432" y="284.5" textAnchor="middle" fill="#c4b5fd" fontSize="7.5" fontWeight="600">2,840 Partners</text>
                  </g>

                  {/* Satellite Node 5: Districts & Learners */}
                  <g className="cursor-pointer transition-transform hover:scale-105" style={{ transformOrigin: '260px 272px' }}>
                    <circle cx="260" cy="272" r="28" fill="#0c233c" stroke="#fb923c" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="260" cy="272" r="22" fill="url(#distGrad)" />
                    <text x="260" y="269" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">LEARNERS</text>
                    <text x="260" y="279" textAnchor="middle" fill="#ffedd5" fontSize="7.5" fontWeight="600">Talent Pool</text>
                  </g>

                  {/* Central Hub Core: SKILLS INTELLIGENCE */}
                  <g filter="url(#coreGlow)" className="cursor-pointer">
                    <circle cx="260" cy="148" r="42" fill="#0b1e33" stroke="#f59e0b" strokeWidth="2.5" />
                    <circle cx="260" cy="148" r="35" fill="url(#coreGrad)" />
                    
                    {/* Inner Embellishments */}
                    <circle cx="260" cy="148" r="30" fill="none" stroke="#fef3c7" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                    <text x="260" y="143" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" letterSpacing="0.8">
                      MS-LMIP
                    </text>
                    <text x="260" y="157" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="700">
                      SKILL CORE
                    </text>
                  </g>
                </svg>
              </div>

              {/* Real-time Telemetry Metrics Strip */}
              <div className="relative z-10 grid grid-cols-3 gap-2 my-2 py-2.5 px-3 bg-[#061423]/90 border border-white/10 rounded-xl text-center">
                <div className="border-r border-white/10 pr-2">
                  <span className="block text-[9px] text-slate-400 font-medium uppercase tracking-wider">Demand Match</span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                    <AnimatedNumber value="94.2%" />
                  </span>
                </div>
                <div className="border-r border-white/10 px-1">
                  <span className="block text-[9px] text-slate-400 font-medium uppercase tracking-wider">Districts Linked</span>
                  <span className="text-xs sm:text-sm font-extrabold text-sky-400">
                    <AnimatedNumber value="36 / 36" />
                  </span>
                </div>
                <div className="pl-2">
                  <span className="block text-[9px] text-slate-400 font-medium uppercase tracking-wider">Active Signals</span>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-400">
                    <AnimatedNumber value="1,23,456" />
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-2 text-[11px] text-slate-300 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-300 font-medium">Evidence-backed triangulation loop</span>
                </div>
                <span className="text-amber-400 font-semibold text-[10px] bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/25">
                  100% Traceable
                </span>
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
                <AnimatedNumber value="1,23,456" />
              </strong>
              <span className="text-xs text-slate-300 font-medium">Jobs Analysed</span>
            </div>
            <div className="border-r border-white/10 last:border-0 pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-white">
                <AnimatedNumber value="847" />
              </strong>
              <span className="text-xs text-slate-300 font-medium">Courses Mapped</span>
            </div>
            <div className="border-r border-white/10 last:border-0 pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-white">
                <AnimatedNumber value="2,341" />
              </strong>
              <span className="text-xs text-slate-300 font-medium">Active Employers</span>
            </div>
            <div className="border-r border-white/10 last:border-0 pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-white">
                <AnimatedNumber value="36" />
              </strong>
              <span className="text-xs text-slate-300 font-medium">Districts Covered</span>
            </div>
            <div className="pr-4">
              <strong className="block text-2xl lg:text-3xl font-extrabold text-emerald-400">
                <AnimatedNumber value="12,480" />
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
