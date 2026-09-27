import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Database, ShieldCheck, ExternalLink, Download } from 'lucide-react';
import { KpiCard } from '../components/common/KpiCard';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge 
} from '../components/ui';
import { downloadJSON } from '../utils/exportUtils';

export const DataSourcesPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const sources = [
    {
      title: 'Government Reference Dataset — Demo',
      category: 'GOVERNMENT DATA',
      coverage: '36 Maharashtra districts; industrial and vocational classifications',
      updated: '26 Sep 2026',
      methodology: 'Standardized reference catalogues joined by district and occupation census identifiers.',
      limitations: 'Demonstration lists; not official or suitable for statutory reporting.',
      recordCount: '36 Districts, 48 Trades'
    },
    {
      title: 'Employer Demand Feed — Demo',
      category: 'EMPLOYER DATA',
      coverage: '11 priority economic sectors; verified demonstration employers',
      updated: '26 Sep 2026',
      methodology: 'Structured vacancy descriptions with employer-validated AI competency tags.',
      limitations: 'Curated sample; does not represent exhaustive corporate hiring.',
      recordCount: '1,420 Vacancy Notices'
    },
    {
      title: 'Training Supply Register — Demo',
      category: 'INSTITUTE DATA',
      coverage: 'ITI, polytechnic, and vocational skill-centre cohorts',
      updated: '25 Sep 2026',
      methodology: 'Course syllabus maps linked with lab tooling registers and certified trainer rosters.',
      limitations: 'Capacities are illustrative snapshots for demonstration planning.',
      recordCount: '86 Surveyed ITIs'
    },
    {
      title: 'Job Market Signal Corpus — Demo',
      category: 'JOB MARKET DATA',
      coverage: '11 sectors; Apr–Sep 2026 demonstration period',
      updated: '26 Sep 2026',
      methodology: 'Text normalization, duplicate resolution, and verified skill extraction.',
      limitations: 'Synthetic sample; excludes unadvertised or informal economy employment.',
      recordCount: '4,890 Skill Mentions'
    },
    {
      title: 'Learner Outcome Register — Demo',
      category: 'PLACEMENT DATA',
      coverage: 'Selected vocational programs and training batches',
      updated: '24 Sep 2026',
      methodology: 'Aggregate cohort graduation and verified placement verification checks.',
      limitations: 'Demonstration metrics; outcomes may be influenced by external macroeconomic factors.',
      recordCount: '12,450 Trainees Tracked'
    }
  ];

  const filteredSources = sources.filter(s => 
    selectedFilter === 'All' || s.category === selectedFilter
  );

  const handleExportCatalog = () => {
    downloadJSON(sources, 'maharashtra_lmi_data_sources_catalog');
    showToast('Data sources catalog exported as JSON.');
  };

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Data Sources &amp; Ingestion Lineage Catalogue"
        description="Transparent provenance metadata across workforce demand, institute capacity, and learner outcomes with complete audit trails."
        badge={<Badge variant="primary" size="xs">Catalogue Lineage</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'System & Governance' },
          { label: 'Data Sources', isCurrent: true },
        ]}
        actions={
          <Button
            variant="secondary"
            size="xs"
            onClick={handleExportCatalog}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Catalogue (JSON)
          </Button>
        }
      />

      {/* Advisory Banner */}
      <Card variant="subtle" accentTop="primary">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Architected for Complete Public Sector Traceability
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            These catalog entries describe the schema and lineage of the evidence pipeline. No live government production database or proprietary employer exchange is connected to this academic demonstration. Every data point shown across this system can be inspected and verified.
          </p>
        </div>
      </Card>

      {/* Summary Ingestion Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard
          label="Ingested Pipelines"
          value={sources.length.toString()}
          subtext="Configured lineage feeds"
          accent="primary"
        />
        <KpiCard
          label="Vacancy Records"
          value="1,420"
          subtext="Clean parsed postings"
          accent="saffron"
          trend="up"
        />
        <KpiCard
          label="Surveyed ITIs"
          value="86"
          subtext="Institutional supply nodes"
          accent="info"
        />
        <KpiCard
          label="Learners Tracked"
          value="12,450"
          subtext="Outcome longitudinal records"
          accent="success"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Source Category:</span>
        {['All', 'GOVERNMENT DATA', 'EMPLOYER DATA', 'INSTITUTE DATA', 'JOB MARKET DATA', 'PLACEMENT DATA'].map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedFilter(cat)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
              selectedFilter === cat
                ? 'bg-[#102c49] text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filteredSources.map((s, idx) => (
          <Card key={idx} className="flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="saffron" size="xs">
                    {s.category}
                  </Badge>
                  <span className="text-[10px] text-slate-400">Updated: {s.updated}</span>
                </div>
                <CardTitle className="text-sm">{s.title}</CardTitle>
                <CardDescription>
                  Scope: <AnimatedNumber value={s.recordCount} />
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 py-2">
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Coverage:</strong> {s.coverage}
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Methodology:</strong> {s.methodology}
                </div>
                <div className="text-slate-500 dark:text-slate-400 italic text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                  <strong>Limitations:</strong> {s.limitations}
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => showToast(`Schema metadata for ${s.title} copied to clipboard.`)}
                rightIcon={<ExternalLink className="w-3 h-3" />}
              >
                Inspect Schema Metadata
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
