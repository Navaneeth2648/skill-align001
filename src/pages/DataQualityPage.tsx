import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUALITY_ISSUES_DATA } from '../data/mockData';
import { QualityIssue } from '../types';
import { ShieldAlert, AlertTriangle, CheckCircle, RefreshCw, X, ArrowRight, Check } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Table, Column, Alert 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

interface RemediationRecord {
  id: string;
  sourceText: string;
  detectedIssue: string;
  proposedFix: string;
  status: 'Pending' | 'Applied' | 'Dismissed';
}

const SAMPLE_REMEDIATION_ITEMS: Record<string, RemediationRecord[]> = {
  'Missing District Tag': [
    { id: 'REM-101', sourceText: 'EV High-Voltage Assembly Line Worker (Tier-1 Auto Supplier)', detectedIssue: 'District missing; Taluka inferred: Chakan MIDC', proposedFix: 'Assign District: Pune', status: 'Pending' },
    { id: 'REM-102', sourceText: 'CNC Operator Trainee (Waluj Industrial Area)', detectedIssue: 'District missing; Area inferred: Waluj', proposedFix: 'Assign District: Chhatrapati Sambhajinagar', status: 'Pending' },
    { id: 'REM-103', sourceText: 'Solar Inverter Wireman (MIDC Amravati)', detectedIssue: 'District missing; Location: Amravati', proposedFix: 'Assign District: Amravati', status: 'Pending' }
  ],
  'Duplicate Skill Extracted': [
    { id: 'REM-201', sourceText: 'React / React.js / ReactJS Junior Dev', detectedIssue: 'Redundant tokens for canonical competency', proposedFix: 'Merge to canonical "React"', status: 'Pending' },
    { id: 'REM-202', sourceText: 'AutoCAD / Auto CAD 2D Draftsman', detectedIssue: 'Spelling variation duplicate', proposedFix: 'Merge to canonical "AutoCAD"', status: 'Pending' }
  ],
  'Unmapped Occupation Code': [
    { id: 'REM-301', sourceText: 'Drone Telemetry Flight Data Logger', detectedIssue: 'No 2015 NCO mapping found', proposedFix: 'Map to NSQF Level 5 Drone Pilot / Analyst', status: 'Pending' },
    { id: 'REM-302', sourceText: 'Smart Grid Substation Automation Attendant', detectedIssue: 'Legacy Electrician trade mismatch', proposedFix: 'Map to Industrial IoT Substation Specialist', status: 'Pending' }
  ]
};

