import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CanvasChart } from '../components/common/CanvasChart';
import { DISTRICTS_DATA } from '../data/mockData';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Filter, MapPin, Sparkles } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Select, FilterBar 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export const LabourMarketPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [district, setDistrict] = useState('All Maharashtra');
  const [industry, setIndustry] = useState('All industries');
  const [range, setRange] = useState('365');
  const [appliedFilters, setAppliedFilters] = useState({
    district: 'All Maharashtra',
    industry: 'All industries',
    range: '12 months'
  });

  const rangeLabels: Record<string, string> = {
    '7': '7 days',
    '30': '30 days',
    '90': '3 months',
    '180': '6 months',
    '365': '12 months',
    '730': '24 months'
  };

  const handleApply = () => {
    setAppliedFilters({
      district,
      industry,
      range: rangeLabels[range] || '12 months'
    });
    showToast(`Filters applied: ${district} • ${industry} • ${rangeLabels[range]}`);
  };

  const handleReset = () => {
    setDistrict('All Maharashtra');
    setIndustry('All industries');
    setRange('365');
    setAppliedFilters({
      district: 'All Maharashtra',
      industry: 'All industries',
      range: '12 months'
    });
    showToast('Labour market filters reset to default.');
  };

  // Seeded line data based on filters
  const seed = (district.length + industry.length + Number(range)) % 13;
  const lineData = [42, 48, 46, 55, 61, 67, 64, 72, 79, 77, 86, 92].map(
    (v, i) => v + ((i * seed) % 9) - 4
  );

  const topSkillsData = [38 + (seed % 4), 32, 29, 24, 19, 16];
  const topSkillsLabels = ['Python', 'Data Analytics', 'EV Systems', 'PLC', 'Power BI', 'AWS'];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Labour Market Intelligence Engine"
        description="Analyze synthetic workforce demand trends across Maharashtra districts, economic sectors, and emerging industrial skill competencies."
        badge={<Badge variant="primary" size="xs">Demand Analytics</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Market Intelligence' },
          { label: 'Labour Market Demand', isCurrent: true },
        ]}
      />

      {/* Filter Bar */}
      <FilterBar
        title="Market Segment & Temporal Filters"
        onApply={handleApply}
        onReset={handleReset}
      >
        <div className="w-48">
          <Select
            label="District"
            value={district}
            onChange={e => setDistrict(e.target.value)}
            options={['All Maharashtra', 'Pune', 'Mumbai', 'Nagpur', 'Nashik']}
          />
        </div>

        <div className="w-56">
          <Select
            label="Industry Sector"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            options={['All industries', 'Information Technology', 'Manufacturing', 'Automotive', 'Renewable Energy']}
          />
        </div>

        <div className="w-44">
          <Select
            label="Time Window"
            value={range}
            onChange={e => setRange(e.target.value)}
            options={[
              { value: '7', label: '7 days' },
              { value: '30', label: '30 days' },
              { value: '90', label: '3 months' },
              { value: '180', label: '6 months' },
              { value: '365', label: '12 months' },
              { value: '730', label: '24 months' },
            ]}
          />
        </div>
      </FilterBar>

      {/* Row 1: Line Trend & Emerging/Declining List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-8 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Job Postings Demand Over Time</CardTitle>
              <CardDescription>
                {appliedFilters.range} • {appliedFilters.district} • {appliedFilters.industry} • Postings Velocity Index
              </CardDescription>
            </div>
            <Badge variant="neutral" size="xs">Synthetic Sample</Badge>
          </CardHeader>

          <CardContent>
            <CanvasChart type="line" data={lineData} height={250} />
          </CardContent>

          <CardFooter>
            <span>Time-series index calculated against verified employment records</span>
            <span className="font-mono text-[10px]">INDEX SCALE: 0-100</span>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Emerging vs. Declining</CardTitle>
              <CardDescription>
                Directional skill trajectory across employer vacancy notices
              </CardDescription>
            </div>
            <Badge variant="saffron" size="xs">Trajectories</Badge>
          </CardHeader>

          <CardContent className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  Electric Vehicle Technology
                </span>
                <span className="text-[10px] text-slate-400">Automotive &amp; Transport</span>
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5 tabular-nums">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+28%</span>
              </span>
            </div>

            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  Industrial IoT
                </span>
                <span className="text-[10px] text-slate-400">Smart Manufacturing</span>
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5 tabular-nums">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+22%</span>
              </span>
            </div>

            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  Power BI Analytics
                </span>
                <span className="text-[10px] text-slate-400">Services &amp; Logistics</span>
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-0.5 tabular-nums">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+17%</span>
              </span>
            </div>

            <div className="p-2.5 rounded bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Manual data entry
                </span>
                <span className="text-[10px] text-slate-400">Clerical &amp; Operations</span>
              </div>
              <span className="text-rose-700 dark:text-rose-400 font-bold flex items-center gap-0.5 tabular-nums">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>-12%</span>
              </span>
            </div>

            <div className="p-2.5 rounded bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Legacy desktop support
                </span>
                <span className="text-[10px] text-slate-400">Generic IT support</span>
              </div>
              <span className="text-rose-700 dark:text-rose-400 font-bold flex items-center gap-0.5 tabular-nums">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>-8%</span>
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <span className="text-[11px] text-slate-400">
              Signals indicate changes in requirements frequency; human review recommended.
            </span>
          </CardFooter>
        </Card>
      </div>

      {/* Row 2: Top Skills in Selected Market & District Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-6 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Top Skills in Selected Market</CardTitle>
              <CardDescription>
                Share of synthetic job records demanding each competence
              </CardDescription>
            </div>
            <Badge variant="primary" size="xs">Prevalence</Badge>
          </CardHeader>

          <CardContent>
            <CanvasChart
              type="bar"
              data={topSkillsData}
              labels={topSkillsLabels}
              height={230}
            />
          </CardContent>

          <CardFooter>
            <span className="text-[11px] text-slate-400">
              Extracted via natural language processing of employer skill requirement sections
            </span>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-6 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>District Comparison Matrix</CardTitle>
              <CardDescription>
                Select a district below to inspect regional intelligence
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="xs"
              onClick={() => navigate('districtintel')}
            >
              Pune Deep Dive
            </Button>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {DISTRICTS_DATA.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (d.name === 'Pune') {
                      navigate('districtintel');
                    } else {
                      showToast(`District ${d.name}: ${d.jobs.toLocaleString('en-IN')} postings. Top skill: ${d.topSkill}`);
                    }
                  }}
                  className={`p-2.5 rounded border text-left transition-colors cursor-pointer ${
                    d.name === 'Pune'
                      ? 'border-[#b45309] bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100'
                  }`}
                >
                  <strong className="block text-xs text-slate-800 dark:text-slate-200">
                    {d.name}
                  </strong>
                  <span className="block text-[11px] text-slate-500 tabular-nums">
                    <AnimatedNumber value={d.jobs} /> jobs
                  </span>
                  <span className="block text-[10px] text-[#102c49] dark:text-sky-400 truncate">
                    {d.topSkill}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <span>Schematic district distribution overview</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => navigate('districtintel')}
            >
              Open Pune District Page →
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
