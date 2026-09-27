import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Download, ShieldAlert, CheckSquare, ArrowRight } from 'lucide-react';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Input, Select, Table, Column, Alert 
} from '../components/ui';

interface PlanRow {
  course: string;
  seats: number;
  trainers: string;
  equipment: string;
  cost: string;
  priority: string;
  timeline: string;
}

export const TrainingPlanPage: React.FC = () => {
  const { showToast, navigate } = useApp();
  const [district, setDistrict] = useState('Pune');
  const [period, setPeriod] = useState('Oct 2026–Mar 2027');
  const [budget, setBudget] = useState(180);
  const [occupations, setOccupations] = useState<string[]>([
    'EV Service Technician',
    'Industrial IoT Technician'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<PlanRow[] | null>(() => [
    {
      course: 'EV Diagnostics & Safety',
      seats: 360,
      trainers: '12 trainers',
      equipment: '6 diagnostic rigs',
      cost: '₹34.6 lakh',
      priority: 'High',
      timeline: 'Oct–Dec 2026'
    },
    {
      course: 'Industrial IoT Practice',
      seats: 280,
      trainers: '9 trainers',
      equipment: '12 Arduino kits; 4 PLC trainers',
      cost: '₹31.4 lakh',
      priority: 'High',
      timeline: 'Nov 2026–Feb 2027'
    }
  ]);

  const templates: Record<string, [string, number, number, string, string, string]> = {
    'EV Service Technician': ['EV Diagnostics & Safety', 360, 12, '6 diagnostic rigs', 'High', 'Oct–Dec 2026'],
    'Industrial IoT Technician': ['Industrial IoT Practice', 280, 9, '12 Arduino kits; 4 PLC trainers', 'High', 'Nov 2026–Feb 2027'],
    'Frontend Application Developer': ['Advanced Web Applications', 320, 11, '2 upgraded computer labs', 'Medium', 'Jan–Mar 2027'],
    'Solar Installation Supervisor': ['Solar PV Installation', 240, 8, '5 rooftop practice sets', 'Medium', 'Dec 2026–Mar 2027']
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!occupations.length) {
      showToast('Select at least one target occupation.');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const perOcc = Math.round((budget / occupations.length) * 10) / 10;
      const rows: PlanRow[] = occupations.map((occ, i) => {
        const t = templates[occ];
        const cost = Math.min(perOcc, Math.round((t[1] * 0.045 + t[2] * 1.2 + (i + 1) * 4) * 10) / 10);
        return {
          course: t[0],
          seats: t[1],
          trainers: `${t[2]} trainers`,
          equipment: t[3],
          cost: `₹${cost.toFixed(1)} lakh`,
          priority: t[4],
          timeline: t[5]
        };
      });

      setGeneratedPlan(rows);
      setIsGenerating(false);
      showToast(`District training plan generated for ${district} (${period}).`);
    }, 280);
  };

  const handleToggleOcc = (val: string) => {
    setOccupations(prev => 
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  const planColumns: Column<PlanRow>[] = [
    {
      key: 'course',
      header: 'Course / Trade Module',
      render: (r) => (
        <span className="font-bold text-slate-900 dark:text-slate-100 block">
          {r.course}
        </span>
      )
    },
    {
      key: 'seats',
      header: 'Target Intake',
      align: 'right',
      render: (r) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          <AnimatedNumber value={`${r.seats} seats`} loading={isGenerating} />
        </span>
      )
    },
    {
      key: 'trainers',
      header: 'Trainers Required',
      render: (r) => (
        <span className="text-slate-700 dark:text-slate-300">
          {r.trainers}
        </span>
      )
    },
    {
      key: 'equipment',
      header: 'Lab Equipment Requirement',
      render: (r) => (
        <span className="text-slate-600 dark:text-slate-400">
          {r.equipment}
        </span>
      )
    },
    {
      key: 'cost',
      header: 'Budget Est.',
      align: 'right',
      render: (r) => (
        <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
          <AnimatedNumber value={r.cost} loading={isGenerating} />
        </span>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      align: 'center',
      render: (r) => (
        <Badge
          variant={r.priority === 'High' ? 'danger' : 'warning'}
          size="xs"
        >
          {r.priority}
        </Badge>
      )
    },
    {
      key: 'timeline',
      header: 'Deployment Window',
      align: 'right',
      render: (r) => (
        <span className="text-slate-500 tabular-nums whitespace-nowrap">
          {r.timeline}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="District Training Plan Generator"
        description="Translate district demand signals into reviewable training-capacity proposals for government officers and institutional heads."
        badge={<Badge variant="primary" size="xs">Workforce Planning</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Curriculum & Training' },
          { label: 'Training Plans', isCurrent: true },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Input Parameters Form */}
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Plan Scenario Parameters</CardTitle>
            </CardHeader>
            <form onSubmit={handleGenerate}>
              <CardContent className="space-y-3.5 text-xs">
                <div>
                  <Select
                    label="Target District *"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    options={['Pune', 'Nashik', 'Nagpur', 'Kolhapur', 'Chhatrapati Sambhajinagar']}
                  />
                </div>

                <div>
                  <Select
                    label="Implementation Window *"
                    value={period}
                    onChange={e => setPeriod(e.target.value)}
                    options={[
                      { value: 'Oct 2026–Mar 2027', label: 'Oct 2026–Mar 2027 (H2 Plan)' },
                      { value: 'Apr 2027–Sep 2027', label: 'Apr 2027–Sep 2027 (H1 Plan)' },
                      { value: 'FY 2027–28', label: 'Full Year FY 2027–28' }
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Indicative Budget Envelope: ₹{budget} Lakh
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full accent-[#102c49] dark:accent-sky-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>₹50L</span>
                    <span>₹250L</span>
                    <span>₹500L</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Target Priority Occupations *
                  </label>
                  <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-200 dark:border-slate-800">
                    {[
                      'EV Service Technician',
                      'Industrial IoT Technician',
                      'Frontend Application Developer',
                      'Solar Installation Supervisor'
                    ].map((occ, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={occupations.includes(occ)}
                          onChange={() => handleToggleOcc(occ)}
                          className="rounded border-slate-300 text-[#102c49] focus:ring-amber-500"
                        />
                        <span className="font-medium text-xs">{occ}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Alert
                  variant="info"
                  title="Scenario Advisory"
                >
                  Proposals are rule-derived based on district vacancy ratios and do not constitute authorized procurement orders.
                </Alert>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  fullWidth
                >
                  Generate Plan Scenario
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Plan Output Presentation */}
        <div className="lg:col-span-8 space-y-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Synthesized District Workforce Plan</CardTitle>
                <CardDescription>
                  {district} District • {period} • Budget Cap: ₹{budget} lakh
                </CardDescription>
              </div>
              <Badge variant="neutral" size="xs">
                {generatedPlan ? `${generatedPlan.length} Trades Included` : 'Pending Generation'}
              </Badge>
            </CardHeader>

            <CardContent>
              {generatedPlan ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Target Seats</span>
                      <strong className="text-xl font-extrabold text-[#102c49] dark:text-sky-300 tabular-nums">
                        <AnimatedNumber value={generatedPlan.reduce((acc, curr) => acc + curr.seats, 0)} loading={isGenerating} />
                      </strong>
                    </div>
                    <div className="p-3 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Trainer Headcount</span>
                      <strong className="text-xl font-extrabold text-slate-800 dark:text-slate-200 tabular-nums">
                        <AnimatedNumber value={`${generatedPlan.reduce((acc, curr) => acc + parseInt(curr.trainers, 10), 0)} instructors`} loading={isGenerating} />
                      </strong>
                    </div>
                    <div className="p-3 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Cost Estimate</span>
                      <strong className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                        <AnimatedNumber value={`₹${generatedPlan.reduce((acc, curr) => acc + parseFloat(curr.cost.replace(/[^0-9.]/g, '')), 0).toFixed(1)} L`} loading={isGenerating} />
                      </strong>
                    </div>
                  </div>

                  <Table<PlanRow>
                    columns={planColumns}
                    data={generatedPlan}
                    keyExtractor={r => r.course}
                  />
                </div>
              ) : (
                <div className="p-10 text-center text-slate-400 space-y-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                  <Calendar className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    No district training plan currently generated
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Configure your parameters in the left panel and click "Generate Plan Scenario".
                  </p>
                </div>
              )}
            </CardContent>

            {generatedPlan && (
              <CardFooter className="justify-between">
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => {
                    showToast('Exporting district training plan dossier in CSV/PDF format.');
                  }}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  Export Plan Dossier
                </Button>

                <Button
                  variant="primary"
                  size="xs"
                  onClick={() => navigate('budget')}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Proceed to Budget Allocation
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