export const DataQualityPage: React.FC = () => {
  const { showToast, navigate } = useApp();
  const [activeQueueIssue, setActiveQueueIssue] = useState<string | null>(null);
  const [remediationItems, setRemediationItems] = useState(SAMPLE_REMEDIATION_ITEMS);
  const [filterSeverity, setFilterSeverity] = useState<string>('All');

  const filteredIssues = QUALITY_ISSUES_DATA.filter(q => 
    filterSeverity === 'All' || q.severity === filterSeverity
  );

  const handleApplyFix = (issueTitle: string, recId: string) => {
    setRemediationItems(prev => {
      const list = prev[issueTitle] || [];
      return {
        ...prev,
        [issueTitle]: list.map(item => item.id === recId ? { ...item, status: 'Applied' as const } : item)
      };
    });
    showToast(`Remediation applied for ${recId}. Canonical record updated.`);
  };

  const handleDismissFix = (issueTitle: string, recId: string) => {
    setRemediationItems(prev => {
      const list = prev[issueTitle] || [];
      return {
        ...prev,
        [issueTitle]: list.map(item => item.id === recId ? { ...item, status: 'Dismissed' as const } : item)
      };
    });
    showToast(`Record ${recId} dismissed from triage queue.`);
  };

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Data Quality &amp; Pipeline Hygiene Centre"
        description="Continuous profiling of synthetic vacancy feeds, skill extraction confidence, deduplication audits, and automated human-in-the-loop remediation queues."
        badge={<Badge variant="danger" size="xs">Hygiene Active</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'System & Governance' },
          { label: 'Data Quality', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => showToast('All ingestion pipelines re-profiled. 0 new anomalies detected.')}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Re-scan Ingestion Pipeline
            </Button>
          </div>
        }
      />

      {/* Prominent Statutory Notice */}
      <Alert
        variant="warning"
        title="23% of synthetic vacancy records are missing district identifiers"
      >
        District-level demand analysis should not be treated as complete until affected records are reviewed and matched against official Maharashtra taluka and district gazettes.
      </Alert>

      {/* Filter Severity Pill Strip */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Severity Filter:</span>
        {['All', 'Critical', 'High', 'Medium'].map(sev => (
          <button
            key={sev}
            type="button"
            onClick={() => setFilterSeverity(sev)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              filterSeverity === sev
                ? 'bg-[#102c49] text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Quality Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {filteredIssues.map((q, idx) => {
          const isCritical = q.severity === 'Critical';
          const isHigh = q.severity === 'High';
          const hasQueue = Boolean(remediationItems[q.issue]);

          return (
            <Card
              key={idx}
              accentTop={isCritical ? 'danger' : isHigh ? 'warning' : 'info'}
              className="flex flex-col justify-between"
            >
              <CardHeader className="pb-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Badge
                      variant={isCritical ? 'danger' : isHigh ? 'warning' : 'info'}
                      size="xs"
                      dot
                    >
                      {q.severity} Severity
                    </Badge>
                    <strong className="text-xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                      <AnimatedNumber value={q.count} />
                    </strong>
                  </div>
                  <CardTitle className="text-sm">{q.issue}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 py-2">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                  {q.description}
                </p>

                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px]">
                  <strong className="block text-slate-800 dark:text-slate-200 font-semibold mb-0.5">
                    Recommended Remediation:
                  </strong>
                  <span className="text-slate-500">{q.recommendedAction}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button
                  variant={hasQueue ? 'primary' : 'outline'}
                  size="xs"
                  fullWidth
                  onClick={() => {
                    setActiveQueueIssue(q.issue);
                    showToast(`Remediation queue opened for: ${q.issue}`);
                  }}
                  rightIcon={<ArrowRight className="w-3 h-3" />}
                >
                  Review Issue in Queue ({hasQueue ? remediationItems[q.issue].length : 0})
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Interactive Remediation Queue Drawer / Modal */}
      {activeQueueIssue && (
        <Card accentTop="primary">
          <CardHeader>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="saffron" size="xs">Live Triage Queue</Badge>
                <CardTitle>{activeQueueIssue}</CardTitle>
              </div>
              <CardDescription>
                Resolve or assign canonical mapping to normalize vacancy and curriculum records
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setActiveQueueIssue(null)}
              leftIcon={<X className="w-3.5 h-3.5" />}
            >
              Close Queue
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            {remediationItems[activeQueueIssue] ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded overflow-hidden">
                {remediationItems[activeQueueIssue].map((item) => (
                  <div key={item.id} className="p-3.5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-400">{item.id}</span>
                        <strong className="text-slate-900 dark:text-slate-100">{item.sourceText}</strong>
                        <Badge
                          variant={item.status === 'Applied' ? 'success' : item.status === 'Dismissed' ? 'neutral' : 'warning'}
                          size="xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        <span>Defect: {item.detectedIssue}</span> • <span className="font-semibold text-emerald-700 dark:text-emerald-400">Proposed Action: {item.proposedFix}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      {item.status === 'Pending' ? (
                        <>
                          <Button
                            variant="primary"
                            size="xs"
                            onClick={() => handleApplyFix(activeQueueIssue, item.id)}
                            leftIcon={<Check className="w-3 h-3" />}
                          >
                            Apply Fix
                          </Button>
                          <Button
                            variant="secondary"
                            size="xs"
                            onClick={() => handleDismissFix(activeQueueIssue, item.id)}
                          >
                            Dismiss
                          </Button>
                        </>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400">
                          Resolved ({item.status})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active backlog items pending manual intervention for this quality issue.
              </div>
            )}
          </CardContent>

          <CardFooter>
            <span>Remediation events are logged into the statutory audit trail automatically</span>
            <span className="font-mono text-[10px]">AUDIT LEVEL: COMPLIANT</span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
