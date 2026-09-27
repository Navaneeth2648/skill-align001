import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRAINERS_DATA } from '../data/mockData';
import { TrainerRecord } from '../types';
import { Users, Search, Award, CheckCircle, Clock, BookOpen, AlertTriangle } from 'lucide-react';

export const TrainerManagementPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'directory' | 'profile' | 'gaps'>('directory');
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerRecord>(TRAINERS_DATA[0]);

  // Directory filters
  const [search, setSearch] = useState('');
  const [institute, setInstitute] = useState('All institutes');
  const [skill, setSkill] = useState('All skills');
  const [cert, setCert] = useState('All statuses');
  const [sort, setSort] = useState<'name' | 'experience' | 'training'>('name');

  const filteredTrainers = TRAINERS_DATA.filter(t => {
    const q = search.toLowerCase();
    const matchesSearch = !q || [t.name, t.institute, t.skills.join(' ')].join(' ').toLowerCase().includes(q);
    const matchesInst = institute === 'All institutes' || t.institute === institute;
    const matchesSkill = skill === 'All skills' || t.skills.includes(skill);
    const matchesCert = cert === 'All statuses' || t.cert === cert;
    return matchesSearch && matchesInst && matchesSkill && matchesCert;
  });

  filteredTrainers.sort((a, b) => {
    if (sort === 'experience') return b.experience - a.experience;
    if (sort === 'training') return b.last.localeCompare(a.last);
    return a.name.localeCompare(b.name);
  });

  const handleOpenTrainer = (t: TrainerRecord) => {
    setSelectedTrainer(t);
    setActiveTab('profile');
    showToast(`Viewing profile of ${t.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-[#173a5e] dark:text-sky-400" />
            <span>Trainer Capability &amp; Development Hub</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Faculty skills register, proficiency mapping, and professional upskilling trajectories.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* Subview Nav Bar */}
      <div className="bg-[#102c49] text-white p-2 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('directory')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'directory' ? 'bg-white text-[#102c49]' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Directory
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'profile' ? 'bg-white text-[#102c49]' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Trainer Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gaps')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'gaps' ? 'bg-white text-[#102c49]' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Gap Analysis
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('equipment')}
            className="px-2.5 py-1 rounded bg-white/10 text-slate-200 hover:bg-white/20 text-[11px]"
          >
            Equipment Planning →
          </button>
          <button
            type="button"
            onClick={() => navigate('districtintel')}
            className="px-2.5 py-1 rounded bg-white/10 text-slate-200 hover:bg-white/20 text-[11px]"
          >
            District Evidence →
          </button>
        </div>
      </div>

      {/* SUBVIEW 1: DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Trainer, skill, or institute..."
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md pl-8 pr-2.5 py-1.5 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Institute
              </label>
              <select
                value={institute}
                onChange={e => setInstitute(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
              >
                <option>All institutes</option>
                <option>Aundh ITI</option>
                <option>Pimpri ITI</option>
                <option>Govt. Polytechnic Pune</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Specialized Skill
              </label>
              <select
                value={skill}
                onChange={e => setSkill(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
              >
                <option>All skills</option>
                <option>React</option>
                <option>Python</option>
                <option>Industrial IoT</option>
                <option>EV Diagnostics</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Certification Status
              </label>
              <select
                value={cert}
                onChange={e => setCert(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
              >
                <option>All statuses</option>
                <option>Current</option>
                <option>Renewal due</option>
                <option>Development needed</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Sort
              </label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as any)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
              >
                <option value="name">Name (A-Z)</option>
                <option value="experience">Experience (Years)</option>
                <option value="training">Last Training Date</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3">Trainer</th>
                    <th className="p-3">Institute</th>
                    <th className="p-3">Primary Skills</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Certification</th>
                    <th className="p-3">Last Training</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredTrainers.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                        {t.name}
                      </td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">
                        {t.institute}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {t.skills.map((s, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">
                        {t.experience} years
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.cert === 'Current'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : t.cert === 'Renewal due'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200'
                        }`}>
                          {t.cert}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 whitespace-nowrap">
                        {t.last.split('-').reverse().join(' ')}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenTrainer(t)}
                          className="px-2.5 py-1 rounded bg-[#173a5e] text-white hover:bg-[#102c49] font-medium text-[11px]"
                        >
                          Open Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: TRAINER PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs border-t-4 border-t-[#173a5e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                TRAINER PROFILE • DEMO
              </span>
              <h2 className="text-2xl font-extrabold text-[#102c49] dark:text-white">
                {selectedTrainer.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap font-medium">
                <span>{selectedTrainer.institute}</span>
                <span>•</span>
                <span>{selectedTrainer.qualification}</span>
                <span>•</span>
                <span>{selectedTrainer.experience} years teaching experience</span>
                <span>•</span>
                <span>2 years industry exposure</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('gaps')}
              className="px-3.5 py-2 rounded-lg bg-amber-600 text-white font-semibold text-xs hover:bg-amber-700"
            >
              View Skill Gaps
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills & Proficiency */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                Demonstrated Proficiency Benchmarks
              </h3>
              <div className="space-y-3 text-xs">
                {selectedTrainer.levels.map(([sub, score], i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                      <span>{sub}</span>
                      <span>{score}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-[#173a5e] dark:bg-sky-500 rounded-full" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Next Schedule */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 text-xs">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                Certifications &amp; Training Schedule
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Active Certifications:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-right">Web Development Educator; AWS Cloud Foundations</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Last Completed Program:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">18 Aug 2026</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Next Scheduled Training:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">12 Oct 2026 · React Advanced</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Industry Immersion Host:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Sahyadri Digital Systems (Frontend Delivery)</span>
                </div>
              </div>
            </div>
          </div>

          {/* History, Badges & Immersion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Training History</h4>
              <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="border-l-2 border-amber-500 pl-2">
                  <strong>Cloud Foundations</strong>
                  <div>18 Aug 2026 · 24 hours</div>
                </div>
                <div className="border-l-2 border-slate-300 pl-2">
                  <strong>Accessible Web Interfaces</strong>
                  <div>03 May 2026 · 16 hours</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Digital Badges</h4>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                  Web Educator
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold text-[10px]">
                  Cloud Foundations
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold text-[10px]">
                  Accessible UI
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Industry Immersion</h4>
              <p className="text-slate-500 text-[11px]">
                40-hour frontend observation completed Jun 2026. Evidence records code review and deployment practice.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Peer Learning</h4>
              <p className="text-slate-500 text-[11px]">
                Facilitates monthly teaching-practice circle for 11 trainers across three Pune institutes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: GAP ANALYSIS */}
      {activeTab === 'gaps' && (
        <div className="space-y-4 text-xs">
          <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl text-sky-900 dark:text-sky-200">
            <strong>Development Support Principle:</strong> Gap values evaluate target course syllabus requirements against verified instructor proficiencies to prioritize upskilling scholarships. Not a punitive metric.
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3">Required Skill</th>
                  <th className="p-3">Current Demonstrated Skill</th>
                  <th className="p-3">Gap Depth</th>
                  <th className="p-3">Recommended Course</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3 text-right">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">React · Advanced</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">React · Intermediate (67%)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                      1 level gap
                    </span>
                  </td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">React Advanced for Trainers</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">4 weeks</td>
                  <td className="p-3 text-right font-bold text-slate-800 dark:text-slate-200">₹12,000</td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">AWS · Intermediate</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">AWS · Beginner (42%)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                      1 level gap
                    </span>
                  </td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">Cloud Lab Practice</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">3 weeks</td>
                  <td className="p-3 text-right font-bold text-slate-800 dark:text-slate-200">₹9,500</td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">Node.js · Intermediate</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">Not evidenced</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-bold text-[10px]">
                      Full gap
                    </span>
                  </td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">Server-side JavaScript</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">6 weeks</td>
                  <td className="p-3 text-right font-bold text-slate-800 dark:text-slate-200">₹16,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Evidence Used</h4>
              <p className="text-slate-500 text-[11px]">
                Trainer self-profile, assessment dated 05 Sep 2026, certificate records, and COPA enrichment requirements. Synthetic evidence only.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Sequential Time:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">13 weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Upskilling Cost:</span>
                <span className="font-bold text-emerald-600">₹37,500 total scenario</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authorization:</span>
                <span className="font-semibold text-amber-600">Institute Principal Review Required</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
