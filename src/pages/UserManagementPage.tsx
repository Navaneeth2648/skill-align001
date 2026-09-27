import React, { useState, useEffect } from 'react';
import { DEMO_USERS_DATA } from '../data/mockData';
import { Users, Search, ShieldCheck, UserCheck, UserX, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserService, PlatformUser } from '../services/dataService';

export const UserManagementPage: React.FC = () => {
  const { showToast } = useApp();
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All roles');
  const [statusFilter, setStatusFilter] = useState('All statuses');

  useEffect(() => {
    UserService.getUsers()
      .then(res => {
        if (res && res.length > 0) {
          setUsers(res);
        } else {
          // fallback to seed
          setUsers(DEMO_USERS_DATA.map((u, idx) => ({
            id: String(idx + 1),
            name: u.name,
            email: `${u.name.toLowerCase().replace(/[^a-z]/g, '')}@maharashtra.gov.in`,
            role: u.role as any,
            permissions: [u.permissions],
            status: u.status as any,
            lastLogin: u.lastLogin,
            mfaEnabled: u.mfa === 'Enabled'
          })));
        }
      })
      .catch(() => {
        setUsers(DEMO_USERS_DATA.map((u, idx) => ({
          id: String(idx + 1),
          name: u.name,
          email: `${u.name.toLowerCase().replace(/[^a-z]/g, '')}@maharashtra.gov.in`,
          role: u.role as any,
          permissions: [u.permissions],
          status: u.status as any,
          lastLogin: u.lastLogin,
          mfaEnabled: u.mfa === 'Enabled'
        })));
      });
  }, []);

  const handleToggleStatus = async (user: PlatformUser) => {
    try {
      const res = await UserService.toggleUserStatus(user.id);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: res.status } : u));
      showToast(`User ${user.name} is now ${res.status}.`);
    } catch {
      const next = user.status === 'Active' ? 'Suspended' : 'Active';
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: next } : u));
      showToast(`User ${user.name} status updated locally to ${next}.`);
    }
  };

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = roleFilter === 'All roles' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All statuses' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            <span>User Directory &amp; Role-Based Access Control</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Administration of statewide stakeholder accounts, security roles, permissions scopes, and status toggles.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded border border-emerald-300 dark:border-emerald-800">
          RBAC ACTIVE • {users.length} REGISTERED USERS
        </span>
      </div>

      {/* Filter Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-end gap-3 text-xs">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Search Users</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by user name, email or role..."
              className="w-full pl-8 pr-3 py-1.5 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Role Filter</label>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
          >
            <option>All roles</option>
            <option>Admin</option>
            <option>Government Officer</option>
            <option>Institution</option>
            <option>Employer</option>
            <option>Trainer</option>
            <option>Student</option>
            <option>State Admin</option>
            <option>Super Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Status Filter</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Invited</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3">User &amp; Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Permissions Scope</th>
                <th className="p-3">Account Status</th>
                <th className="p-3">Last Login</th>
                <th className="p-3">MFA</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3">
                    <strong className="block text-slate-900 dark:text-slate-100">{u.name}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{u.email}</span>
                  </td>
                  <td className="p-3 font-semibold text-[#173a5e] dark:text-sky-300">{u.role}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {Array.isArray(u.permissions) ? u.permissions.join(', ') : u.permissions}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 whitespace-nowrap">{u.lastLogin}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.mfaEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {u.mfaEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(u)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                        u.status === 'Active'
                          ? 'border border-amber-300 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                          : 'bg-emerald-700 text-white hover:bg-emerald-800'
                      }`}
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permission Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4 text-xs">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Role Permission Matrix
          </h2>
          <p className="text-slate-500">
            Explicitly scoped boundaries to ensure segregation of duties across the skill ecosystem.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b text-[11px] font-bold text-slate-500 uppercase">
                <th className="p-3">Capability / Permission</th>
                <th className="p-3">State Admin</th>
                <th className="p-3">District Officer</th>
                <th className="p-3">ITI Principal</th>
                <th className="p-3">Trainer</th>
                <th className="p-3">Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-semibold">View statewide analytics</td>
                <td className="p-3 font-bold text-emerald-600">Allowed</td>
                <td className="p-3 text-slate-500">District only</td>
                <td className="p-3 text-slate-500">Institute only</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 font-bold text-emerald-600">Allowed</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Generate district plan</td>
                <td className="p-3 font-bold text-emerald-600">Allowed</td>
                <td className="p-3 font-bold text-emerald-600">Own district</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 font-bold text-emerald-600">Allowed</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Review curriculum proposals</td>
                <td className="p-3 font-bold text-emerald-600">Allowed</td>
                <td className="p-3 text-slate-500">Recommend</td>
                <td className="p-3 text-slate-500">Institute review</td>
                <td className="p-3 text-slate-500">Comment only</td>
                <td className="p-3 text-slate-500">Config only</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Manage system users</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 font-bold text-emerald-600">Allowed</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">View audit logs &amp; system health</td>
                <td className="p-3 text-slate-500">Audit only</td>
                <td className="p-3 text-slate-500">District audit</td>
                <td className="p-3 text-slate-500">Institute audit</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 font-bold text-emerald-600">Full Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
