import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { DISTRICTS_DATA } from '../data/mockData';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Filter, MapPin } from 'lucide-react';

export const LabourMarketPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [district, setDistrict] = useState('All Maharashtra');
  const [industry, setIndustry] = useState('All industries');
  const [range, setRange] = useState('365');
  const [appliedFilters, setAppliedFilters] = useState({
    district: 'All Maharashtra',
    industry: 'All industries',
    range: '12 months'
  });

  const rangeLabels: Record<string, string> = {
    '7': '7 days',
    '30': '30 days',
    '90': '3 months',
    '180': '6 months',
    '365': '12 months',
    '730': '24 months'
  };

  const handleApply = () => {
    setAppliedFilters({
      district,
      industry,
      range: rangeLabels[range] || '12 months'
    });
    showToast(`Filters applied: ${district} • ${industry} • ${rangeLabels[range]}`);
  };

  // Seeded line data based on filters
  const seed = (district.length + industry.length + Number(range)) % 13;
  const lineData = [42, 48, 46, 55, 61, 67, 64, 72, 79, 77, 86, 92].map(
    (v, i) => v + ((i * seed) % 9) - 4
  );

  const topSkillsData = [38 + (seed % 4), 32, 29, 24, 19, 16];
  const topSkillsLabels = ['Python', 'Data Analytics', 'EV Systems', 'PLC', 'Power BI', 'AWS'];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight">
            Labour Market Intelligence Engine
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Explore synthetic workforce demand across Maharashtra districts, economic sectors, and evolving skill domains.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-end gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            District
          </label>
          <select
            value={district}
            onChange={e => setDistrict(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option>All Maharashtra</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Nagpur</option>
            <option>Nashik</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Industry Sector
          </label>
          <select
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option>All industries</option>
            <option>Information Technology</option>
            <option>Manufacturing</option>
            <option>Automotive</option>
            <option>Renewable Energy</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Time Range
          </label>
          <select
            value={range}
            onChange={e => setRange(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="90">3 months</option>
            <option value="180">6 months</option>
            <option value="365">12 months</option>
            <option value="730">24 months</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-md bg-[#173a5e] text-white font-semibold hover:bg-[#102c49] transition-colors flex items-center gap-1.5"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Apply Filters</span>
        </button>
      </div>

      {/* Row 1: Line Trend & Emerging/Declining List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Job Demand Over Time
              </h2>
              <span className="text-xs text-slate-500">
                {appliedFilters.range} • {appliedFilters.district} • {appliedFilters.industry} • Postings Index
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              DEMO DATA
            </span>
          </div>

          <CanvasChart type="line" data={lineData} height={250} />
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Emerging vs. Declining
              </h2>
              <p className="text-xs text-slate-500">
                Synthetic directional signals across validated employer records
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Electric Vehicle Technology
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>28%</span>
                </span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Industrial IoT
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>22%</span>
                </span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Power BI Analytics
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>17%</span>
                </span>
              </div>

              <div className="p-2.5 rounded bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Manual data entry
                </span>
                <span className="text-rose-700 dark:text-rose-400 font-bold flex items-center gap-0.5">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>12%</span>
                </span>
              </div>

              <div className="p-2.5 rounded bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Legacy desktop support
                </span>
                <span className="text-rose-700 dark:text-rose-400 font-bold flex items-center gap-0.5">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>8%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Signals indicate changes in job requirement frequency. Human verification recommended.
          </div>
        </div>
      </div>

      {/* Row 2: Top Skills in Selected Market & District Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Top Skills in Selected Market
            </h2>
            <p className="text-xs text-slate-500">
              Share of synthetic job records demanding each competence
            </p>
          </div>

          <CanvasChart
            type="bar"
            data={topSkillsData}
            labels={topSkillsLabels}
            height={240}
          />
        </div>

        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  District Comparison Matrix
                </h2>
                <p className="text-xs text-slate-500">
                  Select a district to view regional intelligence
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('districtintel')}
                className="text-xs font-semibold text-sky-600 hover:underline"
              >
                Pune Deep Dive
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              {DISTRICTS_DATA.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (d.name === 'Pune') {
                      navigate('districtintel');
                    } else {
                      showToast(`District ${d.name}: ${d.jobs.toLocaleString('en-IN')} postings. Top skill: ${d.topSkill}`);
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    d.name === 'Pune'
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100'
                  }`}
                >
                  <strong className="block text-xs text-slate-800 dark:text-slate-200">
                    {d.name}
                  </strong>
                  <span className="block text-[11px] text-slate-500">
                    {d.jobs.toLocaleString('en-IN')} jobs
                  </span>
                  <span className="block text-[10px] text-sky-600 dark:text-sky-400 truncate">
                    {d.topSkill}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Illustrative district grid; not an official geographic map.</span>
            <button
              type="button"
              onClick={() => navigate('districtintel')}
              className="text-[#173a5e] dark:text-sky-400 font-semibold hover:underline"
            >
              Open Pune District Page →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
