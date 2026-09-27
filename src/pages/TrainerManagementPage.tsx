import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRAINERS_DATA } from '../data/mockData';
import { TrainerRecord } from '../types';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { KpiCard } from '../components/common/KpiCard';
import { Users, Search, Award, CheckCircle, Clock, BookOpen, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Tabs, Table, Column, 
  Input, Select, FilterBar, Alert 
} from '../components/ui';

interface TrainerGapItem {
  skill: string;
  currentSkill: string;
  gapDepth: string;
  recommendedCourse: string;
  duration: string;
  cost: string;
}

const TRAINER_GAPS: TrainerGapItem[] = [
  { skill: 'React · Advanced', currentSkill: 'React · Intermediate (67%)', gapDepth: '1 level gap', recommendedCourse: 'React Advanced for Trainers', duration: '4 weeks', cost: '₹12,000' },
  { skill: 'AWS · Intermediate', currentSkill: 'AWS · Beginner (42%)', gapDepth: '1 level gap', recommendedCourse: 'Cloud Lab Practice', duration: '3 weeks', cost: '₹9,500' },
  { skill: 'Node.js · Intermediate', currentSkill: 'Not evidenced', gapDepth: 'Full gap', recommendedCourse: 'Server-side JavaScript', duration: '6 weeks', cost: '₹16,000' },
];

