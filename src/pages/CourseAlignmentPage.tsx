import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES_DATA } from '../data/mockData';
import { BookOpen, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Input, Select, Table, Column 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

interface CourseAlignmentRow {
  key: string;
  name: string;
  institutes: number;
  students: number;
  placement: string;
  review: string;
  alignment: number;
  missingCount: number;
  marketLength: number;
  coveredLength: number;
}

export const CourseAlignmentPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [alignmentFilter, setAlignmentFilter] = useState<'all' | 'below70' | '70plus'>('all');

  const courseList: CourseAlignmentRow[] = Object.entries(COURSES_DATA).map(([key, c]) => {
    const alignment = Math.round((c.covered.length / c.market.length) * 100);
    const missingCount = c.market.length - c.covered.length;
    return {
      key,
      name: c.name,
      institutes: c.institutes,
      students: c.students,
      placement: c.placement,
      review: c.review,
      alignment,
      missingCount,
      marketLength: c.market.length,
      coveredLength: c.covered.length
    };
  });

  const filtered = courseList.filter(c => {
    const matchesSearch = !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAlignment = 
      alignmentFilter === 'all' || 
      (alignmentFilter === 'below70' && c.alignment < 70) ||
      (alignmentFilter === '70plus' && c.alignment >= 70);
    return matchesSearch && matchesAlignment;
  });

  const columns: Column<CourseAlignmentRow>[] = [
    {
      key: 'name',
      header: 'Course / Trade Name',
      sortable: true,
      render: (c) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            {c.name}
          </span>
          <span className="text-[10px] text-slate-400">
            NCVT Standard Vocational Trade
          </span>
        </div>
      )
    },
    {
      key: 'institutes',
      header: 'Institutes Offering',
      align: 'right',
      render: (c) => (
        <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
          {c.institutes} ITIs
        </span>
      )
    },
    {
      key: 'students',
      header: 'Enrolled Cohort',
      align: 'right',
      render: (c) => (
        <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
          {c.students.toLocaleString('en-IN')} trainees
        </span>
      )
    },
    {
      key: 'alignment',
      header: 'Market Alignment',
      align: 'center',
      sortable: true,
      render: (c) => (
        <div className="flex flex-col items-center gap-1">
          <Badge
            variant={c.alignment < 70 ? 'warning' : 'success'}
            size="xs"
            dot
          >
            {c.alignment}% Aligned
          </Badge>
          <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full ${c.alignment < 70 ? 'bg-[#b45309]' : 'bg-emerald-600'}`}
              style={{ width: `${c.alignment}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'missingCount',
      header: 'Competency Deficits',
      align: 'center',
      render: (c) => (
        <span className={`font-bold tabular-nums ${c.missingCount > 10 ? 'text-[#b45309]' : 'text-slate-700 dark:text-slate-300'}`}>
          {c.missingCount} competencies
        </span>
      )
    },
    {
      key: 'placement',
      header: 'Placement Rate',
      align: 'right',
      render: (c) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          {c.placement}
        </span>
      )
    },
    {
      key: 'review',
      header: 'Last Syllabus Review',
      align: 'right',
      render: (c) => (
        <span className="text-slate-500 tabular-nums whitespace-nowrap">
          {c.review}
        </span>
      )
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (c) => (
        <Button
          variant="outline"
          size="xs"
          onClick={() => {
            showToast(`Inspecting syllabus gaps for: ${c.name}`);
            navigate('skillgap');
          }}
          rightIcon={<ArrowRight className="w-3 h-3" />}
        >
          Evaluate
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Course &amp; Curriculum Alignment Dashboard"
        description="Objective curriculum coverage and outcomes metrics comparing approved trade syllabi with empirical labour market requirements; no automated punitive evaluations."
        badge={<Badge variant="primary" size="xs">Curriculum Analytics</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Curriculum & Training' },
          { label: 'Course Alignment', isCurrent: true },
        ]}
      />

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-3.5 sm:p-4">
          <div className="flex flex-wrap items-end gap-3 text-xs">
            <div className="flex-1 min-w-[220px]">
              <Input
                label="Search Vocational Courses"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by trade name (e.g. COPA, Electrician, IoT)..."
                leftIcon={<Search className="w-3.5 h-3.5" />}
              />
            </div>

            <div className="w-64">
              <Select
                label="Alignment Threshold Filter"
                value={alignmentFilter}
                onChange={e => setAlignmentFilter(e.target.value as any)}
                options={[
                  { value: 'all', label: 'All Alignment Ranges' },
                  { value: 'below70', label: 'Below 70% (Modernization Recommended)' },
                  { value: '70plus', label: '70% and Above (Adequately Aligned)' },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standardized Course Alignment Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Approved Technical &amp; Vocational Training Trades</CardTitle>
            <CardDescription>
              Showing <AnimatedNumber value={filtered.length} /> evaluated vocational programs across Maharashtra ITIs
            </CardDescription>
          </div>
          <Badge variant="neutral" size="xs">
            <AnimatedNumber value={filtered.length} /> Programs
          </Badge>
        </CardHeader>

        <Table<CourseAlignmentRow>
          columns={columns}
          data={filtered}
          keyExtractor={c => c.key}
          emptyMessage="No vocational courses match the selected search query or alignment criteria."
          stickyHeader
        />

        <CardFooter>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All alignment percentages represent verifiable intersections between current syllabus modules and employer job requirements.
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
