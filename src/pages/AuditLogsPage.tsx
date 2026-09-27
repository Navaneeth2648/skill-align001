import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AUDIT_LOGS_DATA } from '../data/mockData';
import { AuditRecord } from '../types';
import { Activity, Search, Download, RotateCcw } from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Input, Select, Table, Column 
} from '../components/ui';
import { downloadCSV } from '../utils/exportUtils';

export const AuditLogsPage: React.FC = () => {
  const { navigate, showToast } = useApp();
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

  const handleExportCSV = () => {
    downloadCSV(
      filteredLogs,
      [
        { header: 'Timestamp', accessor: l => l.timestamp },
        { header: 'User', accessor: l => l.user },
        { header: 'Role', accessor: l => l.role },
        { header: 'Action', accessor: l => l.action },
        { header: 'Entity Impacted', accessor: l => l.entity },
        { header: 'Previous State', accessor: l => l.previousState },
        { header: 'New State', accessor: l => l.newState },
        { header: 'Status', accessor: l => l.status },
      ],
      'maharashtra_lmi_audit_trail'
    );
    showToast('Audit trail exported as CSV.');
  };

  const columns: Column<AuditRecord>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (l) => (
        <span className="font-mono text-slate-500 tabular-nums whitespace-nowrap">
          {l.timestamp}
        </span>
      )
    },
    {
      key: 'user',
      header: 'Officer / User',
      sortable: true,
      render: (l) => (
        <span className="font-bold text-slate-900 dark:text-slate-100 block">
          {l.user}
        </span>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (l) => (
        <Badge variant="neutral" size="xs">
          {l.role}
        </Badge>
      )
    },
    {
      key: 'action',
      header: 'Action Executed',
      render: (l) => (
        <span className="font-medium text-[#102c49] dark:text-sky-300">
          {l.action}
        </span>
      )
    },
    {
      key: 'entity',
      header: 'Entity Impacted',
      render: (l) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {l.entity}
        </span>
      )
    },
    {
      key: 'previousState',
      header: 'Prior State',
      render: (l) => (
        <span className="text-slate-500 text-[11px]">
          {l.previousState}
        </span>
      )
    },
    {
      key: 'newState',
      header: 'Resulting State',
      render: (l) => (
        <span className="text-slate-800 dark:text-slate-200 font-medium text-[11px]">
          {l.newState}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Outcome',
      align: 'right',
      render: (l) => (
        <Badge
          variant={l.status === 'Completed' ? 'success' : 'warning'}
          size="xs"
          dot
        >
          {l.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Administrative Audit Trail &amp; Accountability Logs"
        description="Immutable chronological ledger recording administrative decisions, curriculum approvals, budget commitments, and plan generations across state stakeholders."
        badge={<Badge variant="primary" size="xs">Audit Trail</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'System & Governance' },
          { label: 'Audit Trail', isCurrent: true },
        ]}
        actions={
          <Button
            variant="secondary"
            size="xs"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Audit Trail (CSV)
          </Button>
        }
      />

      {/* Summary KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard
          label="Total Logged Events"
          value={AUDIT_LOGS_DATA.length.toString()}
          subtext="Chronological actions"
          accent="primary"
        />
        <KpiCard
          label="Completed Actions"
          value={AUDIT_LOGS_DATA.filter(l => l.status === 'Completed').length.toString()}
          subtext="100% verified status"
          accent="success"
          trend="up"
        />
        <KpiCard
          label="Authorized Officers"
          value={new Set(AUDIT_LOGS_DATA.map(l => l.user)).size.toString()}
          subtext="Distinct authenticated actors"
          accent="info"
        />
        <KpiCard
          label="Filtered Audit Events"
          value={filteredLogs.length.toString()}
          subtext="Active query results"
          accent="warning"
        />
      </div>

      {/* Filter Row */}
      <Card>
        <CardContent className="p-3.5 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="lg:col-span-2">
              <Input
                label="Search Audit Trail"
                placeholder="Search user, action, or entity..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                leftIcon={<Search className="w-3.5 h-3.5" />}
              />
            </div>

            <Select
              label="Role Filter"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              options={['All roles', 'District Officer', 'State Admin', 'Curriculum Reviewer', 'Super Admin']}
            />

            <Select
              label="Status Filter"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              options={['All statuses', 'Completed', 'Pending Review', 'Failed']}
            />

            <Select
              label="Action Type"
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              options={['All actions', 'Updated', 'Generated', 'Approved', 'Login']}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Chronological Activity Log</CardTitle>
            <CardDescription>
              Showing {filteredLogs.length} verified administrative log records
            </CardDescription>
          </div>
          <Badge variant="neutral" size="xs">{filteredLogs.length} Records</Badge>
        </CardHeader>

        <Table<AuditRecord>
          columns={columns}
          data={filteredLogs}
          keyExtractor={l => l.timestamp + l.user}
          stickyHeader
        />

        <CardFooter>
          <span>Logs are digitally signed with cryptographic SHA-256 seals</span>
          <span className="font-mono text-[10px]">INTEGRITY: UNCOMPROMISED</span>
        </CardFooter>
      </Card>
    </div>
  );
};
