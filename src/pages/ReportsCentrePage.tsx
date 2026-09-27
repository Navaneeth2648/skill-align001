import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REPORT_TYPES_DATA } from '../data/mockData';
import { CanvasChart } from '../components/common/CanvasChart';
import { FileBarChart, Download, Sparkles, Filter, FileText } from 'lucide-react';

export const ReportsCentrePage: React.FC = () => {
  const { showToast } = useApp();
  const [district, setDistrict] = useState('All Maharashtra');
  const [course, setCourse] = useState('All courses');
  const [skill, setSkill] = useState('All skills');
  const [industry, setIndustry] = useState('All industries');
  const [date, setDate] = useState('2026-09');

  // Natural language reporting state
  const [nlQuery, setNlQuery] = useState('Show the top declining skills in Pune during the last six months');
  const [nlResult, setNlResult] = useState<{
    district: string;
    measure: string;
    period: string;
    chartData: number[];
    labels: string[];
    tableRows: [string, string, string][];
  } | null>(null);

  const [activeReportState, setActiveReportState] = useState<Record<number, string>>({});

  const handleReportAction = (action: 'View' | 'Generate', index: number) => {
    const r = REPORT_TYPES_DATA[index];
    const statusText = `${action} preview prepared for ${r[0]} using ${district} • ${course} • ${skill}.`;
    setActiveReportState(prev => ({ ...prev, [index]: statusText }));
    showToast(statusText);
  };

  const handleExportFile = (index: number, format: 'csv' | 'json') => {
    const report = REPORT_TYPES_DATA[index];
    const payload = {
      title: report[0],
      category: report[1],
      description: report[2],
      generated: '26 September 2026, 18:30 IST',
      status: 'Prototype demonstration output',
      source: 'Synthetic demonstration dataset',
      filters: { district, course, skill, industry, date }
    };

    let text = JSON.stringify(payload, null, 2);
    let type = 'application/json';
    let ext = 'json';

    if (format === 'csv') {
      const rows = [
        ['Field', 'Value'],
        ['Title', payload.title],
        ['Category', payload.category],
        ['Description', payload.description],
        ['Generated', payload.generated],
        ['Status', payload.status],
        ['Source', payload.source],
        ['District', payload.filters.district],
        ['Course', payload.filters.course],
        ['Skill', payload.filters.skill]
      ];
      text = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
      type = 'text/csv';
      ext = 'csv';
    }

    const blob = new Blob([text], { type: `${type};charset=utf-8` });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${report[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}-demo.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 500);

    showToast(`${format.toUpperCase()} report file generated and downloaded.`);
  };

  const handleGenerateNL = () => {
    if (!nlQuery.trim()) {
      showToast('Enter a report request.');
      return;
    }

    const lower = nlQuery.toLowerCase();
    const d = lower.includes('pune') ? 'Pune' : 'All Maharashtra';
    const p = lower.includes('six') || lower.includes('6') ? 'Last six months' : 'Selected period';
    const m = lower.includes('declin') ? 'Declining skills' : 'Skill trends';

    setNlResult({
      district: d,
      measure: m,
      period: p,
      chartData: [12, 8, 7, 5],
      labels: ['Manual data entry', 'Legacy desktop', 'Basic typing', 'Analog logs'],
      tableRows: [
        ['Manual data entry', '−12%', '1,140 demo mentions'],
        ['Legacy desktop support', '−8%', '760 demo mentions'],
        ['Basic typing only', '−7%', '640 demo mentions'],
        ['Analog repair logs', '−5%', '410 demo mentions']
      ]
    });

    showToast('Natural language synthesis complete.');
  };

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <FileBarChart className="w-5 h-5 text-amber-500" />
            <span>Reports &amp; Analytical Dossier Centre</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Generate and export reviewable summaries across statewide vacancies, skill gaps, and institute capacity.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          PROTOTYPE REPORTING
        </span>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">District</label>
          <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-slate-800">
            <option>All Maharashtra</option>
            <option>Pune</option>
            <option>Nashik</option>
            <option>Nagpur</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Course</label>
          <select value={course} onChange={e => setCourse(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-slate-800">
            <option>All courses</option>
            <option>COPA</option>
            <option>Electrical Technician</option>
            <option>IoT Technician</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Skill Focus</label>
          <select value={skill} onChange={e => setSkill(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-slate-800">
            <option>All skills</option>
            <option>React.js</option>
            <option>EV Diagnostics</option>
            <option>Industrial IoT</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Industry Sector</label>
          <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-slate-800">
            <option>All industries</option>
            <option>IT</option>
            <option>Automotive</option>
            <option>Manufacturing</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Period</label>
          <input type="month" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-slate-800" />
        </div>
      </div>

      {/* 8-Report Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {REPORT_TYPES_DATA.map((r, i) => (
          <div 
            key={i} 
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {r[1]} • DEMO
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                {r[0]}
              </h3>
              <p className="text-slate-500 mt-1 text-[11px] leading-relaxed">
                {r[2]}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleReportAction('View', i)}
                  className="py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-center font-medium"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => handleReportAction('Generate', i)}
                  className="py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-center font-medium"
                >
                  Generate
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleExportFile(i, 'csv')}
                  className="py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 text-center font-bold text-[10px]"
                >
                  CSV Download
                </button>
                <button
                  type="button"
                  onClick={() => handleExportFile(i, 'json')}
                  className="py-1 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800 hover:bg-sky-100 text-center font-bold text-[10px]"
                >
                  JSON Download
                </button>
              </div>

              {activeReportState[i] && (
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-[10px] text-amber-900 dark:text-amber-200">
                  {activeReportState[i]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Natural Language Reporting Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs border-t-4 border-t-[#173a5e] space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Natural Language Query Synthesis</span>
          </h2>
          <p className="text-xs text-slate-500">
            Ask analytical questions in plain language to construct filtered data cuts and visualizations.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={nlQuery}
            onChange={e => setNlQuery(e.target.value)}
            placeholder="e.g. Show the top declining skills in Pune during the last six months"
            className="flex-1 p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-hidden"
          />
          <button
            type="button"
            onClick={handleGenerateNL}
            className="px-5 py-2.5 rounded-lg bg-[#173a5e] text-white font-bold text-xs hover:bg-[#102c49] shadow-sm"
          >
            Synthesize
          </button>
        </div>

        {nlResult && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border text-slate-700 dark:text-slate-300 font-semibold">
                District: {nlResult.district}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border text-slate-700 dark:text-slate-300 font-semibold">
                Measure: {nlResult.measure}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border text-slate-700 dark:text-slate-300 font-semibold">
                Window: {nlResult.period}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Synthesized Chart</h3>
                <CanvasChart
                  type="bar"
                  data={nlResult.chartData}
                  labels={nlResult.labels}
                  height={180}
                  color="#b42318"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border space-y-2">
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Analytical Findings</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  The rule-based interpreter parsed district, declining competence indicator, and a 6-month evaluation period. In synthetic postings, manual data entry shows the largest reduction signal (-12%). Does not prove obsolescence; verify with local ITIs before curriculum reductions.
                </p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Source: Synthetic job postings corpus • Apr–Sep 2026.
                </div>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="p-2.5">Competency Term</th>
                    <th className="p-2.5">Trajectory Delta</th>
                    <th className="p-2.5">Record Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {nlResult.tableRows.map((r, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold">{r[0]}</td>
                      <td className="p-2.5 font-semibold text-rose-600">{r[1]}</td>
                      <td className="p-2.5 text-slate-500">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
