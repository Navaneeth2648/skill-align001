import React, { useState, useTransition } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { CanvasChart } from '../components/common/CanvasChart';
import { EvidencePanel } from '../components/common/EvidencePanel';
import { MaharashtraRegionMap } from '../components/common/MaharashtraRegionMap';
import { DISTRICTS_DATA, COURSES_DATA } from '../data/mockData';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { 
  AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, 
  MapPin, SlidersHorizontal, Sun, Moon, Maximize2, RotateCcw,
  Building2, Users, BookOpen, GraduationCap, Briefcase, TrendingUp,
  AlertCircle, ChevronRight, Activity, ArrowUpRight, ArrowDownRight,
  Sparkles, FileText, CheckCircle2, Wrench, Download, ExternalLink,
  Calendar, DollarSign
} from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Select, Tabs, Table, Column 
} from '../components/ui';

interface DistrictRow {
  name: string;
  division: string;
  jobs: number;
  skillGapCount: number;
  trainingNeedSeats: number;
  curriculumRisk: 'High Risk' | 'Medium Risk' | 'Low Risk';
  trend: string;
  trendDir: 'up' | 'down';
  lastUpdated: string;
}

const DISTRICT_TABLE_DATA: DistrictRow[] = [
  { name: 'Pune', division: 'Western', jobs: 18420, skillGapCount: 37, trainingNeedSeats: 1240, curriculumRisk: 'High Risk', trend: '+8.4%', trendDir: 'up', lastUpdated: '26 Sep 2026' },
  { name: 'Mumbai', division: 'Konkan', jobs: 16980, skillGapCount: 29, trainingNeedSeats: 980, curriculumRisk: 'Medium Risk', trend: '+6.1%', trendDir: 'up', lastUpdated: '26 Sep 2026' },
  { name: 'Thane', division: 'Konkan', jobs: 11940, skillGapCount: 22, trainingNeedSeats: 740, curriculumRisk: 'Medium Risk', trend: '+5.5%', trendDir: 'up', lastUpdated: '25 Sep 2026' },
  { name: 'Nashik', division: 'Northern', jobs: 7820, skillGapCount: 19, trainingNeedSeats: 620, curriculumRisk: 'High Risk', trend: '+9.2%', trendDir: 'up', lastUpdated: '26 Sep 2026' },
  { name: 'Nagpur', division: 'Vidarbha', jobs: 7250, skillGapCount: 16, trainingNeedSeats: 580, curriculumRisk: 'Low Risk', trend: '+4.8%', trendDir: 'up', lastUpdated: '24 Sep 2026' },
  { name: 'Chhatrapati Sambhajinagar', division: 'Marathwada', jobs: 6940, skillGapCount: 21, trainingNeedSeats: 690, curriculumRisk: 'High Risk', trend: '+7.3%', trendDir: 'up', lastUpdated: '25 Sep 2026' },
  { name: 'Kolhapur', division: 'Southern', jobs: 4890, skillGapCount: 14, trainingNeedSeats: 410, curriculumRisk: 'Low Risk', trend: '+3.2%', trendDir: 'up', lastUpdated: '24 Sep 2026' },
  { name: 'Amravati', division: 'Vidarbha', jobs: 3710, skillGapCount: 12, trainingNeedSeats: 340, curriculumRisk: 'Medium Risk', trend: '+2.9%', trendDir: 'up', lastUpdated: '23 Sep 2026' },
  { name: 'Nanded', division: 'Marathwada', jobs: 3260, skillGapCount: 11, trainingNeedSeats: 290, curriculumRisk: 'Low Risk', trend: '+1.8%', trendDir: 'up', lastUpdated: '23 Sep 2026' },
];

