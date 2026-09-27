import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES_DATA, SKILL_GAPS_DATA } from '../data/mockData';
import { AlertCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Select, Table, Column 
} from '../components/ui';
import { SkillGapRow } from '../types';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export const SkillGapPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [district, setDistrict] = useState('Pune');
  const [institute, setInstitute] = useState('Aundh ITI');
  const [courseKey, setCourseKey] = useState<string>('copa');
  const [occupation, setOccupation] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [nsqfLevel, setNsqfLevel] = useState('All');

  const course = COURSES_DATA[courseKey] || COURSES_DATA.copa;
  const gaps: SkillGapRow[] = SKILL_GAPS_DATA[courseKey] || [];

  const marketCount = course.market.length;
  const coveredCount = course.covered.length;
  const alignmentPercent = Math.round((coveredCount / marketCount) * 100);

  const handleCourseChange = (key: string) => {
    setCourseKey(key);
    showToast(`Evaluating skill gap for: ${COURSES_DATA[key]?.name || key}`);
  };

  const columns: Column<SkillGapRow>[] = [
    {
      key: 'skill',
      header: 'Skill Competency',
      render: (row) => (
        <span className="font-bold text-slate-900 dark:text-slate-100 block">
          {row.skill}
        </span>
      ),
    },
    {
      key: 'demand',
      header: 'Market Demand',
      render: (row) => (
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {row.demand}
        </span>
      ),
    },
    {
      key: 'coverage',
      header: 'Current Syllabus Coverage',
      render: (row) => (
        <span className="text-slate-500">
          {row.coverage}
        </span>
      ),
    },
    {
      key: 'requiredProficiency',
      header: 'Required Proficiency',
      render: (row) => (
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {row.requiredProficiency}
        </span>
      ),
    },
    {
      key: 'gap',
      header: 'Deficit Classification',
      render: (row) => (
        <Badge
          variant={row.gap === 'Full gap' ? 'danger' : 'warning'}
          size="xs"
        >
          {row.gap}
        </Badge>
      ),
    },
    {
      key: 'learningTime',
      header: 'Est. Learning Time',
      render: (row) => (
        <span className="text-slate-600 dark:text-slate-400">
          {row.learningTime}
        </span>
      ),
    },
    {
      key: 'estimatedCost',
      header: 'Est. Delivery Cost',
      align: 'right',
      render: (row) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          {row.estimatedCost}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Review Priority',
      align: 'right',
      render: (row) => (
        <Badge
          variant={row.priority === 'High' ? 'danger' : 'warning'}
          size="xs"
          dot
        >
          {row.priority}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Skill Gap & Competency Deficit Matrix"
        description="Compare centralized ITI trade curricula and vocational syllabus coverage against empirical market requirements extracted from employer vacancy notices."
        badge={<Badge variant="warning" size="xs">Deficit Audit</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Market Intelligence' },
          { label: 'Skill Gap Analysis', isCurrent: true },
        ]}
      />

      {/* Filter Row */}
      <Card>
        <CardContent className="p-3.5 sm:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <Select
                label="District"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                options={['Pune', 'Mumbai', 'Nagpur']}
              />
            </div>

            <div>
              <Select
                label="Institute"
                value={institute}
                onChange={e => setInstitute(e.target.value)}
                options={['Aundh ITI', 'Pimpri ITI', 'All institutes']}
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <Select
                label="Course / Trade"
                value={courseKey}
                onChange={e => handleCourseChange(e.target.value)}
                options={[
                  { value: 'copa', label: 'Computer Operator & Programming Assistant (COPA)' },
                  { value: 'electrical', label: 'Electrical Technician' },
                  { value: 'iot', label: 'IoT Technician' },
                ]}
              />
            </div>

            <div>
              <Select
                label="Skill Filter"
                value={skillFilter}
                onChange={e => setSkillFilter(e.target.value)}
                options={['All skills', 'React.js', 'Python', 'AWS Basics']}
              />
            </div>

            <div>
              <Select
                label="NSQF Level"
                value={nsqfLevel}
                onChange={e => setNsqfLevel(e.target.value)}
                options={['All levels', 'Suggested Level 3', 'Suggested Level 4']}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Market Competencies Demanded
          </span>
          <strong className="block text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
            <AnimatedNumber value={marketCount} />
          </strong>
          <span className="text-xs text-slate-500 mt-1">Identified across active vacancy notices</span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Course-Covered Competencies
          </span>
          <strong className="block text-2xl lg:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
            <AnimatedNumber value={coveredCount} />
          </strong>
          <span className="text-xs text-slate-500 mt-1">Syllabus modules currently approved</span>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Functional Alignment Index
          </span>
          <strong className={`block text-2xl lg:text-3xl font-extrabold tabular-nums ${
            alignmentPercent < 70 ? 'text-[#b45309] dark:text-amber-400' : 'text-emerald-600'
          }`}>
            <AnimatedNumber value={`${alignmentPercent}%`} />
          </strong>
          <span className="text-xs text-slate-500 mt-1">Calculated coverage proportion</span>
        </Card>
      </div>

      {/* Alignment Progress Meter */}
      <Card>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                {course.name}
              </h3>
              <p className="text-xs text-slate-500">
                Functional Alignment = covered market-demand competencies ({coveredCount}) ÷ market-demand competencies ({marketCount})
              </p>
            </div>
            <strong className={`text-2xl font-extrabold tabular-nums ${
              alignmentPercent < 70 ? 'text-[#b45309] dark:text-amber-400' : 'text-emerald-600'
            }`}>
              <AnimatedNumber value={`${alignmentPercent}%`} />
            </strong>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                alignmentPercent < 70 ? 'bg-[#b45309]' : 'bg-emerald-600'
              }`}
              style={{ width: `${alignmentPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Missing Skills Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Identified Skill Competency Deficits</CardTitle>
            <CardDescription>
              Required by current employer job descriptions but absent or insufficiently covered in standard NCVT syllabus
            </CardDescription>
          </div>
          <Badge variant="danger" size="xs">
            {gaps.length} Gaps Flagged
          </Badge>
        </CardHeader>

        <Table<SkillGapRow>
          columns={columns}
          data={gaps}
          keyExtractor={row => row.skill}
          emptyMessage="No skill gaps detected for the selected trade parameters."
        />

        <CardFooter>
          <span>
            Gap classification follows Directorate General of Training (DGT) review guidelines
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('curriculum')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Review Curriculum Enrichment Proposals
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
