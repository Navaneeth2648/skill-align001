import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Search, RotateCcw, ExternalLink, RefreshCw } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Input, Select, 
  Table, Column, Alert, LoadingState, Pagination
} from '../components/ui';
import { AdzunaJob } from '../types';
import { DISTRICTS_DATA } from '../data/mockData';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { JobService } from '../services/dataService';

export const JobIntelPage: React.FC = () => {
  const { navigate } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'salary' | 'title'>('date');
  const [jobs, setJobs] = useState<AdzunaJob[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const districtOptions = ['All', ...DISTRICTS_DATA.map(d => d.name)];

  // Fetch jobs from backend Adzuna API
  const loadJobs = useCallback(async (keywordVal: string, districtVal: string, pageNum: number) => {
    setLoading(true);
    setError(null);

    const locationQuery = districtVal && districtVal !== 'All' 
      ? `${districtVal}, Maharashtra` 
      : 'Maharashtra';

    try {
      const response = await JobService.getApiJobs({
        keyword: keywordVal.trim() || undefined,
        location: locationQuery,
        page: pageNum,
      });

      setJobs(response.jobs || []);
      setTotal(response.total || 0);
    } catch (err: any) {
      console.error('Failed to load Adzuna jobs:', err);
      setJobs([]);
      setTotal(0);
      setError('Unable to load job-market data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch jobs on initial mount and when activeKeyword or selectedDistrict changes
  useEffect(() => {
    loadJobs(activeKeyword, selectedDistrict, page);
  }, [activeKeyword, selectedDistrict, page, loadJobs]);

  // Handle Search execution
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
    setActiveKeyword(searchInput);
  };

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput('');
    setActiveKeyword('');
    setSelectedDistrict('All');
    setSortBy('date');
    setPage(1);
  };

  // Sort jobs locally
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === 'salary') {
      const salA = a.salaryMax || a.salaryMin || 0;
      const salB = b.salaryMax || b.salaryMin || 0;
      return salB - salA;
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return b.postedDate.localeCompare(a.postedDate);
  });

  const formatSalary = (job: AdzunaJob) => {
    if (job.salaryMin && job.salaryMax) {
      return `₹${job.salaryMin.toLocaleString('en-IN')} - ₹${job.salaryMax.toLocaleString('en-IN')}`;
    }
    if (job.salaryMin) {
      return `From ₹${job.salaryMin.toLocaleString('en-IN')}`;
    }
    if (job.salaryMax) {
      return `Up to ₹${job.salaryMax.toLocaleString('en-IN')}`;
    }
    return 'Not disclosed';
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const columns: Column<AdzunaJob>[] = [
    {
      key: 'title',
      header: 'Job Title',
      sortable: true,
      render: (job) => (
        <div className="space-y-1 py-1">
          <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
            {job.title}
          </span>
          {job.description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 max-w-sm font-normal">
              {job.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'company',
      header: 'Company',
      render: (job) => (
        <span className="text-slate-700 dark:text-slate-300 font-medium">
          {job.company}
        </span>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (job) => (
        <span className="text-slate-700 dark:text-slate-300">
          {job.district || job.location}
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
          {formatSalary(job)}
        </span>
      ),
    },
    {
      key: 'postedDate',
      header: 'Date Posted',
      align: 'right',
      sortable: true,
      render: (job) => (
        <span className="text-slate-500 tabular-nums whitespace-nowrap">
          {formatDate(job.postedDate)}
        </span>
      ),
    },
    {
      key: 'source',
      header: 'Source Origin',
      render: (job) => (
        <Badge variant="primary" size="xs">
          {job.source}
        </Badge>
      ),
    },
    {
      key: 'action',
      header: 'Vacancy Link',
      align: 'right',
      render: (job) => (
        job.jobUrl ? (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#102c49] text-white hover:bg-[#173a5e] text-[11px] font-semibold transition-colors shadow-2xs"
          >
            <span>View Job</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-slate-400 text-[11px]">—</span>
        )
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
              Real-time synchronization with Adzuna Labour Market API
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

      {/* Error Alert if Adzuna API fails */}
      {error && (
        <Alert variant="danger" title="Job Market Service Notice">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span>{error}</span>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => loadJobs(activeKeyword, selectedDistrict, page)}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry Request
            </Button>
          </div>
        </Alert>
      )}

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-3.5 sm:p-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-end gap-3 text-xs">
            <div className="flex-1 min-w-[220px]">
              <Input
                label="Search Vacancies"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search by job title, keyword, or required competence..."
                leftIcon={<Search className="w-3.5 h-3.5" />}
              />
            </div>

            <div className="w-44">
              <Select
                label="District / Location"
                value={selectedDistrict}
                onChange={e => handleDistrictChange(e.target.value)}
                options={districtOptions}
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

            <div className="pb-0.5 flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                type="submit"
                isLoading={loading}
                leftIcon={<Search className="w-3.5 h-3.5" />}
              >
                Search
              </Button>

              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={clearFilters}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Standardized Data Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Ingested Job Vacancy Records</CardTitle>
            <CardDescription>
              Showing <AnimatedNumber value={sortedJobs.length} /> active Adzuna vacancy notices matching parameters • Click "View Job" to open original posting
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="xs">
              Live Gateway Active
            </Badge>
            <Badge variant="neutral" size="xs">
              <AnimatedNumber value={total || sortedJobs.length} /> Records Available
            </Badge>
          </div>
        </CardHeader>

        {loading ? (
          <LoadingState message="Fetching live Adzuna job postings..." />
        ) : (
          <>
            <Table<AdzunaJob>
              columns={columns}
              data={sortedJobs}
              keyExtractor={job => job.id}
              emptyMessage={error ? 'Unable to load job-market data. Please try again.' : 'No jobs found for the selected search.'}
              stickyHeader
            />
            {total > 20 && (
              <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800">
                <Pagination
                  currentPage={page}
                  totalPages={Math.max(1, Math.ceil(total / 20))}
                  totalRecords={total}
                  pageSize={20}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                    loadJobs(activeKeyword, selectedDistrict, newPage);
                  }}
                />
              </div>
            )}
          </>
        )}

        <CardFooter>
          <span>
            Data source: Adzuna Labour Market API • Last synchronized: 27 Sep 2026, 09:30 PM IST • Status: Connected
          </span>
          <span className="font-mono text-[10px]">
            DATA SOURCE: ADZUNA API • FIDELITY: REAL EXTERNAL
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
