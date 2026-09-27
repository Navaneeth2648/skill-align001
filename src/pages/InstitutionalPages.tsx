import React from 'react';
import { useApp } from '../context/AppContext';
import { Info, HelpCircle, Mail, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-6 text-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Info className="w-5 h-5 text-[#173a5e] dark:text-sky-400" />
            <span>About MS-LMI Platform</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            A unified view of labour market demand, vocational training supply, and learner outcomes.
          </p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300">
          SIH PROTOTYPE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Platform Mission &amp; Purpose
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            MS-LMI demonstrates how labour-market demand evidence, competency-gap analysis, and governed review workflows empower public vocational institutions to plan courses collaboratively with industry partners, trainers, and aspiring students.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The platform traces the complete operational lifecycle: from raw employer vacancy signals to curriculum review proposals, trainer development plans, lab equipment procurement, and placement tracking.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Prototype Status &amp; Scope
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This platform is an academic demonstration developed for the Smart India Hackathon (SIH). It is not an officially deployed Government of Maharashtra service, and does not claim any statutory endorsement.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 text-[11px]">
            Designed for policy researchers, vocational educators, and digital governance specialists to evaluate transparent workforce intelligence architectures.
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const faqs = [
    {
      q: 'Is MS-LMI an official government platform?',
      a: 'No. MS-LMI is a government-focused academic demonstration prototype created for the Smart India Hackathon. All displayed records, vacancy feeds, and analytics are synthetic demonstration data.'
    },
    {
      q: 'Does the Labour Market Assistant use live web data?',
      a: 'No. The assistant responds strictly from the fixed, centralized demonstration dataset embedded in this prototype to guarantee factual traceability and prevent hallucinations.'
    },
    {
      q: 'Can AI algorithms autonomously alter curricula or budgets?',
      a: 'No. AI is restricted to pattern extraction, correlation, and drafting proposals. All consequential actions (curriculum revisions, budget commitments, institutional approvals) require recorded human sign-off.'
    },
    {
      q: 'What do confidence scores represent?',
      a: 'Confidence scores represent simulated rule-match quality and textual completeness from vacancy parsing, not an absolute statistical guarantee.'
    },
    {
      q: 'Can these findings be used for statutory planning?',
      a: 'No. This platform is a demonstration of software architecture and user experience. Official decision-making requires integration with validated government census sources.'
    }
  ];

  return (
    <div className="space-y-6 text-xs max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Scope, evidence boundaries, and responsible usage guidelines for this demonstration.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={i}
            open={i === 0}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer group"
          >
            <summary className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
              {f.q}
            </summary>
            <p className="mt-2.5 text-slate-600 dark:text-slate-300 leading-relaxed text-xs pl-2 border-l-2 border-amber-400">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-6 text-xs max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
          <Mail className="w-5 h-5 text-emerald-600" />
          <span>Contact &amp; Institutional Inquiries</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Academic queries regarding the SIH workforce intelligence methodology and prototype design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Prototype Demonstration Channel
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Please use your institution's designated Smart India Hackathon channel to request an architecture walkthrough, report UX observations, or discuss technical implementations.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500 text-[11px]">
            No public welfare services, government employment benefits, or official admissions are processed through this platform.
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Review Before Contacting
            </h2>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <div>• Data Lineage Questions: Review Data Sources</div>
              <div>• Analytical Logic Questions: Review Methodology</div>
              <div>• Interface Exploration: Use Global Command Palette (Ctrl+K)</div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => navigate('datasources')}
              className="flex-1 py-2 bg-[#173a5e] text-white rounded font-semibold text-xs hover:bg-[#102c49]"
            >
              Data Sources
            </button>
            <button
              type="button"
              onClick={() => navigate('methodology')}
              className="flex-1 py-2 border border-slate-300 rounded font-semibold text-xs hover:bg-slate-50"
            >
              Methodology
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
