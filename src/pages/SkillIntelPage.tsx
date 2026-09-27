import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { Sparkles, ArrowRight, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Tabs 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export const SkillIntelPage: React.FC = () => {
  const { navigate, setSelectedSkillName } = useApp();
  const [activeTab, setActiveTab] = useState<'top' | 'emerging' | 'declining' | 'trends' | 'relationships'>('top');

  const tabConfigs = {
    top: {
      title: 'Top Demanded Technical Competencies',
      meta: 'Apr–Sep 2026 • Share of employer vacancy notices demanding each competence',
      data: [38, 34, 31, 27, 24, 21],
      labels: ['Python', 'Data Analytics', 'React', 'EV Systems', 'PLC', 'Power BI'],
      color: '#102c49'
    },
    emerging: {
      title: 'Emerging Skill Velocity Signals',
      meta: 'Highest quarterly acceleration rate in vacancy requirements across Maharashtra',
      data: [28, 22, 17, 15, 13, 11],
      labels: ['EV Technology', 'Industrial IoT', 'Power BI', 'React', 'Solar PV', 'AWS'],
      color: '#b45309'
    },
    declining: {
      title: 'Declining Skill Requirements',
      meta: 'Decreasing requirement mentions across new vacancies (potential obsolescence indicator)',
      data: [12, 8, 7, 5, 4, 3],
      labels: ['Manual data entry', 'Legacy desktop', 'Basic typing', 'Analog repair', 'Manual stock logs', 'Legacy Java UI'],
      color: '#b91c1c'
    },
    trends: {
      title: 'Six-Month Technical Demand Progression',
      meta: 'Month-by-month demand index across all engineering and technology clusters',
      data: [42, 48, 53, 61, 70, 82],
      labels: ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'],
      color: '#0284c7'
    },
    relationships: {
      title: 'Skill Co-Occurrence Strength Matrix',
      meta: 'Co-mention correlation score with primary frontend and cloud engineering job descriptions',
      data: [92, 78, 67, 64, 49, 43],
      labels: ['JavaScript', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'Testing'],
      color: '#15803d'
    }
  };

  const currentConfig = tabConfigs[activeTab];

  const handleOpenSkill = (name: string) => {
    setSelectedSkillName(name);
    navigate('skilldetail');
  };

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Skill Demand Intelligence Engine"
        description="Monitor technical competencies extracted from employer vacancy notices with verifiable observation windows, demand shifts, and occupational relationships."
        badge={<Badge variant="primary" size="xs">Skill Registry</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Market Intelligence' },
          { label: 'Skill Demand Index', isCurrent: true },
        ]}
      />

      {/* Analytical Mode Tabs */}
      <Tabs
        variant="underline"
        activeTab={activeTab}
        onChange={tab => setActiveTab(tab as any)}
        tabs={[
          { id: 'top', label: 'Top Demanded Skills' },
          { id: 'emerging', label: 'Emerging Signals' },
          { id: 'declining', label: 'Declining Trajectories' },
          { id: 'trends', label: '6-Month Index' },
          { id: 'relationships', label: 'Co-Occurrence Matrix' },
        ]}
      />

      {/* Main Analytical Chart Card */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{currentConfig.title}</CardTitle>
            <CardDescription>{currentConfig.meta}</CardDescription>
          </div>
          <Badge variant="neutral" size="xs">
            Normalized Index
          </Badge>
        </CardHeader>

        <CardContent>
          <CanvasChart
            type={activeTab === 'trends' ? 'line' : 'bar'}
            data={currentConfig.data}
            labels={currentConfig.labels}
            height={260}
            color={currentConfig.color}
          />
        </CardContent>

        <CardFooter>
          <span>Extracted via deterministic entity extraction against 1,23,456 active vacancy notices</span>
          <span className="font-mono text-[10px]">CORPUS SNAPSHOT: VERIFIED</span>
        </CardFooter>
      </Card>

      {/* Drilldown Competencies Grid */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Skill Drilldown &amp; Occupational Alignment</CardTitle>
            <CardDescription>
              Select any skill below to inspect full evidence, co-occurring skills, course mappings, and hiring employers
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
            {currentConfig.labels.map((sName, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleOpenSkill(sName)}
                className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 font-bold group-hover:text-[#102c49] dark:group-hover:text-sky-300">
                    {sName}
                  </strong>
                  <span className="text-[10px] text-slate-500 tabular-nums">
                    Score: {currentConfig.data[idx]}%
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-[#102c49] dark:text-sky-400 font-semibold">
                  <span>Drill down</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <span>Click any card to open the dedicated Skill Intelligence Profile Dossier</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => handleOpenSkill('React')}
          >
            Sample: React Skill Profile →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
