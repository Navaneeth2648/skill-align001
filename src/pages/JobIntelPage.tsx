import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, RotateCcw, ArrowUpDown, ChevronRight } from 'lucide-react';

export const JobIntelPage: React.FC = () => {
  const { jobs, setSelectedJobId, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'salary' | 'title'>('date');

  const industries = ['All', ...Array.from(new Set(jobs.map(j => j.industry)))];
  const districts = ['All', ...Array.from(new Set(jobs.map(j => j.district)))];

  const filteredJobs = jobs.filter(j => {
    const q = search.toLowerCase();
    const matchesSearch = !q || [j.title, j.employer, j.skills.join(' ')].join(' ').toLowerCase().includes(q);
    const matchesIndustry = selectedIndustry === 'All' || j.industry === selectedIndustry;
    const matchesDistrict = selectedDistrict === 'All' || j.district === selectedDistrict;
    return matchesSearch && matchesIndustry && matchesDistrict;
  });

  filteredJobs.sort((a, b) => {
    if (sortBy === 'salary') return b.salary - a.salary;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return b.posted.localeCompare(a.posted);
  });

  const handleRowClick = (id: number) => {
    setSelectedJobId(id);
    navigate('jobdetail');
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedIndustry('All');
    setSelectedDistrict('All');
    setSortBy('date');
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight">
            Job Intelligence Engine
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Search, filter, and inspect synthetic employer vacancies with evidence-backed AI skill extraction.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* 8-Node Pipeline Flow */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 overflow-x-auto">
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Automated Ingestion &amp; Processing Pipeline
        </span>
        <div className="flex items-center gap-2 min-w-[700px]">
          {[
            'Raw Job Data', 'Text Cleaning', 'Duplicate Detection', 'Skill Extraction', 
            'Experience Parser', 'Salary Normalizer', 'Occupation Mapping', 'Analytics Index'
          ].map((stage, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 text-center shrink-0 shadow-2xs">
                {stage}
              </div>
              {idx < arr.length - 1 && (
                <span className="text-amber-500 font-bold shrink-0">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-end gap-3 text-xs">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, employer, or skill..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Industry
          </label>
          <select
            value={selectedIndustry}
            onChange={e => setSelectedIndustry(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            {industries.map((ind, i) => (
              <option key={i} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            District
          </label>
          <select
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Sort Order
          </label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option value="date">Newest Posted</option>
            <option value="salary">Salary: High to Low</option>
            <option value="title">Job Title (A-Z)</option>
          </select>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3.5">Job Title</th>
                <th className="p-3.5">Employer</th>
                <th className="p-3.5">Industry</th>
                <th className="p-3.5">District</th>
                <th className="p-3.5">Required Skills</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Salary</th>
                <th className="p-3.5">Posted</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <tr
                    key={job.id}
                    onClick={() => handleRowClick(job.id)}
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && handleRowClick(job.id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                      {job.title}
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">
                      {job.employer}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {job.industry}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {job.district}
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {job.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {job.experience}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {job.salaryText}
                    </td>
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">
                      {job.posted.split('-').reverse().join(' ')}
                    </td>
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">
                      {job.source}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        job.status === 'Validated'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-400">
                    No job vacancy records match the selected search query and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
