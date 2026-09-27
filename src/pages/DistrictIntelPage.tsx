import React from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { 
  Building2, Users, Wrench, Briefcase, Calendar, DollarSign, 
  ChevronRight, ArrowRight, ShieldAlert, Award, MapPin
} from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge 
} from '../components/ui';

export const DistrictIntelPage: React.FC = () => {
  const { navigate, showToast, setSelectedSkillName } = useApp();

  const handleOpenSkill = (skill: string) => {
    setSelectedSkillName(skill);
    navigate('skilldetail');
  };

  return (
    <div className="space-y-5">
      {/* Standardized Page Header with District Traceability Breadcrumbs */}
      <PageHeader
        title="Pune District Workforce Intelligence Drilldown"
        description="Comprehensive regional intelligence: District → Institute → Course → Skill → Evidence Traceability Chain."
        badge={<Badge variant="saffron" size="xs">Regional Deep Dive</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Market Intelligence' },
          { label: 'Pune District Profile', isCurrent: true },
        ]}
      />

      {/* District Officer Module Quick Navigation Rail */}
      <Card variant="subtle">
        <div className="px-3.5 py-2.5 flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold px-2 tracking-wider">
            Quick Modules:
          </span>
          <Button variant="secondary" size="xs" onClick={() => navigate('jobintel')}>
            District Jobs
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('skills')}>
            Skills Index
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('coursealignment')}>
            Courses
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('institutes')}>
            Institutes
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('employerportal')}>
            Employers
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('trainers')}>
            Trainers
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('equipment')}>
            Equipment
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('trainingplan')}>
            Plans
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('reportscentre')}>
            Reports
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('alertcentre')}>
            Alerts
          </Button>
          <Button variant="secondary" size="xs" onClick={() => navigate('budget')}>
            Budget
          </Button>
        </div>
      </Card>

      {/* 6 District KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard
          label="Pune Jobs"
          value="18,420"
          subtext="Active postings index"
          trend="up"
          targetRoute="jobintel"
          accent="primary"
        />
        <KpiCard
          label="Institutes"
          value="86"
          subtext="ITIs & Polytechnics"
          targetRoute="institutes"
          accent="primary"
        />
        <KpiCard
          label="Employers"
          value="412"
          subtext="Validated hiring partners"
          trend="up"
          targetRoute="employerportal"
          accent="success"
        />
        <KpiCard
          label="Courses"
          value="128"
          subtext="Vocational programs"
          targetRoute="coursealignment"
          accent="info"
        />
        <KpiCard
          label="Skill Gaps"
          value="37"
          subtext="Review thresholds crossed"
          trend="down"
          targetRoute="skillgap"
          accent="warning"
        />
        <KpiCard
          label="Priority Alerts"
          value="6"
          subtext="Action required"
          trend="down"
          targetRoute="alertcentre"
          accent="danger"
        />
      </div>

      {/* 9 Status Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {/* Panel 1: Labour Demand */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Sector Labour Demand
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">IT &amp; digital services</span>
              <span className="text-slate-500 tabular-nums"><AnimatedNumber value="5,840 postings" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Automotive &amp; EV</span>
              <span className="text-slate-500 tabular-nums"><AnimatedNumber value="4,160 postings" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Precision manufacturing</span>
              <span className="text-slate-500 tabular-nums"><AnimatedNumber value="3,220 postings" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => navigate('jobintel')}
            >
              Inspect Pune Jobs
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 2: Skill Demand */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Leading Skill Signals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">React.js &amp; TypeScript</span>
              <Badge variant="success" size="xs">High Signal</Badge>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">EV diagnostics &amp; CAN Bus</span>
              <span className="font-bold text-[#b45309] tabular-nums"><AnimatedNumber value="+28%" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Industrial IoT &amp; PLC</span>
              <span className="font-bold text-[#b45309] tabular-nums"><AnimatedNumber value="+22%" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => handleOpenSkill('React')}
            >
              Open React Skill Detail
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 3: Course Alignment */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Course Alignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">COPA</span>
              <span className="font-bold text-[#b45309] tabular-nums"><AnimatedNumber value="62%" /> (Gap Review)</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Electrical Technician</span>
              <span className="font-bold text-emerald-600 tabular-nums"><AnimatedNumber value="81%" /> Aligned</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">IoT Technician</span>
              <span className="font-bold text-sky-600 tabular-nums"><AnimatedNumber value="74%" /> Aligned</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => navigate('coursealignment')}
            >
              Compare All Pune Courses
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 4: Institute Performance */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Institute Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Aundh ITI</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium tabular-nums"><AnimatedNumber value="72% placement" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Pimpri ITI</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium tabular-nums"><AnimatedNumber value="68% placement" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Govt. Polytechnic Pune</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium tabular-nums"><AnimatedNumber value="76% placement" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => showToast('Aundh ITI: 12 courses, 38 trainers, 86% equipment utilization.')}
            >
              Inspect Aundh ITI Profile
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 5: Trainer Capacity */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Trainer Capacity Gap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Required Trainers</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums"><AnimatedNumber value="286 instructors" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Available Qualified</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums"><AnimatedNumber value="249 instructors" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-rose-700 dark:text-rose-400">Capacity Shortfall</span>
              <span className="font-bold text-rose-700 dark:text-rose-400 tabular-nums"><AnimatedNumber value="37 instructors" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => navigate('trainers')}
            >
              Open Trainer Upskilling Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 6: Equipment Capacity */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Lab Equipment Capacity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Arduino kits</span>
              <span className="text-[#b45309] font-bold tabular-nums"><AnimatedNumber value="18 / 30 (Shortage 12)" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">EV diagnostic rigs</span>
              <span className="text-rose-600 font-bold tabular-nums"><AnimatedNumber value="8 / 14 (Shortage 6)" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">PLC trainers</span>
              <span className="text-emerald-600 font-bold tabular-nums"><AnimatedNumber value="22 / 25 (Shortage 3)" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => navigate('equipment')}
            >
              Review Equipment Procurement
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 7: Employers */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Leading Pune Employers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Sahyadri Digital Systems</span>
              <span className="text-slate-600 dark:text-slate-400 tabular-nums"><AnimatedNumber value="64 open roles" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Deccan Mobility Works</span>
              <span className="text-slate-600 dark:text-slate-400 tabular-nums"><AnimatedNumber value="48 open roles" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Mula Engineering Works</span>
              <span className="text-slate-600 dark:text-slate-400 tabular-nums"><AnimatedNumber value="35 open roles" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => navigate('employerportal')}
            >
              View Employer Partnerships
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 8: Training Plan Preview */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Training Plan Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Target Priority Seats</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums"><AnimatedNumber value="1,240 seats" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Trainer Target</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums"><AnimatedNumber value="37 instructors" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Implementation Window</span>
              <span className="font-bold text-slate-800 dark:text-slate-200"><AnimatedNumber value="2 quarters" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => navigate('trainingplan')}
            >
              Generate Pune Action Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Panel 9: Budget Preview */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider">
              Budget Scenario Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Equipment Allocation</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums"><AnimatedNumber value="₹84.5 lakh" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Trainer Development</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums"><AnimatedNumber value="₹22.2 lakh" /></span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Total Envelope</span>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums"><AnimatedNumber value="₹1.18 crore" /></span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="xs"
              fullWidth
              onClick={() => navigate('budget')}
            >
              Open Budget Planning
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
