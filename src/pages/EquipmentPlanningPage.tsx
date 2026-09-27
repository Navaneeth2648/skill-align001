import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_DATA } from '../data/mockData';
import { EquipmentRecord } from '../types';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { KpiCard } from '../components/common/KpiCard';
import { Wrench, CheckCircle, Clock, Plus, ArrowLeft, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Tabs, Table, Column 
} from '../components/ui';

interface SharingRequest {
  requestingInstitute: string;
  equipment: string;
  quantity: string;
  potentialLender: string;
  sharingWindow: string;
  status: 'Under Review' | 'Approved' | 'Dispatched';
}

const SHARING_DATA: SharingRequest[] = [
  { requestingInstitute: 'Aundh ITI', equipment: 'Arduino Kit', quantity: '6 units', potentialLender: 'Pimpri ITI', sharingWindow: '05–23 Oct 2026', status: 'Under Review' },
  { requestingInstitute: 'Govt. Polytechnic Pune', equipment: 'PLC Trainer', quantity: '3 units', potentialLender: 'Haveli Skill Centre', sharingWindow: '12–30 Oct 2026', status: 'Approved' },
];

export const EquipmentPlanningPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'detail' | 'sharing'>('dashboard');

  const equipmentColumns: Column<EquipmentRecord>[] = [
    {
      key: 'name',
      header: 'Equipment / Tooling Set',
      sortable: true,
      render: (e) => (
        <span className="font-bold text-slate-900 dark:text-slate-100">
          {e.name}
        </span>
      )
    },
    {
      key: 'required',
      header: 'Required',
      align: 'right',
      sortable: true,
      render: (e) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          <AnimatedNumber value={e.required} />
        </span>
      )
    },
    {
      key: 'available',
      header: 'Available',
      align: 'right',
      sortable: true,
      render: (e) => (
        <span className="text-slate-700 dark:text-slate-300 tabular-nums">
          <AnimatedNumber value={e.available} />
        </span>
      )
    },
    {
      key: 'shortage',
      header: 'Shortage',
      align: 'center',
      sortable: true,
      render: (e) => (
        <Badge
          variant={e.shortage > 8 ? 'danger' : 'warning'}
          size="xs"
          dot
        >
          <AnimatedNumber value={`${e.shortage} units`} />
        </Badge>
      )
    },
    {
      key: 'utilization',
      header: 'Utilization',
      align: 'center',
      sortable: true,
      render: (e) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          <AnimatedNumber value={e.utilization} suffix="%" />
        </span>
      )
    },
    {
      key: 'unitCost',
      header: 'Unit Benchmark Cost',
      align: 'right',
      render: (e) => (
        <span className="text-slate-600 dark:text-slate-400 tabular-nums">
          <AnimatedNumber value={`₹${e.unitCost.toLocaleString('en-IN')}`} />
        </span>
      )
    },
    {
      key: 'totalCost',
      header: 'Shortage Capital Cost',
      align: 'right',
      render: (e) => (
        <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
          <AnimatedNumber value={`₹${e.totalCost.toLocaleString('en-IN')}`} />
        </span>
      )
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (e, idx) => (
        <Button
          variant="outline"
          size="xs"
          onClick={() => {
            if (idx === 0) {
              setActiveTab('detail');
            } else {
              showToast(`Detailed BOM is demonstrated for ${e.name}.`);
            }
          }}
          rightIcon={<ArrowRight className="w-3 h-3" />}
        >
          Inspect BOM
        </Button>
      )
    }
  ];

  const sharingColumns: Column<SharingRequest>[] = [
    {
      key: 'requestingInstitute',
      header: 'Requesting Institute',
      render: (r) => <span className="font-bold text-slate-900 dark:text-slate-100">{r.requestingInstitute}</span>
    },
    {
      key: 'equipment',
      header: 'Equipment',
      render: (r) => <span className="text-slate-800 dark:text-slate-200">{r.equipment}</span>
    },
    {
      key: 'quantity',
      header: 'Quantity',
      align: 'center',
      render: (r) => <span className="font-semibold tabular-nums">{r.quantity}</span>
    },
    {
      key: 'potentialLender',
      header: 'Potential Lending Centre',
      render: (r) => <span className="text-slate-600 dark:text-slate-400">{r.potentialLender}</span>
    },
    {
      key: 'sharingWindow',
      header: 'Operational Window',
      render: (r) => <span className="text-slate-500 tabular-nums">{r.sharingWindow}</span>
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (r) => (
        <Badge
          variant={r.status === 'Approved' ? 'success' : 'warning'}
          size="xs"
          dot
        >
          {r.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Equipment Planning &amp; Allocation System"
        description="Audit vocational laboratory inventory, calculate equipment shortages against active enrollment targets, and evaluate inter-institute sharing."
        badge={<Badge variant="primary" size="xs">Laboratory Infrastructure</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Resource Planning' },
          { label: 'Equipment Planning', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => navigate('trainers')}
            >
              Trainer Roster →
            </Button>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => navigate('budget')}
            >
              Budget Planning →
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <Tabs
        variant="segmented"
        activeTab={activeTab}
        onChange={tab => setActiveTab(tab as any)}
        tabs={[
          { id: 'dashboard', label: 'Equipment Inventory Matrix' },
          { id: 'detail', label: 'Arduino Kit Specification (BOM)' },
          { id: 'sharing', label: 'Inter-Institute Sharing Protocol' },
        ]}
      />

      {/* SUBVIEW 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <KpiCard
              label="Sanctioned Requirement"
              value={EQUIPMENT_DATA.reduce((a, b) => a + b.required, 0).toLocaleString('en-IN')}
              subtext="Across evaluated trades"
              accent="primary"
            />
            <KpiCard
              label="Available Inventory"
              value={EQUIPMENT_DATA.reduce((a, b) => a + b.available, 0).toLocaleString('en-IN')}
              subtext="In-situ active equipment"
              accent="success"
              trend="up"
            />
            <KpiCard
              label="Net Tooling Shortage"
              value={`${EQUIPMENT_DATA.reduce((a, b) => a + b.shortage, 0)} Units`}
              subtext="Critical gap backlog"
              accent="danger"
              trend="down"
            />
            <KpiCard
              label="Shortage Outlay Required"
              value={`₹${(EQUIPMENT_DATA.reduce((a, b) => a + b.totalCost, 0) / 100000).toFixed(1)} Lakh`}
              subtext="GeM rate benchmark"
              accent="warning"
            />
          </div>

          <Card>
          <CardHeader>
            <div>
              <CardTitle>Vocational Lab Tooling Shortage Ledger</CardTitle>
              <CardDescription>
                Summary of sanctioned vs in-situ tooling kits across Pune district training centers
              </CardDescription>
            </div>
            <Badge variant="neutral" size="xs">
              State Lab Census: Aug 2026
            </Badge>
          </CardHeader>

          <Table<EquipmentRecord>
            columns={equipmentColumns}
            data={EQUIPMENT_DATA}
            keyExtractor={e => e.name}
            stickyHeader
          />

          <CardFooter>
            <span>Total shortage capital cost represents shortage units multiplied by the benchmark GeM rate contract</span>
            <Button
              variant="primary"
              size="xs"
              onClick={() => navigate('budget')}
              leftIcon={<Wrench className="w-3.5 h-3.5" />}
            >
              Initiate GeM Procurement Sanction
            </Button>
          </CardFooter>
        </Card>
      </div>
      )}

      {/* SUBVIEW 2: EQUIPMENT DETAIL */}
      {activeTab === 'detail' && (
        <div className="space-y-5">
          <Card accentTop="primary">
            <CardHeader>
              <div>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  DETAILED SPECIFICATION • PILOT LAB
                </span>
                <CardTitle>Arduino Kit (IoT &amp; Embedded Practice Lab)</CardTitle>
                <CardDescription>
                  Required: 30 units • Available: 18 units • Shortage: 12 units • Utilization: 86%
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setActiveTab('dashboard')}
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Back to Inventory Matrix
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* BOM Breakdown */}
                <div className="lg:col-span-7 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                    Bill of Materials (BOM) Breakdown
                  </h4>
                  <div className="border border-slate-200 dark:border-slate-800 rounded overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase">
                          <th className="p-2.5">Component Item</th>
                          <th className="p-2.5 text-right">Qty</th>
                          <th className="p-2.5 text-right">Unit Rate</th>
                          <th className="p-2.5 text-right">Total</th>
                          <th className="p-2.5 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                          <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Arduino Uno board (Rev 3)</td>
                          <td className="p-2.5 text-right tabular-nums">12</td>
                          <td className="p-2.5 text-right tabular-nums">₹2,100</td>
                          <td className="p-2.5 text-right font-bold tabular-nums">₹25,200</td>
                          <td className="p-2.5 text-right">
                            <Badge variant="warning" size="xs">Requested</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Sensor assortment module</td>
                          <td className="p-2.5 text-right tabular-nums">12</td>
                          <td className="p-2.5 text-right tabular-nums">₹1,600</td>
                          <td className="p-2.5 text-right font-bold tabular-nums">₹19,200</td>
                          <td className="p-2.5 text-right">
                            <Badge variant="warning" size="xs">Approved</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Breadboard &amp; jumper set</td>
                          <td className="p-2.5 text-right tabular-nums">12</td>
                          <td className="p-2.5 text-right tabular-nums">₹650</td>
                          <td className="p-2.5 text-right font-bold tabular-nums">₹7,800</td>
                          <td className="p-2.5 text-right">
                            <Badge variant="info" size="xs">Ordered</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Protective storage case</td>
                          <td className="p-2.5 text-right tabular-nums">12</td>
                          <td className="p-2.5 text-right tabular-nums">₹450</td>
                          <td className="p-2.5 text-right font-bold tabular-nums">₹5,400</td>
                          <td className="p-2.5 text-right">
                            <Badge variant="success" size="xs">Delivered</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Utilization & Maintenance */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-3.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2.5 text-xs">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                      Lab Utilization Trajectory • Q2 2026
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between font-semibold mb-0.5">
                          <span>July 2026</span>
                          <span className="tabular-nums">72%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full bg-[#102c49] rounded-full" style={{ width: '72%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold mb-0.5">
                          <span>August 2026</span>
                          <span className="tabular-nums">81%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full bg-[#102c49] rounded-full" style={{ width: '81%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold mb-0.5">
                          <span>September 2026</span>
                          <span className="text-amber-700 dark:text-amber-400 font-bold tabular-nums">86% (Congested)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '86%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Lab Maintenance Inspection Ledger</h4>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                      <div className="border-l-2 border-slate-300 dark:border-slate-600 pl-2">
                        <strong>12 Sep 2026 · Quarterly Inspection:</strong> 18 kits passed; 2 USB cables replaced.
                      </div>
                      <div className="border-l-2 border-slate-300 dark:border-slate-600 pl-2">
                        <strong>04 Aug 2026 · Sensor Calibration:</strong> Verified by institute lab technician.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Procurement Workflow Lifecycle */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-2">
                  Procurement Lifecycle Workflow
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">1. Requested</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Lab coordinator · 16 Sep</p>
                  </div>
                  <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">2. Approved</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">ITI Principal · 20 Sep</p>
                  </div>
                  <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
                    <span className="font-bold text-amber-800 dark:text-amber-300">3. Ordered (Current)</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Procurement desk · 25 Sep</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500">4. Delivered</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">Pending supplier dispatch</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SUBVIEW 3: SHARING REQUESTS */}
      {activeTab === 'sharing' && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Inter-Institute Tooling Sharing Requests</CardTitle>
              <CardDescription>
                Bilateral equipment sharing evaluated prior to issuing new capital procurement tenders
              </CardDescription>
            </div>
            <Button
              variant="primary"
              size="xs"
              onClick={() => showToast('New sharing request recorded for this demonstration session.')}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Create Sharing Request
            </Button>
          </CardHeader>

          <Table<SharingRequest>
            columns={sharingColumns}
            data={SHARING_DATA}
            keyExtractor={r => r.requestingInstitute + r.equipment}
            stickyHeader
          />

          <CardFooter>
            <span>Managed under Maharashtra Inter-Institute Resource Pooling Directives</span>
            <span className="font-mono text-[10px]">RESOURCE LEDGER: ACTIVE</span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

