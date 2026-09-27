import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SkillIntelPage: React.FC = () => {
  const { navigate, setSelectedSkillName } = useApp();
  const [activeTab, setActiveTab] = useState<'top' | 'emerging' | 'declining' | 'trends' | 'relationships'>('top');

  const tabConfigs = {
    top: {
      title: 'Top Skills by Synthetic Vacancy Mentions',
      meta: 'Apr–Sep 2026 • Share of job records • Synthetic records',
      data: [38, 34, 31, 27, 24, 21],
      labels: ['Python', 'Data Analytics', 'React', 'EV Systems', 'PLC', 'Power BI']
    },
    emerging: {
      title: 'Emerging Skill Signals',
      meta: 'Highest growth rate in requirement mentions over past 6 months',
      data: [28, 22, 17, 15, 13, 11],
      labels: ['EV Technology', 'Industrial IoT', 'Power BI', 'React', 'Solar PV', 'AWS']
    },
    declining: {
      title: 'Declining Skill Signals',
      meta: 'Decreasing requirement mentions across new vacancies',
      data: [12, 8, 7, 5, 4, 3],
      labels: ['Manual data entry', 'Legacy desktop', 'Basic typing', 'Analog repair', 'Manual stock logs', 'Legacy Java UI']
    },
    trends: {
      title: 'Six-Month Skill Trend Index',
      meta: 'Month-by-month demand index across all technology clusters',
      data: [42, 48, 53, 61, 70, 82],
      labels: ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026']
    },
    relationships: {
      title: 'Skill Co-Occurrence Strength',
      meta: 'Co-mention correlation with primary technical clusters',
      data: [92, 78, 67, 64, 49, 43],
      labels: ['JavaScript', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'Testing']
    }
  };

  const currentConfig = tabConfigs[activeTab];

  const handleOpenSkill = (name: string) => {
    setSelectedSkillName(name);
    navigate('skilldetail');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Skill Intelligence Engine</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track skill signals with transparent evidence periods, demand shifts, and occupational relationships.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs font-semibold">
        {(['top', 'emerging', 'declining', 'trends', 'relationships'] as const).map(tabKey => {
          const labels: Record<string, string> = {
            top: 'Top Skills',
            emerging: 'Emerging Skills',
            declining: 'Declining Skills',
            trends: 'Skill Trends',
            relationships: 'Skill Relationships'
          };
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              type="button"
              onClick={() => setActiveTab(tabKey)}
              className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-[#173a5e] dark:text-sky-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {labels[tabKey]}
            </button>
          );
        })}
      </div>

      {/* Chart Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              {currentConfig.title}
            </h2>
            <p className="text-xs text-slate-500">
              {currentConfig.meta}
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            UPDATED 26 SEP 2026
          </span>
        </div>

        <CanvasChart
          type="bar"
          data={currentConfig.data}
          labels={currentConfig.labels}
          height={260}
        />
      </div>

      {/* Explore Skills Cards */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Explore Individual Skill Competencies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'React', mentions: '2,480 mentions', signal: 'Increasing demand signal (+15%)' },
            { name: 'Electric Vehicle Technology', mentions: '1,940 mentions', signal: 'Emerging demand signal (+28%)' },
            { name: 'Industrial IoT', mentions: '1,720 mentions', signal: 'High growth signal (+22%)' },
            { name: 'Python', mentions: '3,460 mentions', signal: 'High baseline demand signal' },
            { name: 'Power BI', mentions: '1,610 mentions', signal: 'Increasing demand signal (+17%)' },
            { name: 'PLC', mentions: '1,280 mentions', signal: 'Steady manufacturing baseline signal' },
          ].map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleOpenSkill(s.name)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <strong className="block text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                  {s.name}
                </strong>
                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {s.signal}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">{s.mentions}</span>
                <span className="text-[#173a5e] dark:text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Inspect <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
