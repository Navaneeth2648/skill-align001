import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { EvidencePanel } from '../components/common/EvidencePanel';
import { FileEdit, ShieldAlert, CheckCircle2, Clock, ArrowRight, ExternalLink, Award, FileCheck, X } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Alert 
} from '../components/ui';
import { CurriculumService, CurriculumSignOffRecord } from '../services/dataService';

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

  // Sign-off modal state
  const [showSignOffModal, setShowSignOffModal] = useState(false);
  const [signOffs, setSignOffs] = useState<CurriculumSignOffRecord[]>([]);
  const [signOffStatus, setSignOffStatus] = useState<'Approved' | 'Under Review' | 'Revision Required' | 'Rejected'>('Approved');
  const [reviewerName, setReviewerName] = useState('Dr. S. R. Patil, DVET Directorate');
  const [signOffComments, setSignOffComments] = useState('Industry curriculum board has completed market review. Modernized syllabus meets current state requirements.');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    CurriculumService.getSignOffs()
      .then(res => setSignOffs(res))
      .catch(() => {});
  }, []);

  const handleRecordSignOff = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await CurriculumService.submitSignOff({
        curriculumId: 'CUR-2026-081',
        courseName: 'COPA Core Java Module',
        reviewer: reviewerName,
        role: 'Board Reviewer',
        status: signOffStatus,
        comments: signOffComments,
        action: `Statutory decision: ${signOffStatus}`
      });
      if (res.signOff) {
        setSignOffs(prev => [res.signOff, ...prev]);
      }
      showToast(`Sign-off recorded: ${signOffStatus} for CUR-2026-081`);
      setShowSignOffModal(false);
    } catch {
      showToast('Error recording sign-off to audit ledger.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Curriculum Recommendation &amp; Approval Engine"
        description="Evidence-based syllabus modernization proposals. Consequential syllabus updates strictly require formal multi-stakeholder authorized review."
        badge={<Badge variant="saffron" size="xs">Human Sign-off Required</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Curriculum & Institutions' },
          { label: 'Curriculum Review', isCurrent: true },
        ]}
      />

      {/* Human Review Safeguard Alert */}
      <Alert
        variant="warning"
        title="Zero Autonomous Syllabus Modification Policy"
        icon={<ShieldAlert className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />}
      >
        Analytical extractions identify potential gaps and assemble proposals for consideration. Course curriculum remains strictly unchanged until authorized officers and industry boards complete the statutory approval workflow.
      </Alert>

      {/* Triad Recommendation Card */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Trade Modernization Case: COPA Core Java Module</CardTitle>
            <CardDescription>
              Proposed transition from legacy console application exercises to containerized RESTful API microservices
            </CardDescription>
          </div>
          <Badge variant="primary" size="xs">Case Ref: CUR-2026-081</Badge>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-800/60 border-t-3 border-t-[#102c49] border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                CURRENT CURRICULUM
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                Legacy Java Fundamentals
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Module last reviewed in synthetic institutional record: 18 months ago.
              </p>
            </div>

            <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-800/60 border-t-3 border-t-[#b45309] border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                MARKET DEMAND SIGNAL
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                Surging Framework Mentions
              </h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="default" size="xs">Spring Boot</Badge>
                <Badge variant="default" size="xs">REST APIs</Badge>
                <Badge variant="default" size="xs">Microservices</Badge>
                <Badge variant="default" size="xs">Docker</Badge>
              </div>
            </div>

            <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-800/60 border-t-3 border-t-[#15803d] border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                AI-SUPPORTED RECOMMENDATION
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                Modernize Core Java Module
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Replace console projects with RESTful microservices and containerized practice labs.
              </p>
            </div>
          </div>

          {/* Evidence & Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Demand Acceleration Trajectory
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                164 synthetic vacancy records increasingly co-mention Java with Spring Boot &amp; REST APIs during Apr–Sep 2026.
              </p>
              <CanvasChart type="line" data={sparkData} height={120} />
            </div>

            <div className="p-3.5 rounded bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
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
                <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">₹6.8 lakh statewide pilot scenario</span>
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
        </CardContent>

        <CardFooter className="flex-wrap">
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <Button
              variant="saffron"
              size="sm"
              onClick={reviewRecommendation}
            >
              Review Recommendation
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('jobintel')}
            >
              View Vacancy Evidence
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={industryReview}
            >
              Request Industry Review
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowSignOffModal(true)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              <FileCheck className="w-3.5 h-3.5 mr-1" />
              Official Sign-Off Decision
            </Button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={sendApproval}
            className="ml-auto"
          >
            Send for Approval
          </Button>
        </CardFooter>
      </Card>

      {/* Statutory Sign-off Ledger */}
      {signOffs.length > 0 && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Statutory Sign-Off Audit Ledger</CardTitle>
              <CardDescription>
                Persistent digital sign-offs recorded by designated government and academic officers
              </CardDescription>
            </div>
            <Badge variant="success" size="xs">{signOffs.length} Recorded</Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="p-2.5">Case / Course</th>
                    <th className="p-2.5">Reviewer &amp; Role</th>
                    <th className="p-2.5">Decision</th>
                    <th className="p-2.5">Comments</th>
                    <th className="p-2.5 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {signOffs.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">
                        {s.courseName || s.curriculumId}
                        <span className="block text-[10px] text-slate-500 font-normal">{s.curriculumId}</span>
                      </td>
                      <td className="p-2.5 text-slate-700 dark:text-slate-300">
                        <strong>{s.reviewer}</strong>
                        <span className="block text-[10px] text-slate-500">{s.role}</span>
                      </td>
                      <td className="p-2.5">
                        <Badge
                          variant={
                            s.status === 'Approved' ? 'success' :
                            s.status === 'Rejected' ? 'danger' :
                            s.status === 'Revision Required' ? 'saffron' : 'warning'
                          }
                          size="xs"
                        >
                          {s.status}
                        </Badge>
                      </td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {s.comments}
                      </td>
                      <td className="p-2.5 text-right text-[11px] text-slate-500">
                        {new Date(s.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 8-Stage Visual Approval Workflow */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Accountable Human Approval Workflow</CardTitle>
            <CardDescription>
              Every curriculum update follows an 8-stage audit trail before classroom deployment
            </CardDescription>
          </div>
          <Badge variant="neutral" size="xs">8 Stages</Badge>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {approvalStages.map((stage, i) => {
              const isComplete = stage.status === 'Complete';
              const isReview = stage.status === 'In review';
              return (
                <div
                  key={i}
                  className={`p-3 rounded border flex flex-col justify-between ${
                    isComplete
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : isReview
                      ? 'border-[#b45309] dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {i + 1}. {stage.name}
                      </span>
                      <Badge
                        variant={isComplete ? 'success' : isReview ? 'warning' : 'neutral'}
                        size="xs"
                      >
                        {stage.status}
                      </Badge>
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
        </CardContent>

        <CardFooter>
          <span>All stage approvals are timestamped and committed to the statutory audit ledger</span>
          <span className="font-mono text-[10px]">AUDIT LEVEL: TIER-1</span>
        </CardFooter>
      </Card>

      {/* Official Sign-Off Modal */}
      {showSignOffModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-lg w-full p-5 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Statutory Curriculum Sign-Off
                </h3>
                <p className="text-[11px] text-slate-500">
                  Case Ref: CUR-2026-081 • COPA Core Java Module
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSignOffModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordSignOff} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Reviewer Name &amp; Designation *
                </label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={e => setReviewerName(e.target.value)}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Statutory Decision *
                </label>
                <select
                  value={signOffStatus}
                  onChange={e => setSignOffStatus(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
                >
                  <option value="Approved">Approved (Statutory clearance for rollout)</option>
                  <option value="Under Review">Under Review (Forwarded to Board Committee)</option>
                  <option value="Revision Required">Revision Required (Feedback returned to institute)</option>
                  <option value="Rejected">Rejected (Incompatible with curriculum framework)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Official Observations / Statutory Remarks *
                </label>
                <textarea
                  required
                  rows={3}
                  value={signOffComments}
                  onChange={e => setSignOffComments(e.target.value)}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded text-amber-900 dark:text-amber-200 text-[11px]">
                <strong>Audit Compliance:</strong> This sign-off will be recorded with an immutable SHA-256 hash in the system audit log.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowSignOffModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submitting}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  {submitting ? 'Recording...' : 'Commit Sign-Off Decision'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
