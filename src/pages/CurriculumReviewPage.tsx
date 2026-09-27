import React from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { EvidencePanel } from '../components/common/EvidencePanel';
import { FileEdit, ShieldAlert, CheckCircle2, Clock, ArrowRight, ExternalLink } from 'lucide-react';

export const CurriculumReviewPage: React.FC = () => {
  const { 
    approvalStages, 
    reviewRecommendation, 
    industryReview, 
    sendApproval, 
    navigate, 
    showToast 
  } = useApp();

  const sparkData = [41, 43, 47, 49, 58, 65, 72, 81];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-amber-500" />
            <span>Curriculum Recommendation Engine</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Evidence-based syllabus modernization proposals; consequential changes strictly require human authorization.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          AI-ASSISTED • DEMO DATA
        </span>
      </div>

      {/* Human Review Notice */}
      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">No Automatic Changes Allowed</strong>
          <span>
            Recommendations remain advisory proposals until the complete multi-stakeholder authorized review and sign-off workflow is recorded.
          </span>
        </div>
      </div>

      {/* Triad Recommendation Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-t-4 border-t-[#173a5e] border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              CURRENT CURRICULUM
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Legacy Java Fundamentals
            </h3>
            <p className="text-slate-500 text-[11px]">
              Module last reviewed in synthetic institutional record: 18 months ago.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-t-4 border-t-amber-500 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              MARKET DEMAND SIGNAL
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Surging Framework Mentions
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-200 text-[11px] font-semibold">
                Spring Boot
              </span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-200 text-[11px] font-semibold">
                REST APIs
              </span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-200 text-[11px] font-semibold">
                Microservices
              </span>
              <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border text-slate-700 dark:text-slate-200 text-[11px] font-semibold">
                Docker Containers
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-t-4 border-t-emerald-600 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              AI-SUPPORTED RECOMMENDATION
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Modernize Core Java Module
            </h3>
            <p className="text-slate-500 text-[11px]">
              Replace console app projects with RESTful microservices and containerized practice labs.
            </p>
          </div>
        </div>

        {/* Evidence & Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Demand Acceleration Trajectory
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              164 synthetic vacancy records increasingly co-mention Java with Spring Boot &amp; REST APIs during Apr–Sep 2026.
            </p>
            <CanvasChart type="line" data={sparkData} height={120} />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-2">
              Implementation Inputs Scenario
            </h4>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
              <span className="text-slate-500 font-medium">Trainer Upskilling:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Spring Boot, API design, containers</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
              <span className="text-slate-500 font-medium">Lab Equipment:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Existing lab PCs; local container runtime</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
              <span className="text-slate-500 font-medium">Estimated Budget:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">₹6.8 lakh statewide pilot scenario</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Estimated Timeline:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">12–16 weeks after human authorization</span>
            </div>
          </div>
        </div>

        {/* Traceability Accordion */}
        <EvidencePanel
          title="Curriculum Evidence Package Details"
          evidence={{
            why: '164 synthetic job records increasingly co-mention Java, Spring Boot and REST APIs.',
            data: 'Synthetic employer job descriptions and COPA module coverage register.',
            period: 'Apr–Sep 2026',
            source: 'Employer Demand Feed — Demo; Training Supply Register — Demo',
            confidence: '86% illustrative rule-match confidence',
            assumptions: 'Co-mentions indicate skills worth curriculum review.',
            limitations: 'Small synthetic sample; not representative of all employers.',
            evidence: '164 synthetic job records; current module last reviewed 18 months ago in the demo.',
            action: 'Open technical and industry review; do not change curriculum automatically.',
            route: 'jobintel'
          }}
        />

        {/* Workflow Action Buttons */}
        <div className="pt-2 flex items-center flex-wrap gap-2.5 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            type="button"
            onClick={reviewRecommendation}
            className="px-3.5 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
          >
            Review Recommendation
          </button>

          <button
            type="button"
            onClick={() => navigate('jobintel')}
            className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 transition-colors"
          >
            View Vacancy Evidence
          </button>

          <button
            type="button"
            onClick={industryReview}
            className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 transition-colors"
          >
            Request Industry Review
          </button>

          <button
            type="button"
            onClick={sendApproval}
            className="px-3.5 py-2 rounded-lg bg-[#173a5e] text-white font-semibold hover:bg-[#102c49] transition-colors ml-auto"
          >
            Send for Approval
          </button>
        </div>
      </div>

      {/* 8-Stage Visual Approval Workflow */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Accountable Human Approval Workflow
          </h2>
          <p className="text-xs text-slate-500">
            Every curriculum update follows an 8-stage audit trail before classroom deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {approvalStages.map((stage, i) => {
            const isComplete = stage.status === 'Complete';
            const isReview = stage.status === 'In review';
            return (
              <div
                key={i}
                className={`p-3.5 rounded-lg border flex flex-col justify-between ${
                  isComplete
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : isReview
                    ? 'border-amber-400 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/30 ring-2 ring-amber-300/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {i + 1}. {stage.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isComplete
                        ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200'
                        : isReview
                        ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {stage.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="text-slate-600 dark:text-slate-400">
                      <strong>Owner:</strong> {stage.owner}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      <strong>Date:</strong> {stage.date}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 italic mt-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      {stage.comments}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
