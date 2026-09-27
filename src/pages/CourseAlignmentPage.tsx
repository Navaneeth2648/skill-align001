import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES_DATA } from '../data/mockData';
import { BookOpen, Search, ArrowRight } from 'lucide-react';

export const CourseAlignmentPage: React.FC = () => {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [alignmentFilter, setAlignmentFilter] = useState<'all' | 'below70' | '70plus'>('all');

  const courseList = Object.entries(COURSES_DATA).map(([key, c]) => {
    const alignment = Math.round((c.covered.length / c.market.length) * 100);
    const missingCount = c.market.length - c.covered.length;
    return {
      key,
      ...c,
      alignment,
      missingCount
    };
  });

  const filtered = courseList.filter(c => {
    const matchesSearch = !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAlignment = 
      alignmentFilter === 'all' || 
      (alignmentFilter === 'below70' && c.alignment < 70) ||
      (alignmentFilter === '70plus' && c.alignment >= 70);
    return matchesSearch && matchesAlignment;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#173a5e] dark:text-sky-400" />
            <span>Course Alignment Dashboard</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Objective curriculum coverage and outcomes metrics; no automated ranking or punitive evaluations.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-end gap-3 text-xs">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Search Courses
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by course name..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Alignment Threshold
          </label>
          <select
            value={alignmentFilter}
            onChange={e => setAlignmentFilter(e.target.value as any)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All ranges</option>
            <option value="below70">Below 70% (Review Recommended)</option>
            <option value="70plus">70% and above (Adequately Aligned)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3.5">Course Name</th>
                <th className="p-3.5">Institutes Offering</th>
                <th className="p-3.5">Enrolled Cohort</th>
                <th className="p-3.5">Market Alignment</th>
                <th className="p-3.5">Missing Competencies</th>
                <th className="p-3.5">Placement Outcome</th>
                <th className="p-3.5">Last Review</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(c => (
                <tr key={c.key} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 max-w-xs">
                    {c.name}
                  </td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300">
                    {c.institutes} ITIs
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                    {c.students.toLocaleString('en-IN')} students
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      c.alignment < 70
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    }`}>
                      {c.alignment}%
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">
                    {c.missingCount} skills
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">
                    {c.placement}
                  </td>
                  <td className="p-3.5 text-slate-500 whitespace-nowrap">
                    {c.review}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => navigate('skillgap')}
                      className="px-2.5 py-1 rounded bg-[#173a5e] text-white hover:bg-[#102c49] font-medium text-[11px] inline-flex items-center gap-1"
                    >
                      <span>Analyze Gap</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
