import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { DollarSign, TrendingUp, PieChart, Sparkles, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Table, Column, Alert 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

interface DistrictBudgetItem {
  district: string;
  allocation: string;
  spent: string;
  utilization: number;
  priorityProject: string;
}

const DISTRICT_BUDGET_ROWS: DistrictBudgetItem[] = [
  { district: 'Pune Hub', allocation: '₹14.2 cr', spent: '₹9.8 cr', utilization: 69, priorityProject: 'EV & Smart Mobility Center of Excellence' },
  { district: 'Mumbai & Konkan', allocation: '₹12.6 cr', spent: '₹8.4 cr', utilization: 67, priorityProject: 'FinTech & Cloud Computing Lab Expansion' },
  { district: 'Nashik Cluster', allocation: '₹6.8 cr', spent: '₹4.2 cr', utilization: 62, priorityProject: 'Industrial IoT & Automation Testbed' },
  { district: 'Nagpur & Vidarbha', allocation: '₹7.5 cr', spent: '₹4.9 cr', utilization: 65, priorityProject: 'Rooftop Solar & High-Voltage Labs' },
  { district: 'Chhatrapati Sambhajinagar', allocation: '₹4.2 cr', spent: '₹2.9 cr', utilization: 69, priorityProject: 'CNC Machine Tool Upgrades' },
  { district: 'Kolhapur', allocation: '₹2.7 cr', spent: '₹1.8 cr', utilization: 67, priorityProject: 'Foundry & Metallurgy Simulator' },
];

export const BudgetPlanningPage: React.FC = () => {
  const { showToast, navigate } = useApp();
  const [scenarioRun, setScenarioRun] = useState(false);

  const budgetDistData = [34, 18, 25, 11, 14];
  const budgetDistLabels = ['Equipment', 'Trainer Dev.', 'Infrastructure', 'Curriculum', 'Digital Systems'];

  const monthlySpendData = [24, 31, 34, 40, 43, 46];
  const monthlyLabels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  const handleRunCapacity = () => {
    setScenarioRun(true);
    showToast('20% capacity increase fiscal projection calculated.');
  };

  const columns: Column<DistrictBudgetItem>[] = [
    {
      key: 'district',
      header: 'District / Regional Hub',
      sortable: true,
      render: (r) => (
        <span className="font-bold text-slate-900 dark:text-slate-100 block">
          {r.district}
        </span>
      )
    },
    {
      key: 'allocation',
      header: 'Sanctioned Budget',
      align: 'right',
      render: (r) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          {r.allocation}
        </span>
      )
    },
    {
      key: 'spent',
      header: 'Disbursed / Spent',
      align: 'right',
      render: (r) => (
        <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
          {r.spent}
        </span>
      )
    },
    {
      key: 'utilization',
      header: 'Fund Utilization',
      align: 'center',
      sortable: true,
      render: (r) => (
        <div className="flex flex-col items-center gap-1">
          <Badge
            variant={r.utilization >= 65 ? 'success' : 'warning'}
            size="xs"
            dot
          >
            {r.utilization}%
          </Badge>
          <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${r.utilization}%` }} />
          </div>
        </div>
      )
    },
    {
      key: 'priorityProject',
      header: 'Priority Capital Project',
      render: (r) => (
        <span className="text-slate-600 dark:text-slate-400">
          {r.priorityProject}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Statewide Workforce Budget Planning &amp; Allocation"
        description="FY 2026–27 State financial envelope, committed expenditure, and regional training investment scenarios aligned to market skill shortages."
        badge={<Badge variant="primary" size="xs">FY 2026–27</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Resource Planning' },
          { label: 'Budget Planning', isCurrent: true },
        ]}
      />

      {/* 4 Budget Envelope KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <Card accentTop="primary" className="p-3.5 sm:p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Allocated State Envelope
          </span>
          <strong className="block text-2xl font-extrabold text-[#102c49] dark:text-slate-100 tabular-nums">
            <AnimatedNumber value="₹48.0 cr" />
          </strong>
          <small className="text-[11px] text-slate-500">Approved FY 2026–27 ceiling</small>
        </Card>

        <Card accentTop="info" className="p-3.5 sm:p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Committed Funds
          </span>
          <strong className="block text-2xl font-extrabold text-sky-700 dark:text-sky-300 tabular-nums">
            <AnimatedNumber value="₹32.4 cr" />
          </strong>
          <small className="text-[11px] text-sky-600 font-semibold">67.5% of total envelope</small>
        </Card>

        <Card accentTop="warning" className="p-3.5 sm:p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Disbursed Expenditure
          </span>
          <strong className="block text-2xl font-extrabold text-[#b45309] dark:text-amber-300 tabular-nums">
            <AnimatedNumber value="₹21.8 cr" />
          </strong>
          <small className="text-[11px] text-amber-700 font-semibold">45.4% progressive spend</small>
        </Card>

        <Card accentTop="success" className="p-3.5 sm:p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Uncommitted Balance
          </span>
          <strong className="block text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
            <AnimatedNumber value="₹26.2 cr" />
          </strong>
          <small className="text-[11px] text-emerald-600 font-semibold">Available for targeted gap interventions</small>
        </Card>
      </div>

      {/* Row: Charts for Distribution & Monthly Spend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-6 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Budget Distribution by Program Area</CardTitle>
              <CardDescription>
                Proportion of expenditure allocated across infrastructure, equipment, and curriculum
              </CardDescription>
            </div>
            <Badge variant="neutral" size="xs">₹ Crore</Badge>
          </CardHeader>

          <CardContent>
            <CanvasChart type="bar" data={budgetDistData} labels={budgetDistLabels} height={230} color="#102c49" />
          </CardContent>

          <CardFooter>
            <span>Equipment and lab modernization represents 34% of current fiscal priority</span>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-6 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Cumulative Monthly Disbursements</CardTitle>
              <CardDescription>
                Apr–Sep 2026 progressive state treasury disbursements
              </CardDescription>
            </div>
            <Badge variant="neutral" size="xs">FY 2026 H1</Badge>
          </CardHeader>

          <CardContent>
            <CanvasChart type="line" data={monthlySpendData} labels={monthlyLabels} height={230} color="#15803d" />
          </CardContent>

          <CardFooter>
            <span>Tracks milestone-based release against verified ITI enrollment registries</span>
          </CardFooter>
        </Card>
      </div>

      {/* District Allocation Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>District Fund Allocation &amp; Utilization</CardTitle>
            <CardDescription>
              Sanctioned funds and project disbursement status across key regional hubs
            </CardDescription>
          </div>
          <Badge variant="neutral" size="xs">6 Regional Hubs</Badge>
        </CardHeader>

        <Table<DistrictBudgetItem>
          columns={columns}
          data={DISTRICT_BUDGET_ROWS}
          keyExtractor={r => r.district}
          stickyHeader
        />

        <CardFooter>
          <span>All budget line items are subject to statutory Accountant General (AG) audit</span>
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              showToast('Exporting financial utilization statement.');
            }}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Statement
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
