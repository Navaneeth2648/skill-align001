import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REPORT_TYPES_DATA } from '../data/mockData';
import { CanvasChart } from '../components/common/CanvasChart';
import { KpiCard } from '../components/common/KpiCard';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { FileBarChart, Download, Sparkles, Filter, FileText, CheckCircle2 } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Select, Input 
} from '../components/ui';

export const ReportsCentrePage: React.FC = () => {
  const { showToast, navigate } = useApp();
  const [district, setDistrict] = useState('All Maharashtra');
  const [course, setCourse] = useState('All courses');
  const [skill, setSkill] = useState('All skills');
  const [industry, setIndustry] = useState('All industries');
  const [date, setDate] = useState('2026-09');

  // Natural language reporting state
  const [nlQuery, setNlQuery] = useState('Show the top declining skills in Pune during the last six months');
  const [nlResult, setNlResult] = useState<{
    district: string;
    measure: string;
    period: string;
    chartData: number[];
    labels: string[];
    tableRows: [string, string, string][];
  } | null>(null);

  const [activeReportState, setActiveReportState] = useState<Record<number, string>>({});

  const handleReportAction = (action: 'View' | 'Generate', index: number) => {
    const r = REPORT_TYPES_DATA[index];
    const statusText = `${action} preview prepared for ${r[0]} using ${district} • ${course} • ${skill}.`;
    setActiveReportState(prev => ({ ...prev, [index]: statusText }));
    showToast(statusText);
  };

  const handleExportFile = (index: number, format: 'csv' | 'json') => {
    const report = REPORT_TYPES_DATA[index];
    const payload = {
      title: report[0],
      category: report[1],
      description: report[2],
      generated: '26 September 2026, 18:30 IST',
      status: 'Prototype demonstration output',
      source: 'Synthetic demonstration dataset',
      filters: { district, course, skill, industry, date }
    };

    let text = JSON.stringify(payload, null, 2);
    let type = 'application/json';
    let ext = 'json';

    if (format === 'csv') {
      const rows = [
        ['Field', 'Value'],
        ['Title', payload.title],
        ['Category', payload.category],
        ['Description', payload.description],
        ['Generated', payload.generated],
        ['Status', payload.status],
        ['Source', payload.source],
        ['District', payload.filters.district],
        ['Course', payload.filters.course],
        ['Skill', payload.filters.skill]
      ];
      text = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
      type = 'text/csv';
      ext = 'csv';
    }

    const blob = new Blob([text], { type: `${type};charset=utf-8` });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${report[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}-demo.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 500);

    showToast(`${format.toUpperCase()} report file generated and downloaded.`);
  };

  const handleGenerateNL = () => {
    if (!nlQuery.trim()) {
      showToast('Enter a report request.');
      return;
    }

    const lower = nlQuery.toLowerCase();
    const d = lower.includes('pune') ? 'Pune' : 'All Maharashtra';
    const p = lower.includes('six') || lower.includes('6') ? 'Last six months' : 'Selected period';
    const m = lower.includes('declin') ? 'Declining skills' : 'Skill trends';

    setNlResult({
      district: d,
      measure: m,
      period: p,
      chartData: [12, 8, 7, 5],
      labels: ['Manual data entry', 'Legacy desktop', 'Basic typing', 'Analog logs'],
      tableRows: [
        ['Manual data entry', '−12%', '1,140 demo mentions'],
        ['Legacy desktop support', '−8%', '760 demo mentions'],
        ['Basic typing only', '−7%', '640 demo mentions'],
        ['Analog repair logs', '−5%', '410 demo mentions']
      ]
    });

    showToast('Natural language synthesis complete.');
  };

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Reports &amp; Analytical Dossier Centre"
        description="Generate, inspect, and export formal statistical gazettes across statewide vacancies, skill gaps, and vocational institute capacity."
        badge={<Badge variant="primary" size="xs">Export Centre</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Workforce Planning' },
          { label: 'Reports & Gazettes', isCurrent: true },
        ]}
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard
          label="Analytical Gazettes"
          value={REPORT_TYPES_DATA.length.toString()}
          subtext="Standardized templates"
          accent="primary"
        />
        <KpiCard
          label="Vacancies Analyzed"
          value="1,23,456"
          subtext="Statewide empirical corpus"
          accent="saffron"
          trend="up"
        />
        <KpiCard
          label="District Coverage"
          value="36 / 36"
          subtext="100% administrative zones"
          accent="success"
        />
        <KpiCard
          label="Export Formats"
          value="4 Types"
          subtext="PDF, CSV, JSON, XLS"
          accent="info"
        />
      </div>

      {/* Global Filter Bar */}
      <Card>
        <CardContent className="p-3.5 sm:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div>
              <Select
                label="District"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                options={['All Maharashtra', 'Pune', 'Nashik', 'Nagpur']}
              />
            </div>

            <div>
              <Select
                label="Course / Trade"
                value={course}
                onChange={e => setCourse(e.target.value)}
                options={['All courses', 'COPA', 'Electrical Technician', 'IoT Technician']}
              />
            </div>

            <div>
              <Select
                label="Skill Focus"
                value={skill}
                onChange={e => setSkill(e.target.value)}
                options={['All skills', 'React.js', 'EV Diagnostics', 'Industrial IoT']}
              />
            </div>

            <div>
              <Select
                label="Industry Sector"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                options={['All industries', 'IT', 'Automotive', 'Manufacturing']}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Evaluation Period
              </label>
              <input
                type="month"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded py-1.5 px-3 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 8-Report Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
        {REPORT_TYPES_DATA.map((r, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  {r[1]} • STANDARD
                </span>
                <CardTitle className="text-sm">
                  {r[0]}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="py-2 flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {r[2]}
              </p>
            </CardContent>

            <CardFooter className="flex-col items-stretch space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-1.5">
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => handleReportAction('View', i)}
                >
                  View Cut
                </Button>
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => handleReportAction('Generate', i)}
                >
                  Generate
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleExportFile(i, 'csv')}
                  leftIcon={<Download className="w-3 h-3 text-emerald-600" />}
                >
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleExportFile(i, 'json')}
                  leftIcon={<Download className="w-3 h-3 text-sky-600" />}
                >
                  JSON
                </Button>
              </div>

              {activeReportState[i] && (
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[10px] text-amber-900 dark:text-amber-200">
                  {activeReportState[i]}
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Natural Language Reporting Box */}
      <Card accentTop="primary">
        <CardHeader>
          <div>
            <CardTitle>
              <Sparkles className="w-4 h-4 text-[#b45309]" />
              <span>Natural Language Query Synthesis</span>
            </CardTitle>
            <CardDescription>
              Ask analytical questions in plain language to construct filtered data cuts and visualizations
            </CardDescription>
          </div>
          <Badge variant="saffron" size="xs">Semantic Parser</Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={nlQuery}
              onChange={e => setNlQuery(e.target.value)}
              placeholder="e.g. Show the top declining skills in Pune during the last six months"
              className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleGenerateNL}
            >
              Synthesize Cut
            </Button>
          </div>

          {nlResult && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" size="sm">
                  District: {nlResult.district}
                </Badge>
                <Badge variant="default" size="sm">
                  Measure: {nlResult.measure}
                </Badge>
                <Badge variant="default" size="sm">
                  Window: {nlResult.period}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Synthesized Chart</h4>
                  <CanvasChart
                    type="bar"
                    data={nlResult.chartData}
                    labels={nlResult.labels}
                    height={180}
                    color="#b42318"
                  />
                </div>

                <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Analytical Findings</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    The rule-based interpreter parsed district, declining competence indicator, and a 6-month evaluation period. In synthetic postings, manual data entry shows the largest reduction signal (-12%). Does not prove obsolescence; verify with local ITIs before curriculum reductions.
                  </p>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Source: Synthetic job postings corpus • Apr–Sep 2026.
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                      <th className="p-2.5">Competency Term</th>
                      <th className="p-2.5">Trajectory Delta</th>
                      <th className="p-2.5">Record Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {nlResult.tableRows.map((r, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">{r[0]}</td>
                        <td className="p-2.5 font-semibold text-rose-600 tabular-nums">
                          <AnimatedNumber value={r[1]} />
                        </td>
                        <td className="p-2.5 text-slate-500">
                          <AnimatedNumber value={r[2]} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <span>All reports are generated with immutable verification checksums</span>
          <span className="font-mono text-[10px]">FORMATS: CSV, JSON, PRINT</span>
        </CardFooter>
      </Card>
    </div>
  );
};
