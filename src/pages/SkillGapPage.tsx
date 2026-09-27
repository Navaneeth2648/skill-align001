import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES_DATA, SKILL_GAPS_DATA } from '../data/mockData';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [district, setDistrict] = useState('Pune');
  const [institute, setInstitute] = useState('Aundh ITI');
  const [courseKey, setCourseKey] = useState<string>('copa');
  const [occupation, setOccupation] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [nsqfLevel, setNsqfLevel] = useState('All');

  const course = COURSES_DATA[courseKey] || COURSES_DATA.copa;
  const gaps = SKILL_GAPS_DATA[courseKey] || [];

  const marketCount = course.market.length;
  const coveredCount = course.covered.length;
  const alignmentPercent = Math.round((coveredCount / marketCount) * 100);

  const handleCourseChange = (key: string) => {
    setCourseKey(key);
    showToast(`Evaluating skill gap for: ${COURSES_DATA[key]?.name || key}`);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span>Skill Gap Analysis</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare centralized institutional course syllabus coverage with real-time employer market competencies.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* Filter Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            District
          </label>
          <select
            value={district}
            onChange={e => setDistrict(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Nagpur</option>
          </select>
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
            <option>Aundh ITI</option>
            <option>Pimpri ITI</option>
            <option>All institutes</option>
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Course Selection
          </label>
          <select
            value={courseKey}
            onChange={e => handleCourseChange(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option value="copa">Computer Operator &amp; Programming Assistant (COPA)</option>
            <option value="electrical">Electrical Technician</option>
            <option value="iot">IoT Technician</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Skill
          </label>
          <select
            value={skillFilter}
            onChange={e => setSkillFilter(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option>All skills</option>
            <option>React.js</option>
            <option>Python</option>
            <option>AWS Basics</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            NSQF Level
          </label>
          <select
            value={nsqfLevel}
            onChange={e => setNsqfLevel(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option>All levels</option>
            <option>Suggested Level 3</option>
            <option>Suggested Level 4</option>
          </select>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 bg-white dark:bg-slate-900">
          <strong className="block text-2xl font-bold text-slate-900 dark:text-slate-100">
            {marketCount}
          </strong>
          <span className="text-xs text-slate-500">Market-demand skills identified in vacancies</span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900">
          <strong className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {coveredCount}
          </strong>
          <span className="text-xs text-slate-500">Course-covered syllabus competencies</span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900">
          <strong className={`block text-2xl font-bold ${
            alignmentPercent < 70 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600'
          }`}>
            {alignmentPercent}%
          </strong>
          <span className="text-xs text-slate-500">Calculated functional curriculum alignment</span>
        </div>
      </div>

      {/* Alignment Progress Meter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              {course.name}
            </h2>
            <span className="text-xs text-slate-500">
              Functional Alignment = covered market-demand skills ({coveredCount}) ÷ market-demand skills ({marketCount})
            </span>
          </div>
          <strong className={`text-2xl font-extrabold ${
            alignmentPercent < 70 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600'
          }`}>
            {alignmentPercent}%
          </strong>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              alignmentPercent < 70 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${alignmentPercent}%` }}
          />
        </div>
      </div>

      {/* Missing Skills Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-3 p-5">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Identified Skill Competency Deficits
          </h2>
          <p className="text-xs text-slate-500">
            Required by current employer job descriptions but absent or insufficiently covered in the standard course.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3">Skill Competency</th>
                <th className="p-3">Market Demand</th>
                <th className="p-3">Current Syllabus Coverage</th>
                <th className="p-3">Required Proficiency</th>
                <th className="p-3">Gap Type</th>
                <th className="p-3">Est. Learning Time</th>
                <th className="p-3">Est. Delivery Cost</th>
                <th className="p-3 text-right">Review Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {gaps.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                    {row.skill}
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {row.demand}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">
                    {row.coverage}
                  </td>
                  <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                    {row.requiredProficiency}
                  </td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.gap === 'Full gap' 
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200' 
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                    }`}>
                      {row.gap}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {row.learningTime}
                  </td>
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {row.estimatedCost}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.priority === 'High' 
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200' 
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('curriculum')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#173a5e] text-white hover:bg-[#102c49] font-semibold text-xs"
          >
            <span>Review Curriculum Enrichment Proposals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
