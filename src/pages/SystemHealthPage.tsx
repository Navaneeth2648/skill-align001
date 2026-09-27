import React from 'react';
import { HeartPulse, CheckCircle2, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { KpiCard } from '../components/common/KpiCard';

export const SystemHealthPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-600" />
            <span>Operational System Health</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational status and pipeline health for administrative diagnostic overview.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO VALUES • 26 SEP 2026
        </span>
      </div>

      {/* Summary KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard
          label="Pipeline Availability"
          value="99.94%"
          subtext="High-availability SLA"
          accent="success"
          trend="up"
        />
        <KpiCard
          label="Mean Query Latency"
          value="42 ms"
          subtext="Optimized index lookups"
          accent="primary"
        />
        <KpiCard
          label="Synchronized Batches"
          value="1,234"
          subtext="Verified ingested files"
          accent="saffron"
        />
        <KpiCard
          label="Operational Nodes"
          value="5 / 5"
          subtext="All clusters operational"
          accent="info"
        />
      </div>

      {/* 5 Health Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Database</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Healthy
            </span>
          </div>
          <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t">
            <div><strong>Last Check:</strong> 2 mins ago</div>
            <div><strong>Latency:</strong> <AnimatedNumber value="42 ms" /></div>
            <div><strong>Errors:</strong> <AnimatedNumber value={0} /></div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">API Gateway</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Healthy
            </span>
          </div>
          <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t">
            <div><strong>Last Check:</strong> 1 min ago</div>
            <div><strong>Latency:</strong> <AnimatedNumber value="118 ms" /></div>
            <div><strong>Errors:</strong> <AnimatedNumber value="2 demo requests" /></div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Data Ingestion</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Healthy
            </span>
          </div>
          <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t">
            <div><strong>Last Run:</strong> 18 mins ago</div>
            <div><strong>Processed:</strong> <AnimatedNumber value="1,234 records" /></div>
            <div><strong>Errors:</strong> <AnimatedNumber value="3 flagged" /></div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Background Jobs</h3>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
              Degraded
            </span>
          </div>
          <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t">
            <div><strong>Last Run:</strong> 24 mins ago</div>
            <div><strong>Completed:</strong> <AnimatedNumber value="18 of 20" /></div>
            <div><strong>Delayed:</strong> <AnimatedNumber value="2 demo jobs" /></div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Processing Queue</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Healthy
            </span>
          </div>
          <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t">
            <div><strong>Waiting:</strong> <AnimatedNumber value="14 records" /></div>
            <div><strong>Oldest:</strong> 6 mins</div>
            <div><strong>Failed:</strong> <AnimatedNumber value={0} /></div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border rounded-xl text-xs text-slate-600 dark:text-slate-300">
        <strong>Demonstration Diagnostic Only:</strong> These telemetry metrics represent simulated health statistics and do not poll or monitor live production government servers.
      </div>
    </div>
  );
};