export const DashboardPage: React.FC = () => {
  const { 
    navigate, 
    theme, 
    toggleTheme, 
    isPresentation, 
    togglePresentation, 
    resetDemo, 
    showToast,
    alerts,
    updateAlertStatus,
    setSelectedSkillName
  } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState('All Maharashtra');
  const [selectedIndustry, setSelectedIndustry] = useState('All industries');
  const [activePeriod, setActivePeriod] = useState<'7D' | '30D' | '6M' | '1Y'>('1Y');
  const [expandedEvidenceId, setExpandedEvidenceId] = useState<number | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 240);
    showToast(`Dashboard filtered for: ${dist}`);
  };

  const handleIndustryChange = (ind: string) => {
    setSelectedIndustry(ind);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 240);
    showToast(`Dashboard filtered for: ${ind}`);
  };

  const districtKpiMap: Record<string, { jobs: string; emerging: string; gaps: string; risks: string; seats: string; equipment: string; subtext: string }> = {
    'Pune': { jobs: '18,420', emerging: '14 Signals', gaps: '37', risks: '8 Trades', seats: '1,240', equipment: '46 Units', subtext: '+8.4% local demand surge' },
    'Mumbai': { jobs: '16,980', emerging: '11 Signals', gaps: '29', risks: '6 Trades', seats: '980', equipment: '38 Units', subtext: '+6.1% fintech & logistics' },
    'Nagpur': { jobs: '7,250', emerging: '6 Signals', gaps: '16', risks: '4 Trades', seats: '580', equipment: '24 Units', subtext: '+4.8% cargo & energy' },
    'Nashik': { jobs: '7,820', emerging: '7 Signals', gaps: '19', risks: '5 Trades', seats: '620', equipment: '28 Units', subtext: '+9.2% agro-machinery' },
    'Chhatrapati Sambhajinagar': { jobs: '6,940', emerging: '6 Signals', gaps: '21', risks: '5 Trades', seats: '690', equipment: '26 Units', subtext: '+7.3% EV automotive cluster' },
  };

  const currentKpi = districtKpiMap[selectedDistrict] || {
    jobs: '1,23,456',
    emerging: '38 Signals',
    gaps: '2,418',
    risks: '42 Trades',
    seats: '18,400',
    equipment: '312 Units',
    subtext: '+8.4% vs prior period'
  };

  const priorityEvidenceMap: Record<number, import('../types').EvidenceInfo> = {
    1: {
      why: 'Rapid deployment of EV manufacturing and assembly across Pune, Nashik, and Chhatrapati Sambhajinagar industrial corridors creates acute shortage of certified high-voltage service technicians.',
      data: '74 empirical vacancy notices demanding High-Voltage Safety, BMS diagnostics, and AIS-038 compliance across 18 automotive tier-1 OEMs.',
      period: '01 Jul 2026 – 26 Sep 2026 (Rolling 90-day window)',
      source: 'Maharashtra Employer Portal feeds, MIDC industrial bulletins, and validated corporate ATS postings.',
      confidence: '94% empirical extraction score; cross-verified with Maharashtra Automotive Skill Council.',
      assumptions: 'State EV policy adoption subsidies will sustain commercial and passenger fleet electrification through 2028.',
      limitations: 'Captures formal registered corporate employers; unorganized independent garage workforce excluded from automated NLP ingestion.',
      evidence: 'Mandatory vacancy requirements cite 400V battery isolation, CAN-bus oscilloscope tracing, and AIS-038 thermal safety certs.',
      action: 'Mandate 40-hour EV diagnostics module in Mechanic Motor Vehicle (MMV) syllabus and release equipment allocation.',
      route: 'skilldetail'
    },
    2: {
      why: 'Accelerating digital transformation, OCR invoice processing, and cloud ERP integration have reduced requirements for legacy standalone typing and manual ledger entry by 12% quarter-on-quarter.',
      data: '320 commercial administration and front-desk vacancies surveyed across Mumbai, Pune, and Nagpur districts.',
      period: '01 Jan 2026 – 26 Sep 2026',
      source: 'Maharashtra Public Employment Portal and partner recruitment aggregators.',
      confidence: '89% trajectory confidence based on consecutive quarter deceleration.',
      assumptions: 'Hiring organizations will increasingly bundle clerical functions into digital productivity toolsets.',
      limitations: 'Certain state public administration contractual tenders still retain statutory typing certification requirements.',
      evidence: 'Standalone typing requirement dropped from 22% of clerical vacancies in 2024 to 6% in Q3 2026, replaced by Excel + Power BI.',
      action: 'Deprecate standalone manual typing elective in COPA; substitute with Automated Digital Office & Analytics module.',
      route: 'curriculum'
    },
    3: {
      why: 'COPA (Computer Operator & Programming Assistant) trade syllabus currently omits modern single-page frontend architectures and cloud versioning demanded in 72% of junior IT entries.',
      data: '164 software engineering and digital support vacancy notices in Pune, Thane, and Mumbai demanding React/TypeScript/Git.',
      period: 'Apr–Sep 2026',
      source: 'Tech Mahindra, TCS, Sahyadri Digital Systems, and Maharashtra IT Park Association bulletins.',
      confidence: '91% syllabus gap index verified against NSQF Level 4 competencies.',
      assumptions: 'Junior developer candidates with COPA foundation can achieve junior employability with an intensive 60-hour framework addon.',
      limitations: 'Requires vocational IT labs to maintain updated Node.js runtime and reliable broadband connectivity.',
      evidence: 'Only 28 of 45 market-demanded junior software engineering competencies are present in current 2022 COPA syllabus.',
      action: 'Convene Board of Studies for emergency addendum to pilot 60-hr React.js micro-credential across 14 model ITIs.',
      route: 'skillgap'
    },
    4: {
      why: 'Standard Electrician and Wireman curricula focus primarily on AC mains wiring, leaving commercial EV charging stations and grid-tied solar technicians without required high-voltage DC safety protocols.',
      data: '88 commercial solar installation, DC fast charger, and substation maintenance vacancy postings.',
      period: 'Jun–Sep 2026',
      source: 'MSEDCL contractor bulletins, Tata Power Renewable Energy, and District Industrial Centers.',
      confidence: '87% alignment deficit score.',
      assumptions: 'High-voltage DC safety protocols comply with Central Electricity Authority (Measures Relating to Safety and Electric Supply) Regulations.',
      limitations: 'Hands-on practical training requires high-grade personal protective equipment (PPE Class 0/00) and arc-flash shields.',
      evidence: '22% competency mismatch against AIS-038 vehicle charging norms and standard ISO 6469 electrical safety codes.',
      action: 'Introduce 40-hour High Voltage DC Safety & Storage specialization certificate for graduating Electricians.',
      route: 'coursealignment'
    },
    5: {
      why: 'Sanctioned instructor cadre for advanced digital manufacturing and Industrial IoT has 37 unfilled vacancies across Pune, Nashik, and Nagpur ITI clusters.',
      data: 'Government ITI Instructor Cadre Register as of 15 Sep 2026.',
      period: 'Academic Year 2026-27 Intake Period',
      source: 'Directorate of Vocational Education & Training (DVET) Cadre Database.',
      confidence: '95% administrative registry precision.',
      assumptions: 'Guest instructors and industry fellows can be contracted under the State Skill Development Mission emergency hiring window.',
      limitations: 'Industry practitioners in Pune/Mumbai command competitive honorariums above standard vocational adjunct caps.',
      evidence: '249 active certified trainers vs 286 sanctioned positions; 14 specialized mechatronics labs operating with provisional staff.',
      action: 'Issue expedited contractual empannelment and schedule statewide Training of Trainers (ToT) masterclass.',
      route: 'trainers'
    },
    6: {
      why: 'EV diagnostic benches, oscilloscope kits, and CAN-bus telemetry analyzers are severely under-provisioned in 14 regional ITI workshops in Western Maharashtra.',
      data: 'State Laboratory Equipment Census completed August 2026 across 86 surveyed vocational institutes.',
      period: 'August 2026 Comprehensive Lab Census',
      source: 'State Equipment Planning Committee & District Skill Committee Inspection Ledgers.',
      confidence: '92% procurement necessity index.',
      assumptions: 'GeM (Government e-Marketplace) registered OEM vendors can fulfill orders within 45 days of statutory sanction.',
      limitations: 'Requires dedicated three-phase stabilized electric supply in four rural workshop facilities.',
      evidence: '8 installed diagnostic rigs vs 14 required in Pune industrial belt; student-to-rig ratio currently at an unviable 18:1.',
      action: 'Release ₹84.5 lakh procurement allocation via GeM under State Innovation Skills Fund.',
      route: 'equipment'
    }
  };

  const seriesByPeriod: Record<string, number[]> = {
    '7D': [68, 72, 70, 76, 81, 79, 86],
    '30D': [54, 58, 61, 59, 65, 69, 72, 74, 78, 82],
    '6M': [44, 49, 53, 58, 61, 67],
    '1Y': [42, 48, 46, 55, 61, 67, 64, 72, 79, 77, 86, 92]
  };

  const districtColumns: Column<DistrictRow>[] = [
    {
      key: 'name',
      header: 'District Name',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            {row.name}
          </span>
          <span className="text-[10px] text-slate-400">
            {row.division} Division
          </span>
        </div>
      )
    },
    {
      key: 'jobs',
      header: 'Active Demand',
      align: 'right',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          <AnimatedNumber value={row.jobs} />
        </span>
      )
    },
    {
      key: 'skillGapCount',
      header: 'Skill Gaps',
      align: 'center',
      render: (row) => (
        <span className="font-bold text-amber-700 dark:text-amber-400 tabular-nums">
          <AnimatedNumber value={row.skillGapCount} />
        </span>
      )
    },
    {
      key: 'trainingNeedSeats',
      header: 'Seat Shortfall',
      align: 'right',
      render: (row) => (
        <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
          <AnimatedNumber value={`${row.trainingNeedSeats} seats`} />
        </span>
      )
    },
    {
      key: 'curriculumRisk',
      header: 'Curriculum Risk',
      align: 'center',
      render: (row) => (
        <Badge
          variant={row.curriculumRisk === 'High Risk' ? 'danger' : row.curriculumRisk === 'Medium Risk' ? 'warning' : 'success'}
          size="xs"
          dot
        >
          {row.curriculumRisk}
        </Badge>
      )
    },
    {
      key: 'trend',
      header: 'Trajectory',
      align: 'right',
      render: (row) => (
        <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums flex items-center justify-end gap-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <AnimatedNumber value={row.trend} />
        </span>
      )
    },
    {
      key: 'lastUpdated',
      header: 'Last Refresh',
      align: 'right',
      render: (row) => (
        <span className="text-slate-500 tabular-nums">
          {row.lastUpdated}
        </span>
      )
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (row) => (
        <Button
          variant="outline"
          size="xs"
          onClick={() => {
            if (row.name === 'Pune') {
              navigate('districtintel');
            } else {
              showToast(`Navigating to ${row.name} district intelligence matrix.`);
              navigate('jobintel');
            }
          }}
          rightIcon={<ArrowRight className="w-3 h-3" />}
        >
          Inspect
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & DECISION SUPPORT CONTEXT */}
      <PageHeader
        title="Skill & Labour Market Intelligence"
        description="Maharashtra State Decision Support System • Ingesting empirical labour demand to drive institutional curriculum modernization, seat allocation, and infrastructure planning."
        badge={<Badge variant="saffron" size="xs">Executive Decision Deck</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Overview' },
          { label: 'Executive Dashboard', isCurrent: true },
        ]}
        snapshotNotice="State Intelligence Snapshot: 26 Sep 2026, 18:30 IST • Coverage: 36 Districts, 1,23,456 Vacancies, 412 ITIs"
        actions={
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <div className="w-36">
              <Select
                value={selectedDistrict}
                onChange={e => handleDistrictChange(e.target.value)}
                options={['All Maharashtra', 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Chhatrapati Sambhajinagar']}
              />
            </div>

            <div className="w-40">
              <Select
                value={selectedIndustry}
                onChange={e => handleIndustryChange(e.target.value)}
                options={['All industries', 'Information Technology', 'Manufacturing', 'Automotive', 'Renewable Energy']}
              />
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              leftIcon={theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-500" />}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={togglePresentation}
              leftIcon={<Maximize2 className="w-3.5 h-3.5 text-slate-500" />}
            >
              {isPresentation ? 'Exit' : 'Present'}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={resetDemo}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-slate-500" />}
              title="Reset dashboard session"
            >
              Reset
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('resumeanalyzer')}
              leftIcon={<FileText className="w-3.5 h-3.5" />}
            >
              Resume Analyzer
            </Button>
          </div>
        }
      />

      {/* POLICY WORKFLOW LIFECYCLE STRIP */}
      <div className="bg-[#102c49] text-white rounded-lg px-4 py-2.5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            Institutional Policy Workflow:
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap text-[11px] font-medium text-slate-200">
          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">1. Data Ingestion</span>
          <span className="text-amber-400 font-bold">→</span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">2. NLP Analysis</span>
          <span className="text-amber-400 font-bold">→</span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">3. Gap Intelligence</span>
          <span className="text-amber-400 font-bold">→</span>
          <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold">4. Board Review</span>
          <span className="text-amber-400 font-bold">→</span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">5. Budget &amp; Action</span>
        </div>
      </div>

      {/* 2. COMPACT INSTITUTIONAL KPI STRIP (6 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard
          label="Active Job Demand"
          value={currentKpi.jobs}
          subtext={currentKpi.subtext}
          trend="up"
          targetRoute="jobintel"
          accent="primary"
          tooltip="Total active synthetic vacancy records ingested across 36 districts"
          loading={isFiltering}
        />
        <KpiCard
          label="Emerging Skills"
          value={currentKpi.emerging}
          subtext="EV, IoT, AI, Cloud"
          trend="up"
          targetRoute="skills"
          accent="saffron"
          tooltip="Emerging technical competencies crossing alert threshold"
          loading={isFiltering}
        />
        <KpiCard
          label="Skill Gaps"
          value={currentKpi.gaps}
          subtext="Deficit audit flags"
          trend="down"
          targetRoute="skillgap"
          accent="warning"
          tooltip="Competency mismatches between employer demand and course syllabi"
          loading={isFiltering}
        />
        <KpiCard
          label="Curriculum Risks"
          value={currentKpi.risks}
          subtext="Coverage < 70%"
          trend="down"
          targetRoute="curriculum"
          accent="danger"
          tooltip="Government ITI trades flagged for syllabus modernization"
          loading={isFiltering}
        />
        <KpiCard
          label="Training Requirements"
          value={currentKpi.seats}
          subtext="Target priority seats"
          trend="up"
          targetRoute="trainingplan"
          accent="info"
          tooltip="Recommended intake expansion for high-demand trades"
          loading={isFiltering}
        />
        <KpiCard
          label="Equipment Requirement"
          value={currentKpi.equipment}
          subtext="Lab kits & diagnostic rigs"
          trend="neutral"
          targetRoute="equipment"
          accent="primary"
          tooltip="Identified laboratory equipment shortages across 86 ITIs"
          loading={isFiltering}
        />
      </div>

      {/* 3. SECOND SECTION: MAHARASHTRA LABOUR MARKET SNAPSHOT */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Maharashtra Labour Market Snapshot</CardTitle>
            <CardDescription>
              Geographic concentration, sectoral demand volume, and regional supply/demand alignment
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="xs"
            onClick={() => navigate('labour')}
            rightIcon={<ArrowRight className="w-3 h-3" />}
          >
            Labour Intelligence Engine
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Interactive Geographic Map Component */}
          <MaharashtraRegionMap />

          {/* Analytical Charts Row: Sectoral Volume & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
            <div className="lg:col-span-7 p-3.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Statewide Vacancy Inflow Velocity
                  </h4>
                  <span className="text-[10px] text-slate-500">
                    {activePeriod} Window • Weekly Aggregated Postings Index
                  </span>
                </div>
                <Tabs
                  variant="segmented"
                  activeTab={activePeriod}
                  onChange={tab => setActivePeriod(tab as any)}
                  tabs={[
                    { id: '7D', label: '7D' },
                    { id: '30D', label: '30D' },
                    { id: '6M', label: '6M' },
                    { id: '1Y', label: '1Y' },
                  ]}
                />
              </div>

              <CanvasChart type="line" data={seriesByPeriod[activePeriod]} height={190} />

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Source: Integrated Employer Portals &amp; Public Employment Exchanges</span>
                <span className="font-mono">NORMALIZED INDEX: 0-100</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-3.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between text-xs">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Demand Share by Industrial Sector
                </h4>
                <p className="text-[11px] text-slate-500 mb-3">
                  Relative proportion of active vacancies across Maharashtra's 8 economic zones
                </p>

                <div className="space-y-2">
                  {[
                    { sector: 'Information Technology & Digital', percent: 34, count: '41,975 jobs', color: 'bg-[#102c49]' },
                    { sector: 'Automotive & Clean Mobility (EV)', percent: 24, count: '29,620 jobs', color: 'bg-[#b45309]' },
                    { sector: 'Precision & Heavy Manufacturing', percent: 18, count: '22,220 jobs', color: 'bg-[#0284c7]' },
                    { sector: 'Renewable Power & Energy Storage', percent: 14, count: '17,280 jobs', color: 'bg-[#15803d]' },
                    { sector: 'Logistics, Warehousing & Retail', percent: 10, count: '12,360 jobs', color: 'bg-[#475569]' },
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{s.sector}</span>
                        <span className="font-bold text-slate-600 dark:text-slate-400 tabular-nums">
                          <AnimatedNumber value={s.percent} suffix="%" /> (<AnimatedNumber value={s.count} />)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80 text-[10px] text-slate-400 flex justify-between">
                <span>Weighted across 2,341 verified employers</span>
                <span className="font-mono">CONFIDENCE: 92%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. THIRD SECTION: PRIORITY INTELLIGENCE (Ranked Non-Gamified List) */}
      <Card accentTop="warning">
        <CardHeader>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b45309]" />
              <CardTitle>Priority Intelligence &amp; Action Matrix</CardTitle>
            </div>
            <CardDescription>
              Ranked decision signals derived from empirical divergence between employer hiring criteria and institutional training capacity
            </CardDescription>
          </div>
          <Badge variant="neutral" size="xs">6 Priority Signals</Badge>
        </CardHeader>

        <CardContent>
          <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
            {/* Item 1: Emerging Skill */}
            <div className="py-3.5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="saffron" size="xs">1. Emerging Skill Signal</Badge>
                  <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Electric Vehicle (EV) Diagnostics &amp; High-Voltage Safety
                  </strong>
                  <Badge variant="danger" size="xs" dot>Critical Demand</Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Confidence: 94% • High Signal</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Affected Districts</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Pune, Nashik, Chhatrapati Sambhajinagar</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Empirical Evidence</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">74 vacancy notices, +28% Q3 velocity</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Institutional Impact</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Mechanic Motor Vehicle syllabus gap</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 flex-wrap">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setExpandedEvidenceId(expandedEvidenceId === 1 ? null : 1)}
                    leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  >
                    {expandedEvidenceId === 1 ? 'Hide Evidence' : 'View Evidence'}
                  </Button>
                  <Button
                    variant="saffron"
                    size="xs"
                    onClick={() => {
                      setSelectedSkillName('EV Technology');
                      navigate('skilldetail');
                    }}
                  >
                    Review EV Intelligence
                  </Button>
                </div>
              </div>

              {expandedEvidenceId === 1 && (
                <div className="pt-1">
                  <EvidencePanel 
                    evidence={priorityEvidenceMap[1]} 
                    title="Traceability Provenance: EV Diagnostics & High-Voltage Safety" 
                    defaultOpen={true} 
                  />
                </div>
              )}
            </div>

            {/* Item 2: Declining Skill */}
            <div className="py-3.5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="neutral" size="xs">2. Declining Skill Trajectory</Badge>
                  <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Manual Data Entry &amp; Analog Log Book Maintenance
                  </strong>
                  <Badge variant="warning" size="xs" dot>Obsolescence Risk</Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Confidence: 89% • Declining (-12%)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Affected Districts</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Statewide (Mumbai, Pune, Nagpur)</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Empirical Evidence</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Down 12% across clerical vacancy feeds</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Recommended Action</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Transition syllabus to Excel + Power BI</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 flex-wrap">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setExpandedEvidenceId(expandedEvidenceId === 2 ? null : 2)}
                    leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  >
                    {expandedEvidenceId === 2 ? 'Hide Evidence' : 'View Evidence'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => navigate('curriculum')}
                  >
                    Open Curriculum Action
                  </Button>
                </div>
              </div>

              {expandedEvidenceId === 2 && (
                <div className="pt-1">
                  <EvidencePanel 
                    evidence={priorityEvidenceMap[2]} 
                    title="Traceability Provenance: Manual Data Entry Trajectory Deceleration" 
                    defaultOpen={true} 
                  />
                </div>
              )}
            </div>

            {/* Item 3: Critical Skill Gap */}
            <div className="py-3.5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="danger" size="xs">3. Critical Skill Gap</Badge>
                  <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    COPA: React.js &amp; Cloud Deployment Micro-credential Deficit
                  </strong>
                  <Badge variant="danger" size="xs" dot>38% Syllabus Gap</Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Confidence: 91% • High Priority</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Affected Course</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">COPA (Trade Code: IT-01)</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Empirical Evidence</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">164 software jobs demanding React/Git</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Budget Impact</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">₹6.8 lakh statewide pilot envelope</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 flex-wrap">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setExpandedEvidenceId(expandedEvidenceId === 3 ? null : 3)}
                    leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  >
                    {expandedEvidenceId === 3 ? 'Hide Evidence' : 'View Evidence'}
                  </Button>
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={() => navigate('skillgap')}
                  >
                    Inspect Gap Matrix
                  </Button>
                </div>
              </div>

              {expandedEvidenceId === 3 && (
                <div className="pt-1">
                  <EvidencePanel 
                    evidence={priorityEvidenceMap[3]} 
                    title="Traceability Provenance: COPA Junior Software Skill Gap" 
                    defaultOpen={true} 
                  />
                </div>
              )}
            </div>

            {/* Item 4: Curriculum Mismatch */}
            <div className="py-3.5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="warning" size="xs">4. Curriculum Mismatch</Badge>
                  <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Electrical Technician: High-Voltage EV Safety &amp; Battery Isolation Protocols
                  </strong>
                  <Badge variant="warning" size="xs" dot>NCVT Review Due</Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Confidence: 87% • Moderate Signal</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Affected Trade</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Electrician / Wireman Trades</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Empirical Evidence</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">22% mismatch against AIS-038 norms</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Recommended Action</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Add 40-hr supplementary module</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 flex-wrap">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setExpandedEvidenceId(expandedEvidenceId === 4 ? null : 4)}
                    leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  >
                    {expandedEvidenceId === 4 ? 'Hide Evidence' : 'View Evidence'}
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => navigate('coursealignment')}
                  >
                    Examine Alignment
                  </Button>
                </div>
              </div>

              {expandedEvidenceId === 4 && (
                <div className="pt-1">
                  <EvidencePanel 
                    evidence={priorityEvidenceMap[4]} 
                    title="Traceability Provenance: Electrical Trade High-Voltage DC Protocols" 
                    defaultOpen={true} 
                  />
                </div>
              )}
            </div>

            {/* Item 5: Training Requirement */}
            <div className="py-3.5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="info" size="xs">5. Training Requirement</Badge>
                  <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Trainer Shortfall in Industrial IoT, SCADA &amp; CNC Programming
                  </strong>
                  <Badge variant="info" size="xs" dot>37 Certified Trainers Needed</Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Confidence: 95% • Capacity Block</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Target Institutes</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Aundh ITI, Nashik ITI, Nagpur ITI</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Available Instructors</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">249 active vs 286 sanctioned</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Action Proposal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Launch 4-week ToT workshop</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 flex-wrap">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setExpandedEvidenceId(expandedEvidenceId === 5 ? null : 5)}
                    leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  >
                    {expandedEvidenceId === 5 ? 'Hide Evidence' : 'View Evidence'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => navigate('trainers')}
                  >
                    Open Trainer Roster
                  </Button>
                </div>
              </div>

              {expandedEvidenceId === 5 && (
                <div className="pt-1">
                  <EvidencePanel 
                    evidence={priorityEvidenceMap[5]} 
                    title="Traceability Provenance: Technical Trainer Cadre Shortfall" 
                    defaultOpen={true} 
                  />
                </div>
              )}
            </div>

            {/* Item 6: Equipment Requirement */}
            <div className="py-3.5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="primary" size="xs">6. Equipment Procurement Requirement</Badge>
                  <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Procurement of 14 EV Battery Diagnostics Rigs &amp; CAN Bus Analyzer Kits
                  </strong>
                  <Badge variant="warning" size="xs" dot>Lab Capacity Gap</Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Confidence: 92% • Procurement Priority</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Current Inventory</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">8 installed vs 14 needed (Pune Hub)</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Estimated Capital Cost</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">₹84.5 lakh state allocation</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-500 uppercase text-[9px]">Procurement Route</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">GeM Portal / CSR Co-investment</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 flex-wrap">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setExpandedEvidenceId(expandedEvidenceId === 6 ? null : 6)}
                    leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                  >
                    {expandedEvidenceId === 6 ? 'Hide Evidence' : 'View Evidence'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => navigate('equipment')}
                  >
                    Review Equipment Plan
                  </Button>
                </div>
              </div>

              {expandedEvidenceId === 6 && (
                <div className="pt-1">
                  <EvidencePanel 
                    evidence={priorityEvidenceMap[6]} 
                    title="Traceability Provenance: EV Lab Diagnostic Bench Shortage" 
                    defaultOpen={true} 
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* DECISION-TO-ACTION EXECUTIVE BRIDGE */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              Direct Institutional Action Workflow:
            </span>
            <span className="text-[11px] text-slate-500">
              Transform intelligence findings into statutory administrative actions across state departments
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('curriculum')}
              leftIcon={<FileText className="w-3.5 h-3.5" />}
            >
              Recommend Curriculum Update
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('trainingplan')}
              leftIcon={<Calendar className="w-3.5 h-3.5" />}
            >
              Trigger Training Plan Review
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('budget')}
              leftIcon={<DollarSign className="w-3.5 h-3.5" />}
            >
              Assign Budget Request
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('employerportal')}
              leftIcon={<Building2 className="w-3.5 h-3.5" />}
            >
              Flag Employer Consultation
            </Button>
            <Button
              variant="primary"
              size="xs"
              onClick={() => navigate('reportscentre')}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export Official Briefing Note
            </Button>
          </div>
        </div>

        <CardFooter>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All priority intelligence signals are backed by auditable dataset rows and require authorized officer approval prior to statutory implementation.
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* 5. FOURTH SECTION: DISTRICT INTELLIGENCE COMPARISON TABLE */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>District Workforce Intelligence Matrix</CardTitle>
            <CardDescription>
              Comprehensive inter-district comparison of labour demand volume, identified competency gaps, and training seat requirements
            </CardDescription>
          </div>
          <Badge variant="neutral" size="xs">9 Priority Administrative Centres</Badge>
        </CardHeader>

        <Table<DistrictRow>
          columns={districtColumns}
          data={DISTRICT_TABLE_DATA}
          keyExtractor={row => row.name}
          emptyMessage="No district records found matching parameters."
          stickyHeader
        />

        <CardFooter>
          <span>Aggregated from district employment registrations, employer job bulletins, and NCVT institute registers</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => navigate('districtintel')}
            rightIcon={<ArrowRight className="w-3 h-3" />}
          >
            Open Pune Full Dossier
          </Button>
        </CardFooter>
      </Card>

      {/* 6. FIFTH SECTION: RECENT STATUTORY ALERTS */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Recent Statutory &amp; Operational Alerts</CardTitle>
            <CardDescription>
              Active automated threshold alerts pending administrative review and departmental triage
            </CardDescription>
          </div>
          <Button
            variant="secondary"
            size="xs"
            onClick={() => navigate('alertcentre')}
          >
            Open Alert Triage Centre
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 text-xs">
            {alerts.slice(0, 3).map(alert => {
              const isCritical = alert.severity === 'Critical';
              const isHigh = alert.severity === 'High';

              return (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded border transition-colors ${
                    isCritical
                      ? 'border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20'
                      : isHigh
                      ? 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isCritical ? 'danger' : isHigh ? 'warning' : 'info'}
                        size="xs"
                        dot
                      >
                        {alert.severity}
                      </Badge>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                        {alert.title}
                      </h4>
                    </div>
                    <Badge variant="neutral" size="xs">
                      Status: {alert.status}
                    </Badge>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-xs mb-2">
                    <strong>District:</strong> {alert.district} • <strong>Skill Term:</strong> {alert.skill} • <strong>Time Window:</strong> {alert.period}
                  </p>

                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <strong className="text-slate-500 uppercase text-[9px] block">Traceable Evidence:</strong>
                      <span>{alert.evidence}</span>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <select
                        value={alert.status}
                        onChange={e => updateAlertStatus(alert.id, e.target.value as any)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-0.5 text-[11px] cursor-pointer"
                      >
                        <option>New</option>
                        <option>Under Review</option>
                        <option>Action Required</option>
                        <option>Resolved</option>
                      </select>
                      <Button
                        variant="primary"
                        size="xs"
                        onClick={() => navigate('alertcentre')}
                      >
                        Triage Alert
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter>
          <span>Logged in accordance with Maharashtra Public Service Guarantee standards</span>
          <span className="font-mono text-[10px]">INCIDENT LEDGER: ACTIVE</span>
        </CardFooter>
      </Card>
    </div>
  );
};