export const TrainerManagementPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'directory' | 'profile' | 'gaps'>('directory');
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerRecord>(TRAINERS_DATA[0]);

  // Directory filters
  const [search, setSearch] = useState('');
  const [institute, setInstitute] = useState('All institutes');
  const [skill, setSkill] = useState('All skills');
  const [cert, setCert] = useState('All statuses');
  const [sort, setSort] = useState<'name' | 'experience' | 'training'>('name');

  const filteredTrainers = TRAINERS_DATA.filter(t => {
    const q = search.toLowerCase();
    const matchesSearch = !q || [t.name, t.institute, t.skills.join(' ')].join(' ').toLowerCase().includes(q);
    const matchesInst = institute === 'All institutes' || t.institute === institute;
    const matchesSkill = skill === 'All skills' || t.skills.includes(skill);
    const matchesCert = cert === 'All statuses' || t.cert === cert;
    return matchesSearch && matchesInst && matchesSkill && matchesCert;
  });

  filteredTrainers.sort((a, b) => {
    if (sort === 'experience') return b.experience - a.experience;
    if (sort === 'training') return b.last.localeCompare(a.last);
    return a.name.localeCompare(b.name);
  });

  const handleOpenTrainer = (t: TrainerRecord) => {
    setSelectedTrainer(t);
    setActiveTab('profile');
    showToast(`Viewing profile of ${t.name}`);
  };

  const trainerColumns: Column<TrainerRecord>[] = [
    {
      key: 'name',
      header: 'Trainer Faculty',
      sortable: true,
      render: (t) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            {t.name}
          </span>
          <span className="text-[10px] text-slate-400">
            {t.qualification}
          </span>
        </div>
      )
    },
    {
      key: 'institute',
      header: 'Assigned Institute',
      sortable: true,
      render: (t) => (
        <span className="text-slate-700 dark:text-slate-300">
          {t.institute}
        </span>
      )
    },
    {
      key: 'skills',
      header: 'Primary Competencies',
      render: (t) => (
        <div className="flex flex-wrap gap-1">
          {t.skills.map((s, i) => (
            <Badge key={i} variant="neutral" size="xs">
              {s}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: 'experience',
      header: 'Experience',
      align: 'right',
      sortable: true,
      render: (t) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          <AnimatedNumber value={`${t.experience} yrs`} />
        </span>
      )
    },
    {
      key: 'cert',
      header: 'Certification',
      align: 'center',
      render: (t) => (
        <Badge
          variant={t.cert === 'Current' ? 'success' : t.cert === 'Renewal due' ? 'warning' : 'danger'}
          size="xs"
          dot
        >
          {t.cert}
        </Badge>
      )
    },
    {
      key: 'last',
      header: 'Last ToT Workshop',
      align: 'right',
      render: (t) => (
        <span className="text-slate-500 tabular-nums">
          {t.last.split('-').reverse().join(' ')}
        </span>
      )
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: (t) => (
        <Button
          variant="outline"
          size="xs"
          onClick={() => handleOpenTrainer(t)}
          rightIcon={<ArrowRight className="w-3 h-3" />}
        >
          Dossier
        </Button>
      )
    }
  ];

  const gapColumns: Column<TrainerGapItem>[] = [
    {
      key: 'skill',
      header: 'Required Target Skill',
      render: (g) => <span className="font-bold text-slate-900 dark:text-slate-100">{g.skill}</span>
    },
    {
      key: 'currentSkill',
      header: 'Current Demonstrated Level',
      render: (g) => <span className="text-slate-600 dark:text-slate-400">{g.currentSkill}</span>
    },
    {
      key: 'gapDepth',
      header: 'Gap Depth',
      align: 'center',
      render: (g) => (
        <Badge
          variant={g.gapDepth === 'Full gap' ? 'danger' : 'warning'}
          size="xs"
          dot
        >
          {g.gapDepth}
        </Badge>
      )
    },
    {
      key: 'recommendedCourse',
      header: 'Recommended ToT Module',
      render: (g) => <span className="font-semibold text-slate-800 dark:text-slate-200">{g.recommendedCourse}</span>
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (g) => <span className="text-slate-500 tabular-nums">{g.duration}</span>
    },
    {
      key: 'cost',
      header: 'Estimated Cost',
      align: 'right',
      render: (g) => <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums"><AnimatedNumber value={g.cost} /></span>
    }
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Trainer Capability &amp; Faculty Development Hub"
        description="Statewide faculty register, certified competencies, industrial immersion records, and prioritized Training of Trainers (ToT) pipelines."
        badge={<Badge variant="primary" size="xs">Faculty Cadre</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Curriculum & Training' },
          { label: 'Trainer Management', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => navigate('trainingplan')}
            >
              Training Plans →
            </Button>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => navigate('equipment')}
            >
              Equipment Planning →
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
          { id: 'directory', label: 'Faculty Directory & Roster' },
          { id: 'profile', label: `Profile: ${selectedTrainer.name}` },
          { id: 'gaps', label: 'Faculty Skill Gap Analysis' },
        ]}
      />

      {/* SUBVIEW 1: DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <KpiCard
              label="Faculty Registered"
              value={TRAINERS_DATA.length.toString()}
              subtext="State vocational roster"
              accent="primary"
            />
            <KpiCard
              label="Certified Active"
              value={TRAINERS_DATA.filter(t => t.cert === 'Current').length.toString()}
              subtext="Compliant with ToT norms"
              accent="success"
              trend="up"
            />
            <KpiCard
              label="Filtered Faculty"
              value={filteredTrainers.length.toString()}
              subtext="Matching criteria"
              accent="info"
            />
            <KpiCard
              label="Mean Experience"
              value="11.4 yrs"
              subtext="Instructional depth"
              accent="warning"
            />
          </div>

          <Card>
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <Input
              label="Search Roster"
              placeholder="Name, skill, or institute..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />

            <Select
              label="Institute"
              value={institute}
              onChange={e => setInstitute(e.target.value)}
              options={['All institutes', 'Aundh ITI', 'Pimpri ITI', 'Govt. Polytechnic Pune']}
            />

            <Select
              label="Specialized Skill"
              value={skill}
              onChange={e => setSkill(e.target.value)}
              options={['All skills', 'React', 'Python', 'Industrial IoT', 'EV Diagnostics']}
            />

            <Select
              label="Certification Status"
              value={cert}
              onChange={e => setCert(e.target.value)}
              options={['All statuses', 'Current', 'Renewal due', 'Development needed']}
            />

            <Select
              label="Sort Order"
              value={sort}
              onChange={e => setSort(e.target.value as any)}
              options={[
                { value: 'name', label: 'Name (A-Z)' },
                { value: 'experience', label: 'Experience (Years)' },
                { value: 'training', label: 'Last Training Date' },
              ]}
            />
          </div>

          <Table<TrainerRecord>
            columns={trainerColumns}
            data={filteredTrainers}
            keyExtractor={t => t.id}
            stickyHeader
          />

          <CardFooter>
            <span>Showing <AnimatedNumber value={filteredTrainers.length} /> of <AnimatedNumber value={TRAINERS_DATA.length} /> certified instructors</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => showToast('Exporting instructor roster as CSV.')}
            >
              Export Roster Ledger
            </Button>
          </CardFooter>
        </Card>
      </div>
      )}

      {/* SUBVIEW 2: TRAINER PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-5">
          <Card accentTop="primary">
            <CardHeader>
              <div>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  FACULTY DOSSIER • REGISTERED INSTRUCTOR
                </span>
                <CardTitle>{selectedTrainer.name}</CardTitle>
                <CardDescription>
                  {selectedTrainer.institute} • {selectedTrainer.qualification} • {selectedTrainer.experience} years teaching experience • 2 years industry exposure
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setActiveTab('directory')}
                  leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                >
                  Back to Roster
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  onClick={() => setActiveTab('gaps')}
                >
                  View Skill Gaps
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Skills & Proficiency */}
                <div className="p-4 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                    Demonstrated Proficiency Benchmarks
                  </h4>
                  <div className="space-y-3 text-xs">
                    {selectedTrainer.levels.map(([sub, score], i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                          <span>{sub}</span>
                          <span className="tabular-nums">{score}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full bg-[#102c49] rounded-full" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications & Next Schedule */}
                <div className="p-4 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2.5 text-xs">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                    Certifications &amp; Training Schedule
                  </h4>
                  <div className="divide-y divide-slate-200 dark:divide-slate-700/60">
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-500">Active Certifications:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-right">Web Development Educator; AWS Cloud Foundations</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-500">Last Completed Program:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">18 Aug 2026</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-500">Next Scheduled Training:</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">12 Oct 2026 · React Advanced</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-500">Industry Immersion Host:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Sahyadri Digital Systems (Frontend Delivery)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* History, Badges & Immersion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">Training History</h5>
                  <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                    <div className="border-l-2 border-amber-500 pl-2">
                      <strong>Cloud Foundations</strong>
                      <div>18 Aug 2026 · 24 hours</div>
                    </div>
                    <div className="border-l-2 border-slate-300 pl-2">
                      <strong>Accessible Web Interfaces</strong>
                      <div>03 May 2026 · 16 hours</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">Digital Badges</h5>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="success" size="xs">Web Educator</Badge>
                    <Badge variant="info" size="xs">Cloud Foundations</Badge>
                    <Badge variant="neutral" size="xs">Accessible UI</Badge>
                  </div>
                </div>

                <div className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">Industry Immersion</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    40-hour frontend observation completed Jun 2026. Evidence records code review and deployment practice.
                  </p>
                </div>

                <div className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">Peer Learning</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Facilitates monthly teaching-practice circle for 11 trainers across three Pune institutes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SUBVIEW 3: GAP ANALYSIS */}
      {activeTab === 'gaps' && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Faculty Competency Gap &amp; Upskilling Roadmap</CardTitle>
              <CardDescription>
                Evaluates syllabus requirements against demonstrated instructor proficiencies to prioritize upskilling scholarships
              </CardDescription>
            </div>
            <Badge variant="saffron" size="xs">
              Development Support Principle
            </Badge>
          </CardHeader>

          <Table<TrainerGapItem>
            columns={gapColumns}
            data={TRAINER_GAPS}
            keyExtractor={g => g.skill}
            stickyHeader
          />

          <CardFooter>
            <div className="space-y-0.5">
              <span>Total Sequential Time: <strong>13 weeks</strong> • Estimated Upskilling Cost: <strong>₹37,500</strong></span>
              <span className="block text-[10px] text-slate-400">Authorization: Institute Principal &amp; DVET Review Required</span>
            </div>
            <Button
              variant="primary"
              size="xs"
              onClick={() => showToast('Upskilling scholarship application submitted for Principal endorsement.')}
            >
              Submit Upskilling Sanction
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

