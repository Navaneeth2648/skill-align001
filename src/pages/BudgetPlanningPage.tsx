import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { DollarSign, TrendingUp, PieChart, Sparkles } from 'lucide-react';

export const BudgetPlanningPage: React.FC = () => {
  const { showToast } = useApp();
  const [scenarioRun, setScenarioRun] = useState(false);

  const budgetDistData = [34, 18, 25, 11, 14];
  const budgetDistLabels = ['Equipment', 'Trainer Dev.', 'Infrastructure', 'Curriculum', 'Digital Systems'];

  const monthlySpendData = [24, 31, 34, 40, 43, 46];
  const monthlyLabels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  const handleRunCapacity = () => {
    setScenarioRun(true);
    showToast('20% capacity increase projection calculated.');
  };

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span>Statewide Workforce Budget Planning</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            FY 2026–27 State allocation, committed expenditure, and regional training investment scenarios.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA • FY 2026–27
        </span>
      </div>

      {/* 4 Budget Envelope KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-t-4 border-t-[#173a5e] border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Allocated Budget</span>
          <strong className="block text-2xl font-extrabold text-slate-900 dark:text-slate-100 my-1">₹48.0 cr</strong>
          <small className="text-[11px] text-slate-500">Approved state envelope</small>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-t-4 border-t-sky-600 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Committed Funds</span>
          <strong className="block text-2xl font-extrabold text-slate-900 dark:text-slate-100 my-1">₹32.4 cr</strong>
          <small className="text-[11px] text-sky-600 font-semibold">67.5% of allocation</small>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-t-4 border-t-amber-500 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Disbursed / Spent</span>
          <strong className="block text-2xl font-extrabold text-slate-900 dark:text-slate-100 my-1">₹21.8 cr</strong>
          <small className="text-[11px] text-amber-600 font-semibold">45.4% of allocation</small>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-t-4 border-t-emerald-600 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remaining Balance</span>
          <strong className="block text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 my-1">₹26.2 cr</strong>
          <small className="text-[11px] text-emerald-600 font-semibold">Unspent liquidity</small>
        </div>
      </div>

      {/* Row: Charts for Distribution & Monthly Spend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Budget Distribution by Category
            </h2>
            <p className="text-xs text-slate-500">
              ₹ crore • FY 2026–27 synthetic program allocation
            </p>
          </div>
          <CanvasChart type="bar" data={budgetDistData} labels={budgetDistLabels} height={240} />
        </div>

        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Monthly Cumulative Expenditure
            </h2>
            <p className="text-xs text-slate-500">
              ₹ crore • Apr–Sep 2026 progressive disbursements
            </p>
          </div>
          <CanvasChart type="line" data={monthlySpendData} labels={monthlyLabels} height={240} />
        </div>
      </div>

      {/* District Allocation Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            District Fund Utilization
          </h2>
          <p className="text-xs text-slate-500">
            Breakdown across major administrative divisions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3">District</th>
                <th className="p-3">Allocated</th>
                <th className="p-3">Committed</th>
                <th className="p-3">Spent</th>
                <th className="p-3">Remaining</th>
                <th className="p-3 text-right">Fund Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ['Pune', '₹5.8 cr', '₹4.4 cr', '₹3.2 cr', '₹2.6 cr', '55%'],
                ['Mumbai', '₹5.2 cr', '₹3.9 cr', '₹2.8 cr', '₹2.4 cr', '54%'],
                ['Nashik', '₹3.6 cr', '₹2.3 cr', '₹1.5 cr', '₹2.1 cr', '42%'],
                ['Nagpur', '₹3.9 cr', '₹2.6 cr', '₹1.7 cr', '₹2.2 cr', '44%'],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{row[0]}</td>
                  <td className="p-3 font-semibold">{row[1]}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{row[2]}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{row[3]}</td>
                  <td className="p-3 text-emerald-600 font-semibold">{row[4]}</td>
                  <td className="p-3 text-right font-bold text-[#173a5e] dark:text-sky-300">{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 20% Capacity Increase Scenario Box */}
      <div className="bg-[#102c49] text-white rounded-xl p-6 shadow-md border-l-4 border-l-amber-500 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
              SCENARIO PROJECTION • NOT GUARANTEED RESULTS
            </span>
            <h3 className="text-xl font-bold">
              What happens if statewide training capacity increases by 20%?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Illustrative planning model grounded in statewide baseline capacity. No budget is automatically allocated.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunCapacity}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold text-xs hover:bg-amber-700 shrink-0 shadow-sm"
          >
            Calculate 20% Scenario
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 rounded-lg bg-white/10">
            <strong className="block text-xl font-bold text-amber-300">
              {scenarioRun ? '18' : '—'}
            </strong>
            <span className="text-slate-300 text-[11px]">Additional Trainers Needed</span>
          </div>

          <div className="p-3 rounded-lg bg-white/10">
            <strong className="block text-xl font-bold text-white">
              {scenarioRun ? '42' : '—'}
            </strong>
            <span className="text-slate-300 text-[11px]">Equipment Sets Needed</span>
          </div>

          <div className="p-3 rounded-lg bg-white/10">
            <strong className="block text-xl font-bold text-emerald-400">
              {scenarioRun ? '₹6.8 cr' : '—'}
            </strong>
            <span className="text-slate-300 text-[11px]">Estimated Capital Cost</span>
          </div>

          <div className="p-3 rounded-lg bg-white/10">
            <strong className="block text-xl font-bold text-sky-300">
              {scenarioRun ? '2,480' : '—'}
            </strong>
            <span className="text-slate-300 text-[11px]">Additional Annual Seats</span>
          </div>
        </div>
      </div>
    </div>
  );
};
