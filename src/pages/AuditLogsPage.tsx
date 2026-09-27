import React, { useState } from 'react';
import { AUDIT_LOGS_DATA } from '../data/mockData';
import { Activity, Search } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All roles');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [actionFilter, setActionFilter] = useState('All actions');

  const filteredLogs = AUDIT_LOGS_DATA.filter(log => {
    const q = search.toLowerCase();
    const matchesSearch = 
      !q || 
      log.user.toLowerCase().includes(q) || 
      log.action.toLowerCase().includes(q) || 
      log.entity.toLowerCase().includes(q);

    const matchesRole = roleFilter === 'All roles' || log.role === roleFilter;
    const matchesStatus = statusFilter === 'All statuses' || log.status === statusFilter;
    const matchesAction = actionFilter === 'All actions' || log.action.toLowerCase().startsWith(actionFilter.toLowerCase());

    return matchesSearch && matchesRole && matchesStatus && matchesAction;
  });

  return (
    <div className="space-y-6 text-xs">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            <span>Administrative Audit Trail &amp; Accountability Logs</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Immutable log of state and district administrative decisions, plan generations, and curriculum proposals.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Search Audit Logs</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search user, action, or entity..."
              className="w-full pl-8 pr-3 py-1.5 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Role Filter</label>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
          >
            <option>All roles</option>
            <option>District Officer</option>
            <option>State Admin</option>
            <option>Curriculum Reviewer</option>
            <option>Super Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Status Filter</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
          >
            <option>All statuses</option>
            <option>Completed</option>
            <option>Pending Review</option>
            <option>Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Action Type</label>
          <select
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
          >
            <option>All actions</option>
            <option>Updated</option>
            <option>Generated</option>
            <option>Approved</option>
            <option>Login</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Entity Impacted</th>
                <th className="p-3">Previous State</th>
                <th className="p-3">New State</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{log.user}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{log.role}</td>
                  <td className="p-3 font-medium text-[#173a5e] dark:text-sky-300">{log.action}</td>
                  <td className="p-3 text-slate-800 dark:text-slate-200 font-semibold">{log.entity}</td>
                  <td className="p-3 text-slate-500 text-[11px]">{log.previousState}</td>
                  <td className="p-3 text-slate-800 dark:text-slate-200 font-medium text-[11px]">{log.newState}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
