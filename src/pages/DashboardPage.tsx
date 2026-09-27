import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { CanvasChart } from '../components/common/CanvasChart';
import { EvidencePanel } from '../components/common/EvidencePanel';
import { DISTRICTS_DATA } from '../data/mockData';
import { 
  AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, 
  MapPin, SlidersHorizontal, Sun, Moon, Maximize2, RotateCcw
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    navigate, 
    theme, 
    toggleTheme, 
    isPresentation, 
    togglePresentation, 
    resetDemo, 
    showToast 
  } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState('All Maharashtra');
  const [selectedIndustry, setSelectedIndustry] = useState('All industries');
  const [activePeriod, setActivePeriod] = useState<'7D' | '30D' | '6M' | '1Y'>('1Y');
  const [activeDistrictDetail, setActiveDistrictDetail] = useState<string | null>(null);

  const seriesByPeriod: Record<string, number[]> = {
    '7D': [68, 72, 70, 76, 81, 79, 86],
    '30D': [54, 58, 61, 59, 65, 69, 72, 74, 78, 82],
    '6M': [44, 49, 53, 58, 61, 67],
    '1Y': [42, 48, 46, 55, 61, 67, 64, 72, 79, 77, 86, 92]
  };

  const handleDistrictClick = (name: string) => {
    if (name === 'Pune') {
      navigate('districtintel');
    } else {
      const match = DISTRICTS_DATA.find(d => d.name === name);
      if (match) {
        setActiveDistrictDetail(`${name} • ${match.jobs.toLocaleString('en-IN')} synthetic jobs • Top skill: ${match.topSkill}`);
        showToast(`Selected district: ${name}. Detailed drilldown available for Pune.`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight">
              Maharashtra Workforce Intelligence Overview
            </h1>
            <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
              DEMO MODE
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            State Labour Market Intelligence • Decision-support snapshot • Last updated: 26 September 2026, 18:30 IST
          </p>
        </div>

        {/* Dashboard Toolbar */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <select
            value={selectedDistrict}
            onChange={e => {
              setSelectedDistrict(e.target.value);
              showToast(`Filtered dashboard view for: ${e.target.value}`);
            }}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-700 dark:text-slate-200"
          >
            <option>All Maharashtra</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Nagpur</option>
            <option>Nashik</option>
          </select>

          <select
            value={selectedIndustry}
            onChange={e => {
              setSelectedIndustry(e.target.value);
              showToast(`Filtered dashboard industry: ${e.target.value}`);
            }}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-700 dark:text-slate-200"
          >
            <option>All industries</option>
            <option>Information Technology</option>
            <option>Manufacturing</option>
            <option>Automotive</option>
            <option>Renewable Energy</option>
          </select>

          <button
            type="button"
            onClick={toggleTheme}
            className="px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-500" />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          <button
            type="button"
            onClick={togglePresentation}
            className="px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{isPresentation ? 'Exit Full' : 'Presentation'}</span>
          </button>

          <button
            type="button"
            onClick={resetDemo}
            className="px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
            title="Reset demonstration filters and session changes"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 6 Key KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard
          label="Jobs Analysed"
          value="1,23,456"
          subtext="+8.4% vs prior period"
          targetRoute="jobintel"
          borderTopColor="border-t-[#173a5e]"
        />
        <KpiCard
          label="Active Employers"
          value="2,341"
          subtext="Across 36 districts"
          targetRoute="employerportal"
          borderTopColor="border-t-[#267653]"
        />
        <KpiCard
          label="Skill Gaps"
          value="2,418"
          subtext="12.6% review signal"
          targetRoute="skillgap"
          borderTopColor="border-t-amber-500"
        />
        <KpiCard
          label="Training Programs"
          value="847"
          subtext="74% median alignment"
          targetRoute="coursealignment"
          borderTopColor="border-t-indigo-600"
        />
        <KpiCard
          label="Enrolled Students"
          value="28,640"
          subtext="Current demo cohorts"
          targetRoute="studentportal"
          borderTopColor="border-t-purple-600"
        />
        <KpiCard
          label="Training Institutes"
          value="412"
          subtext="Capacity snapshot"
          targetRoute="institutes"
          borderTopColor="border-t-sky-600"
        />
      </div>

      {/* Main Grid: Districts & Emerging Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Comparison Grid */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Maharashtra District Intelligence Grid
              </h2>
              <p className="text-xs text-slate-500">
                Schematic regional signal view • Select any district to preview demand (Pune for deep drill-down)
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">36 Districts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {DISTRICTS_DATA.map((d, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDistrictClick(d.name)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  d.name === 'Pune'
                    ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/30 hover:bg-amber-100/60'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {d.name}
                  </strong>
                  {d.name === 'Pune' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-white">
                      Drill-down
                    </span>
                  )}
                </div>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {d.jobs.toLocaleString('en-IN')} jobs
                </span>
                <span className="block text-[10px] font-semibold text-sky-700 dark:text-sky-400 truncate mt-0.5">
                  Top: {d.topSkill}
                </span>
              </button>
            ))}
          </div>

          {activeDistrictDetail && (
            <div className="p-3 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 rounded-lg text-xs text-sky-900 dark:text-sky-200 flex items-center justify-between">
              <span>{activeDistrictDetail}</span>
              <button
                type="button"
                onClick={() => navigate('districtintel')}
                className="font-bold underline ml-2 shrink-0"
              >
                Open Pune Full Analysis
              </button>
            </div>
          )}
        </div>

        {/* Emerging Skill Alerts with Evidence */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Emerging Skill Signals</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Evidence review required before curriculum or capacity action
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('alertcentre')}
                className="text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="p-3 rounded-lg border-l-4 border-l-amber-500 bg-amber-50/60 dark:bg-amber-950/40 border border-slate-200 dark:border-slate-800">
                <strong className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                  Electric Vehicle Systems · Pune
                </strong>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Increasing demand signal across 74 automotive job records. Review lab equipment.
                </p>
                <EvidencePanel
                  title="Traceability: EV Diagnostics"
                  evidence={{
                    why: 'Automotive vacancy records co-mention EV systems and diagnostics.',
                    data: '74 synthetic automotive job records from Pune district.',
                    period: 'Jul–Sep 2026',
                    source: 'Employer Demand Feed — Demo',
                    confidence: 'High signal; illustrative threshold',
                    assumptions: 'Skill mentions reflect demand worth review.',
                    limitations: 'Synthetic, non-representative sample.',
                    evidence: 'EV Diagnostics alert ALT-104.',
                    action: 'Review trainer and equipment capacity.',
                    route: 'alertcentre'
                  }}
                />
              </div>

              {/* Alert 2 */}
              <div className="p-3 rounded-lg border-l-4 border-l-sky-500 bg-sky-50/60 dark:bg-sky-950/40 border border-slate-200 dark:border-slate-800">
                <strong className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                  Industrial IoT · Nashik
                </strong>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Skills mention frequency crossed demonstration alert threshold in manufacturing.
                </p>
                <EvidencePanel
                  title="Traceability: Industrial IoT"
                  evidence={{
                    why: 'Industrial IoT mentions crossed the demo alert threshold.',
                    data: 'Synthetic job descriptions and district skill index.',
                    period: 'Apr–Sep 2026',
                    source: 'Job Market Signal Corpus — Demo',
                    confidence: 'Moderate demo confidence',
                    assumptions: 'Co-mentions reflect emerging demand.',
                    limitations: 'No live vacancy feed or employer verification.',
                    evidence: 'Nashik district trend signal.',
                    action: 'Validate the signal with employers and institutes.',
                    route: 'skills'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
            Automated notifications generated by deterministic rules • No unreviewed automated commitments.
          </div>
        </div>
      </div>

      {/* Second Row: Labour Demand Trend & Course Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Labour Demand Trend */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Labour Demand Postings Trend
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {activePeriod} Period • Synthetic Maharashtra Postings Index
              </span>
            </div>

            {/* Period selector tabs */}
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs">
              {(['7D', '30D', '6M', '1Y'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePeriod(p)}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activePeriod === p
                      ? 'bg-white dark:bg-slate-700 text-[#173a5e] dark:text-sky-300 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <CanvasChart
            type="line"
            data={seriesByPeriod[activePeriod]}
            height={250}
          />
        </div>

        {/* Course Alignment Metrics */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Course Alignment Index
              </h2>
              <p className="text-xs text-slate-500">
                Coverage of current market-demand skill competencies
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 dark:text-slate-200">
                    Computer Operator &amp; Programming Assistant (COPA)
                  </span>
                  <span className="text-amber-600 dark:text-amber-400">62% (Gap Review Signal)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 dark:text-slate-200">
                    Electrical Technician
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">81% Alignment</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '81%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800 dark:text-slate-200">
                    IoT Technician
                  </span>
                  <span className="text-sky-600 dark:text-sky-400">74% Alignment</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '74%' }} />
                </div>
              </div>
            </div>

            {/* Human review safeguard notice */}
            <div className="mt-5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Human Review Principle</strong>
                <span>
                  Rule-based analysis identifies gaps and prepares proposals. Curriculum and policy decisions require formal authorized review.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('coursealignment')}
              className="text-xs font-semibold text-[#173a5e] dark:text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Inspect All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Centre Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Action Centre
            </h2>
            <p className="text-xs text-slate-500">
              Prioritised administrative follow-ups grounded in the current demonstration snapshot
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('alertcentre')}
            className="text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded hover:bg-slate-50"
          >
            Open All Alerts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 flex flex-col justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold text-[10px] mb-2 uppercase">
                Critical
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Priority Alerts</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1 mb-3">
                <strong>EV diagnostics capacity · Pune</strong><br />
                Trainer and equipment coverage below the demonstrated demand threshold.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('alertcentre')}
              className="w-full py-1.5 bg-[#173a5e] text-white rounded font-medium text-xs hover:bg-[#102c49]"
            >
              Review Alert Evidence
            </button>
          </div>

          <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/30 flex flex-col justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px] mb-2 uppercase">
                Pending Review
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Curriculum Review</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1 mb-3">
                <strong>COPA enrichment proposal</strong><br />
                Technical review is currently in progress; employer advisory review is queued.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('curriculum')}
              className="w-full py-1.5 bg-[#173a5e] text-white rounded font-medium text-xs hover:bg-[#102c49]"
            >
              Open Approval Workflow
            </button>
          </div>

          <div className="p-4 rounded-lg border border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/30 flex flex-col justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 font-bold text-[10px] mb-2 uppercase">
                Recommendation
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Review Training Capacity</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1 mb-3">
                <strong>Industrial IoT · Nashik</strong><br />
                Suggested action: validate institute trainer roster and assess equipment procurement.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('equipment')}
              className="w-full py-1.5 bg-[#173a5e] text-white rounded font-medium text-xs hover:bg-[#102c49]"
            >
              Inspect Equipment Plan
            </button>
          </div>
        </div>

        {/* Footnote Disclosures */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <span><strong>Method:</strong> Calculated from the fixed synthetic demonstration dataset.</span>
          <span><strong>Limitation:</strong> Not representative of the full informal labour market.</span>
          <span><strong>Decision status:</strong> Authorized human review required for consequential actions.</span>
        </div>
      </section>
    </div>
  );
};
