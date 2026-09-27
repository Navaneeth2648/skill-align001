import React from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { 
  Building2, Users, Wrench, Briefcase, Calendar, DollarSign, 
  ChevronRight, ArrowRight, ShieldAlert, Award
} from 'lucide-react';

export const DistrictIntelPage: React.FC = () => {
  const { navigate, showToast, setSelectedSkillName } = useApp();

  const handleOpenSkill = (skill: string) => {
    setSelectedSkillName(skill);
    navigate('skilldetail');
  };

  return (
    <div className="space-y-6">
      {/* Drill-down Breadcrumb Chain */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs flex items-center gap-2 flex-wrap text-xs font-medium text-slate-500">
        <button 
          type="button" 
          onClick={() => navigate('dashboard')}
          className="hover:text-[#173a5e] dark:hover:text-sky-400 hover:underline"
        >
          State
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-[#102c49] dark:text-white">Pune District</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button 
          type="button" 
          onClick={() => showToast('Aundh ITI selected • 12 courses • 38 trainers • DEMO DATA')}
          className="hover:text-[#173a5e] dark:hover:text-sky-400 hover:underline"
        >
          Aundh ITI
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button 
          type="button" 
          onClick={() => navigate('skillgap')}
          className="hover:text-[#173a5e] dark:hover:text-sky-400 hover:underline"
        >
          COPA
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button 
          type="button" 
          onClick={() => handleOpenSkill('React')}
          className="hover:text-[#173a5e] dark:hover:text-sky-400 hover:underline"
        >
          React.js
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button 
          type="button" 
          onClick={() => showToast('Pune district drill-down evidence verified • 74 automotive records & 164 software records')}
          className="text-amber-700 dark:text-amber-400 font-bold hover:underline"
        >
          Evidence
        </button>
      </div>

      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight">
            Pune District Workforce Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            District → Institute → Course → Skill → Evidence Traceability Chain
          </p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800 self-start sm:self-auto">
          DEMO DATA
        </span>
      </div>

      {/* District Officer Module Quick Navigation */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 flex items-center gap-1.5 flex-wrap text-xs font-semibold">
        <span className="text-[10px] uppercase text-slate-400 font-bold px-2">Modules:</span>
        <button 
          type="button" 
          onClick={() => navigate('jobintel')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          District Jobs
        </button>
        <button 
          type="button" 
          onClick={() => navigate('skills')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Skills
        </button>
        <button 
          type="button" 
          onClick={() => navigate('coursealignment')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Courses
        </button>
        <button 
          type="button" 
          onClick={() => navigate('institutes')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Institutes
        </button>
        <button 
          type="button" 
          onClick={() => navigate('employerportal')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Employers
        </button>
        <button 
          type="button" 
          onClick={() => navigate('trainers')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Trainers
        </button>
        <button 
          type="button" 
          onClick={() => navigate('equipment')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Equipment
        </button>
        <button 
          type="button" 
          onClick={() => navigate('trainingplan')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Plans
        </button>
        <button 
          type="button" 
          onClick={() => navigate('reportscentre')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Reports
        </button>
        <button 
          type="button" 
          onClick={() => navigate('alertcentre')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Alerts
        </button>
        <button 
          type="button" 
          onClick={() => navigate('budget')}
          className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
        >
          Budget
        </button>
      </div>

      {/* 6 District KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="Pune Jobs" value="18,420" subtext="Active postings index" targetRoute="jobintel" />
        <KpiCard label="Institutes" value="86" subtext="ITIs & Polytechnics" targetRoute="institutes" />
        <KpiCard label="Employers" value="412" subtext="Validated hiring partners" targetRoute="employerportal" />
        <KpiCard label="Courses" value="128" subtext="Vocational programs" targetRoute="coursealignment" />
        <KpiCard label="Skill Gaps" value="37" subtext="Review thresholds crossed" targetRoute="skillgap" borderTopColor="border-t-amber-500" />
        <KpiCard label="Priority Alerts" value="6" subtext="Action required" targetRoute="alertcentre" borderTopColor="border-t-rose-500" />
      </div>

      {/* 9 Status Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
        {/* Panel 1: Labour Demand */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Sector Labour Demand
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">IT &amp; digital services</span>
                <span className="text-slate-500">5,840 postings</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Automotive &amp; EV</span>
                <span className="text-slate-500">4,160 postings</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Precision manufacturing</span>
                <span className="text-slate-500">3,220 postings</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('jobintel')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Inspect Pune Jobs
          </button>
        </div>

        {/* Panel 2: Skill Demand */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Leading Skill Signals
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">React.js &amp; TypeScript</span>
                <span className="font-bold text-emerald-600">High demand signal</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">EV diagnostics &amp; CAN Bus</span>
                <span className="font-bold text-amber-600">Increasing (+28%)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Industrial IoT &amp; PLC</span>
                <span className="font-bold text-amber-600">Increasing (+22%)</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleOpenSkill('React')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Open React Skill Detail
          </button>
        </div>

        {/* Panel 3: Course Alignment */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Course Alignment
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">COPA</span>
                <span className="font-bold text-amber-600">62% (Gap Review Signal)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Electrical Technician</span>
                <span className="font-bold text-emerald-600">81% Aligned</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">IoT Technician</span>
                <span className="font-bold text-sky-600">74% Aligned</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('coursealignment')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Compare All Pune Courses
          </button>
        </div>

        {/* Panel 4: Institute Performance */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Institute Performance
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Aundh ITI</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">72% placement outcome</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Pimpri ITI</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">68% placement outcome</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Govt. Polytechnic Pune</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">76% placement outcome</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showToast('Aundh ITI: 12 courses, 38 trainers, 86% equipment utilization.')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Inspect Aundh ITI Profile
          </button>
        </div>

        {/* Panel 5: Trainer Capacity */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Trainer Capacity Gap
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Required Trainers</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">286 trainers</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Available Qualified</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">249 trainers</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-rose-700 dark:text-rose-400">Capacity Shortfall</span>
                <span className="font-bold text-rose-700 dark:text-rose-400">37 trainers</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('trainers')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Open Trainer Upskilling Plan
          </button>
        </div>

        {/* Panel 6: Equipment Capacity */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Lab Equipment Capacity
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Arduino kits</span>
                <span className="text-amber-600 font-bold">18 / 30 available (Shortage 12)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">EV diagnostic rigs</span>
                <span className="text-rose-600 font-bold">8 / 14 available (Shortage 6)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">PLC trainers</span>
                <span className="text-emerald-600 font-bold">22 / 25 available (Shortage 3)</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('equipment')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Review Equipment Procurement
          </button>
        </div>

        {/* Panel 7: Employers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Leading Pune Employers
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Sahyadri Digital Systems</span>
                <span className="text-slate-600 dark:text-slate-400">64 open roles</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Deccan Mobility Works</span>
                <span className="text-slate-600 dark:text-slate-400">48 open roles</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Mula Engineering Works</span>
                <span className="text-slate-600 dark:text-slate-400">35 open roles</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('employerportal')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            View Employer Partnerships
          </button>
        </div>

        {/* Panel 8: Training Plan Preview */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Training Plan Preview
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Target Priority Seats</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">1,240 seats</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Trainer Upskilling Target</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">37 instructors</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Implementation Window</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">2 quarters</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('trainingplan')}
            className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Generate Pune Action Plan
          </button>
        </div>

        {/* Panel 9: Budget Preview */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Budget Scenario Preview
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Equipment Allocation</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹84.5 lakh</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Trainer Development</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹22.2 lakh</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Total District Envelope</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-400">₹1.18 crore</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 mb-2">
            Scenario estimate; requires formal departmental finance review.
          </p>
          <button
            type="button"
            onClick={() => navigate('budget')}
            className="w-full py-1.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded font-semibold hover:bg-slate-200 text-center"
          >
            Open Budget Planning
          </button>
        </div>
      </div>
    </div>
  );
};
