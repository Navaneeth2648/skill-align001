import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EvidencePanel } from '../components/common/EvidencePanel';
import { Bell, AlertTriangle, Filter, CheckCircle2 } from 'lucide-react';
import { AlertRecord } from '../types';

export const AlertCentrePage: React.FC = () => {
  const { alerts, updateAlertStatus } = useApp();
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAlerts = alerts.filter(a => {
    const matchesSev = severityFilter === 'All' || a.severity === severityFilter;
    const matchesStat = statusFilter === 'All' || a.status === statusFilter;
    return matchesSev && matchesStat;
  });

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Alert &amp; Signal Triage Centre</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time evidence signals, threshold violations, and accountable administrative status management.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* Filter Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-end gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Severity Level
          </label>
          <select
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Information</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            Lifecycle Status
          </label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option>All</option>
            <option>New</option>
            <option>Under Review</option>
            <option>Action Required</option>
            <option>Resolved</option>
            <option>Dismissed</option>
          </select>
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => {
            const isCritical = alert.severity === 'Critical';
            const isHigh = alert.severity === 'High';
            const isResolved = alert.status === 'Resolved';

            return (
              <article
                key={alert.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 animate-pulse'
                        : isHigh
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                        : 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300'
                    }`}>
                      {alert.severity}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {alert.title}
                    </h3>
                  </div>

                  <span className={`self-start sm:self-auto px-2 py-0.5 rounded text-[10px] font-bold ${
                    isResolved
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {alert.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40">
                    <strong className="block text-[10px] text-slate-400 uppercase">District</strong>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.district}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40">
                    <strong className="block text-[10px] text-slate-400 uppercase">Skill Competency</strong>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.skill}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40">
                    <strong className="block text-[10px] text-slate-400 uppercase">Time Period</strong>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.period}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40">
                    <strong className="block text-[10px] text-slate-400 uppercase">Action Recommendation</strong>
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

                <div className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-semibold">Change Lifecycle Status:</span>
                    <select
                      value={alert.status}
                      onChange={e => updateAlertStatus(alert.id, e.target.value as any)}
                      className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-slate-700 dark:text-slate-200 font-medium"
                    >
                      <option>New</option>
                      <option>Under Review</option>
                      <option>Action Required</option>
                      <option>Resolved</option>
                      <option>Dismissed</option>
                    </select>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-900 border rounded-xl text-slate-400 text-xs">
            No alert signals match the selected severity and lifecycle status filters.
          </div>
        )}
      </div>
    </div>
  );
};
