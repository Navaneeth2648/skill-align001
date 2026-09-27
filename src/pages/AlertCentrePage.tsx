import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EvidencePanel } from '../components/common/EvidencePanel';
import { KpiCard } from '../components/common/KpiCard';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { Bell, AlertTriangle, Filter, CheckCircle2, ShieldCheck } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Select, EmptyState 
} from '../components/ui';
import { AlertRecord } from '../types';

export const AlertCentrePage: React.FC = () => {
  const { alerts, updateAlertStatus, navigate } = useApp();
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAlerts = alerts.filter(a => {
    const matchesSev = severityFilter === 'All' || a.severity === severityFilter;
    const matchesStat = statusFilter === 'All' || a.status === statusFilter;
    return matchesSev && matchesStat;
  });

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Alert &amp; Signal Triage Centre"
        description="Monitor statutory workforce threshold violations, emerging district skill shortages, and actionable administrative workflows with full traceability."
        badge={<Badge variant="warning" size="xs">Triage Active</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'System & Governance' },
          { label: 'Alerts Triage', isCurrent: true },
        ]}
      />

      {/* 4 Summary Triage KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard
          label="Critical Alerts"
          value={alerts.filter(a => a.severity === 'Critical').length.toString()}
          subtext="Urgent intervention"
          accent="danger"
          trend="down"
        />
        <KpiCard
          label="High Severity"
          value={alerts.filter(a => a.severity === 'High').length.toString()}
          subtext="Under active monitoring"
          accent="warning"
        />
        <KpiCard
          label="Pending Review"
          value={alerts.filter(a => a.status === 'New' || a.status === 'Action Required').length.toString()}
          subtext="Unacknowledged signals"
          accent="primary"
          trend="up"
        />
        <KpiCard
          label="Resolved Signals"
          value={alerts.filter(a => a.status === 'Resolved').length.toString()}
          subtext="Closed workflows"
          accent="success"
        />
      </div>

      {/* Filter Row */}
      <Card>
        <CardContent className="p-3.5 sm:p-4">
          <div className="flex flex-wrap items-end gap-3 text-xs">
            <div className="w-48">
              <Select
                label="Severity Level"
                value={severityFilter}
                onChange={e => setSeverityFilter(e.target.value)}
                options={['All', 'Critical', 'High', 'Medium', 'Low', 'Information']}
              />
            </div>

            <div className="w-52">
              <Select
                label="Lifecycle Status"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                options={['All', 'New', 'Under Review', 'Action Required', 'Resolved', 'Dismissed']}
              />
            </div>

            <div className="pb-0.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSeverityFilter('All');
                  setStatusFilter('All');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Cards List */}
      <div className="space-y-3.5">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => {
            const isCritical = alert.severity === 'Critical';
            const isHigh = alert.severity === 'High';
            const isResolved = alert.status === 'Resolved';

            return (
              <Card 
                key={alert.id}
                accentTop={isCritical ? 'danger' : isHigh ? 'warning' : 'info'}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isCritical ? 'danger' : isHigh ? 'warning' : 'info'}
                      size="xs"
                      dot
                    >
                      {alert.severity}
                    </Badge>
                    <CardTitle className="text-sm">
                      {alert.title}
                    </CardTitle>
                  </div>

                  <Badge
                    variant={isResolved ? 'success' : 'neutral'}
                    size="xs"
                  >
                    {alert.status}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <strong className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">District</strong>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.district}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <strong className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Skill Competency</strong>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.skill}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <strong className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Observation Period</strong>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.period}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <strong className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Action Recommendation</strong>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.action}</span>
                    </div>
                  </div>

                  <EvidencePanel
                    title={`Traceability Evidence: ${alert.skill}`}
                    evidence={{
                      why: alert.title,
                      data: alert.evidence,
                      period: alert.period,
                      source: 'Job Market and Institute Data — Demo',
                      confidence: alert.severity === 'Critical' ? 'High-priority signal; illustrative confidence' : 'Moderate demo confidence',
                      assumptions: 'The configured alert threshold is appropriate for human review.',
                      limitations: 'Synthetic sample; not representative of the full labour market.',
                      evidence: alert.evidence,
                      action: alert.action,
                      route: alert.skill === 'React.js' ? 'skillgap' : 'districtintel'
                    }}
                  />
                </CardContent>

                <CardFooter>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                      Accountable Status:
                    </span>
                    <select
                      value={alert.status}
                      onChange={e => updateAlertStatus(alert.id, e.target.value as any)}
                      className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-slate-700 dark:text-slate-200 font-medium text-xs cursor-pointer"
                    >
                      <option>New</option>
                      <option>Under Review</option>
                      <option>Action Required</option>
                      <option>Resolved</option>
                      <option>Dismissed</option>
                    </select>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Status change logged to audit log
                  </span>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <EmptyState
            title="No Signal Alerts Match Filter Criteria"
            description="Adjust severity levels or status filters to view records from the central triage queue."
            actionLabel="Reset Triage Filters"
            onAction={() => {
              setSeverityFilter('All');
              setStatusFilter('All');
            }}
          />
        )}
      </div>
    </div>
  );
};
