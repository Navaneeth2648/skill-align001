import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, RotateCcw, ArrowUpDown, ChevronRight, Briefcase } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Input, Select, 
  Table, Column 
} from '../components/ui';
import { JobRecord } from '../types';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export const JobIntelPage: React.FC = () => {
  const { jobs, setSelectedJobId, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'salary' | 'title'>('date');

  const industries = ['All', ...Array.from(new Set(jobs.map(j => j.industry)))];
  const districts = ['All', ...Array.from(new Set(jobs.map(j => j.district)))];

  const filteredJobs = jobs.filter(j => {
    const q = search.toLowerCase();
    const matchesSearch = !q || [j.title, j.employer, j.skills.join(' ')].join(' ').toLowerCase().includes(q);
    const matchesIndustry = selectedIndustry === 'All' || j.industry === selectedIndustry;
    const matchesDistrict = selectedDistrict === 'All' || j.district === selectedDistrict;
    return matchesSearch && matchesIndustry && matchesDistrict;
  });

  filteredJobs.sort((a, b) => {
    if (sortBy === 'salary') return b.salary - a.salary;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return b.posted.localeCompare(a.posted);
  });

  const handleRowClick = (job: JobRecord) => {
    setSelectedJobId(job.id);
    navigate('jobdetail');
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedIndustry('All');
    setSelectedDistrict('All');
    setSortBy('date');
  };

  const columns: Column<JobRecord>[] = [
    {
      key: 'title',
      header: 'Job Title',
      sortable: true,
      render: (job) => (
        <span className="font-bold text-slate-900 dark:text-slate-100 block">
          {job.title}
        </span>
      ),
    },
    {
      key: 'employer',
      header: 'Employer',
      render: (job) => (
        <span className="text-slate-700 dark:text-slate-300 font-medium">
          {job.employer}
        </span>
      ),
    },
    {
      key: 'industry',
      header: 'Industry Sector',
      render: (job) => (
        <span className="text-slate-600 dark:text-slate-400">
          {job.industry}
        </span>
      ),
    },
    {
      key: 'district',
      header: 'District',
      render: (job) => (
        <span className="text-slate-700 dark:text-slate-300">
          {job.district}
        </span>
      ),
    },
    {
      key: 'skills',
      header: 'Extracted Skills',
      render: (job) => (
        <div className="flex flex-wrap gap-1 max-w-[220px]">
          {job.skills.map((s, idx) => (
            <Badge key={idx} variant="default" size="xs">
              {s}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'experience',
      header: 'Experience',
      render: (job) => (
        <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">
          {job.experience}
        </span>
      ),
    },
    {
      key: 'salary',
      header: 'Indicative Remuneration',
      align: 'right',
      sortable: true,
      render: (job) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums whitespace-nowrap">
          {job.salaryText}
        </span>
      ),
    },
    {
      key: 'posted',
      header: 'Date Posted',
      align: 'right',
      sortable: true,
      render: (job) => (
        <span className="text-slate-500 tabular-nums whitespace-nowrap">
          {job.posted.split('-').reverse().join(' ')}
        </span>
      ),
    },
    {
      key: 'source',
      header: 'Source Origin',
      render: (job) => (
        <span className="text-slate-500 whitespace-nowrap">
          {job.source}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Verification',
      align: 'right',
      render: (job) => (
        <Badge
          variant={job.status === 'Validated' ? 'success' : 'warning'}
          size="xs"
          dot
        >
          {job.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Job Vacancy Intelligence Engine"
        description="Search, filter, and inspect verified employer vacancies with evidence-backed AI skill extraction and human-in-the-loop review."
        badge={<Badge variant="primary" size="xs">Ingestion Registry</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Market Intelligence' },
          { label: 'Job Vacancy Engine', isCurrent: true },
        ]}
      />

      {/* 8-Node Ingestion & Processing Pipeline Flow */}
      <Card variant="subtle">
        <div className="px-4 py-3 overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Automated Ingestion &amp; Processing Pipeline
            </span>
            <span className="text-[10px] text-slate-400">
              Deterministic parsing with NLP extractors
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-[720px]">
            {[
              'Raw Vacancy Feeds', 'Text Sanitization', 'De-duplication', 'Skill Extraction', 
              'Experience Parser', 'Salary Normalizer', 'NSQF Occupation Mapping', 'Analytics Index'
            ].map((stage, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="px-2.5 py-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 text-center shrink-0 shadow-2xs">
                  {stage}
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-[#b45309] font-bold shrink-0">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Card>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-3.5 sm:p-4">
          <div className="flex flex-wrap items-end gap-3 text-xs">
            <div className="flex-1 min-w-[220px]">
              <Input
                label="Search Vacancies"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by job title, employer, or required competence..."
                leftIcon={<Search className="w-3.5 h-3.5" />}
              />
            </div>

            <div className="w-48">
              <Select
                label="Industry Sector"
                value={selectedIndustry}
                onChange={e => setSelectedIndustry(e.target.value)}
                options={industries}
              />
            </div>

            <div className="w-40">
              <Select
                label="District"
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                options={districts}
              />
            </div>

            <div className="w-44">
              <Select
                label="Sort By"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                options={[
                  { value: 'date', label: 'Newest Posted' },
                  { value: 'salary', label: 'Salary: High to Low' },
                  { value: 'title', label: 'Job Title (A-Z)' },
                ]}
              />
            </div>

            <div className="pb-0.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={clearFilters}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standardized Data Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Ingested Job Vacancy Records</CardTitle>
            <CardDescription>
              Showing <AnimatedNumber value={filteredJobs.length} /> active vacancy notices matching parameters • Click any row to review AI extraction provenance
            </CardDescription>
          </div>
          <Badge variant="neutral" size="xs">
            <AnimatedNumber value={filteredJobs.length} /> Records
          </Badge>
        </CardHeader>

        <Table<JobRecord>
          columns={columns}
          data={filteredJobs}
          keyExtractor={job => job.id}
          onRowClick={handleRowClick}
          emptyMessage="No job vacancy records match the selected search query and filters."
          stickyHeader
        />

        <CardFooter>
          <span>
            Records validated against Maharashtra Industrial Development Corporation (MIDC) employer registers
          </span>
          <span className="font-mono text-[10px]">
            DATA FIDELITY: VERIFIED
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
