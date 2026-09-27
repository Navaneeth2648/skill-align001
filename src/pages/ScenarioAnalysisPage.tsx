import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, ShieldAlert } from 'lucide-react';

export const ScenarioAnalysisPage: React.FC = () => {
  const { showToast } = useApp();
  const [institutes, setInstitutes] = useState(24);
  const [courses, setCourses] = useState(2);
  const [batch, setBatch] = useState(30);
  const [trainerAvail, setTrainerAvail] = useState(75);
  const [equipmentBudget, setEquipmentBudget] = useState(240);

  // Dynamic calculations
  const seats = institutes * courses * batch;
  const requiredTrainers = Math.ceil(seats / 25);
  const availableTrainers = Math.floor((requiredTrainers * trainerAvail) / 100);
  const labSets = institutes * courses;
  const costLakh = labSets * 12 + equipmentBudget;
  const equipRatio = Math.min(1, equipmentBudget / (labSets * 5 || 1));
  const adjustedCapacity = Math.floor(seats * Math.min(1, availableTrainers / (requiredTrainers || 1), equipRatio));

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Illustrative policy scenario recalculated.');
  };

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-500" />
            <span>Policy Scenario Simulator</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test hypothetical vocational expansion inputs without affecting baseline budgets, plans, or formal approvals.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          ILLUSTRATIVE PROJECTION
        </span>
      </div>

      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Projections Are Not Guaranteed Realities</strong>
          <span>
            Model outputs apply fixed prototype formulas to test resource bottlenecks. Formal review by finance and departmental administrators is essential.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Simulator Inputs Form */}
        <form onSubmit={handleSimulate} className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            Policy &amp; Scale Inputs
          </h2>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Participating Institutes
            </label>
            <input
              type="number"
              min={1}
              max={500}
              value={institutes}
              onChange={e => setInstitutes(Number(e.target.value))}
              className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              New Courses per Institute
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={courses}
              onChange={e => setCourses(Number(e.target.value))}
              className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Batch Size per Course
            </label>
            <input
              type="number"
              min={10}
              max={100}
              value={batch}
              onChange={e => setBatch(Number(e.target.value))}
              className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Trainer Availability ({trainerAvail}%)
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={trainerAvail}
              onChange={e => setTrainerAvail(Number(e.target.value))}
              className="w-full accent-[#173a5e]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Dedicated Equipment Budget (₹{equipmentBudget} lakh)
            </label>
            <input
              type="range"
              min={20}
              max={2000}
              step={20}
              value={equipmentBudget}
              onChange={e => setEquipmentBudget(Number(e.target.value))}
              className="w-full accent-[#173a5e]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#173a5e] text-white font-bold text-xs hover:bg-[#102c49] shadow-sm"
          >
            Recalculate Scenario
          </button>
        </form>

        {/* Output Projection Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-5 text-xs">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <span className="text-[10px] font-bold text-amber-600 uppercase">SYNTHETIC PROJECTION</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Projected Impact Analysis
              </h3>
            </div>

            {/* Total Unconstrained Seats */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-4">
              <span className="text-slate-500 font-semibold block text-xs">Potential Annual Capacity (Unconstrained)</span>
              <strong className="block text-3xl font-extrabold text-[#102c49] dark:text-sky-300 my-1">
                {seats.toLocaleString('en-IN')} seats
              </strong>
              <small className="text-slate-400">Total theoretical intake before applying resource bottlenecks</small>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Trainer Requirement:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{requiredTrainers} trainer positions</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Available Trainers with {trainerAvail}% staffing:</span>
                <span className="font-bold text-amber-600">{availableTrainers} equivalent positions</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Required Lab Tooling Sets:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{labSets} course sets</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Estimated Financial Commitment:</span>
                <span className="font-bold text-emerald-600">₹{(costLakh / 100).toFixed(2)} crore</span>
              </div>
              <div className="py-3 flex justify-between items-center bg-amber-50/50 dark:bg-amber-950/20 px-3 rounded-lg border border-amber-200 dark:border-amber-800/60 mt-2">
                <span className="font-bold text-amber-900 dark:text-amber-200">
                  Constraint-Adjusted Capacity:
                </span>
                <strong className="text-lg font-black text-amber-800 dark:text-amber-300">
                  {adjustedCapacity.toLocaleString('en-IN')} seats
                </strong>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Assumptions: 1 trainer per 25 seats; 1 lab set per course; ₹12 lakh non-equipment operating overhead per course.
          </p>
        </div>
      </div>
    </div>
  );
};
