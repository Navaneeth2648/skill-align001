import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Building2, Briefcase, GraduationCap, FileBarChart, ArrowRight } from 'lucide-react';

export const CoursesOverviewPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-6 text-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Courses &amp; Curriculum Alignment</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare institutional syllabus coverage with evolving industry demand and human approval workflows.
          </p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300">
          DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Course Alignment Dashboard
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Inspect objective coverage metrics, missing-skill tallies, and placement outcomes across all registered ITI courses.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('coursealignment')}
            className="w-full py-2.5 bg-[#173a5e] text-white rounded-lg font-semibold hover:bg-[#102c49] flex items-center justify-center gap-1.5"
          >
            <span>Open Alignment Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Skill Gap Analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculate exact coverage ratios from centralized market-demand and course syllabus skill sets.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('skillgap')}
            className="w-full py-2.5 bg-[#173a5e] text-white rounded-lg font-semibold hover:bg-[#102c49] flex items-center justify-center gap-1.5"
          >
            <span>Analyse Course Gaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Curriculum Recommendations
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Review evidence-based syllabus proposals through an 8-stage accountable human approval workflow.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('curriculum')}
            className="w-full py-2.5 bg-[#173a5e] text-white rounded-lg font-semibold hover:bg-[#102c49] flex items-center justify-center gap-1.5"
          >
            <span>Review Proposals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const InstitutesOverviewPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-6 text-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-600" />
            <span>Training Institutes &amp; Capacity Infrastructure</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Connect vocational institute delivery capacity with trainer competency and lab equipment evidence.
          </p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300">
          DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Trainer Management
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Search trainer capabilities, open development profiles, and inspect proficiency gaps against new syllabus modules.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('trainers')}
            className="w-full py-2.5 bg-[#173a5e] text-white rounded-lg font-semibold hover:bg-[#102c49] flex items-center justify-center gap-1.5"
          >
            <span>Open Trainer Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Equipment Planning
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Compare tooling requirements, lab shortages, utilization benchmarks, Bills of Materials, and procurement workflows.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('equipment')}
            className="w-full py-2.5 bg-[#173a5e] text-white rounded-lg font-semibold hover:bg-[#102c49] flex items-center justify-center gap-1.5"
          >
            <span>Open Equipment Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              District Evidence Chain
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Return to the regional district view to connect local vacancies, institute seats, courses, and capacity.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('districtintel')}
            className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded-lg font-semibold hover:bg-slate-200 flex items-center justify-center gap-1.5"
          >
            <span>Open Pune Evidence Chain</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const EmployersOverviewPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-6 text-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            <span>Employer Connection Ecosystem</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Validated employer demand, candidate discovery, training partnerships, and hiring feedback.
          </p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300">
          DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Employer Portal
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Create a synthetic job vacancy, review AI-extracted skills, and explore verified candidates or institutional partners.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('employerportal')}
            className="w-full py-2.5 bg-[#173a5e] text-white rounded-lg font-semibold hover:bg-[#102c49] flex items-center justify-center gap-1.5"
          >
            <span>Enter Employer Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Job Intelligence Engine
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Inspect statewide employer demand with evidence-backed AI skill extraction and verification status badges.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('jobintel')}
            className="w-full py-2.5 bg-[#173a5e] text-white rounded-lg font-semibold hover:bg-[#102c49] flex items-center justify-center gap-1.5"
          >
            <span>Inspect Job Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Human Skill Validation
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Experience how employers review and validate extracted competencies before a vacancy is indexed statewide.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('employerportal')}
            className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-[#173a5e] dark:text-sky-300 rounded-lg font-semibold hover:bg-slate-200 flex items-center justify-center gap-1.5"
          >
            <span>Try Validation Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const PublicReportsOverviewPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-6 text-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <FileBarChart className="w-5 h-5 text-amber-500" />
            <span>Public Reports &amp; Intelligence Briefs</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Evidence-oriented demonstration reports for statewide and district workforce planning.
          </p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300">
          DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase">STATE</span>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            State Labour Market Report
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Statewide aggregate demand, leading occupations, top competencies, and district-by-district comparison indices.
          </p>
          <button
            type="button"
            onClick={() => navigate('labour')}
            className="w-full py-2 bg-[#173a5e] text-white rounded font-semibold hover:bg-[#102c49]"
          >
            View Dashboard
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase">DISTRICT</span>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            District Skill Gap Report
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Market-demand competencies compared against local ITI course offerings and trainer rosters.
          </p>
          <button
            type="button"
            onClick={() => navigate('skillgap')}
            className="w-full py-2 bg-[#173a5e] text-white rounded font-semibold hover:bg-[#102c49]"
          >
            Preview Skill Gap Format
          </button>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase">TRAINING</span>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Course Alignment Report
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Objective curriculum coverage indices, deficit tallies, and human review signals.
          </p>
          <button
            type="button"
            onClick={() => navigate('coursealignment')}
            className="w-full py-2 bg-[#173a5e] text-white rounded font-semibold hover:bg-[#102c49]"
          >
            Preview Alignment Format
          </button>
        </div>
      </div>
    </div>
  );
};
