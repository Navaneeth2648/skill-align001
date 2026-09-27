import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Download, ShieldAlert, CheckSquare } from 'lucide-react';

export const TrainingPlanPage: React.FC = () => {
  const { showToast } = useApp();
  const [district, setDistrict] = useState('Pune');
  const [period, setPeriod] = useState('Oct 2026–Mar 2027');
  const [budget, setBudget] = useState(180);
  const [occupations, setOccupations] = useState<string[]>([
    'EV Service Technician',
    'Industrial IoT Technician'
  ]);
  const [generatedPlan, setGeneratedPlan] = useState<any[] | null>(null);

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

    const perOcc = Math.round((budget / occupations.length) * 10) / 10;
    const rows = occupations.map((occ, i) => {
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
    showToast(`District training plan generated for ${district} (${period}).`);
  };

  const handleToggleOcc = (val: string) => {
    setOccupations(prev => 
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <span>District Training Plan Generator</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Translate district demand signals into a reviewable training-capacity scenario for government officers.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          SYNTHETIC DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Form */}
        <form 
          onSubmit={handleGenerate} 
          className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4 text-xs"
        >
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            Plan Parameters
          </h2>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Target District *
            </label>
            <select
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            >
              <option>Pune</option>
              <option>Nashik</option>
              <option>Nagpur</option>
              <option>Kolhapur</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Planning Window *
            </label>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            >
              <option>Oct 2026–Mar 2027</option>
              <option>Jan–Jun 2027</option>
              <option>FY 2027–28</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2">
              Target Priority Occupations
            </label>
            <div className="space-y-2">
              {[
                'EV Service Technician',
                'Industrial IoT Technician',
                'Frontend Application Developer',
                'Solar Installation Supervisor'
              ].map((occ, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={occupations.includes(occ)}
                    onChange={() => handleToggleOcc(occ)}
                    className="rounded text-[#173a5e] focus:ring-amber-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{occ}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Available Budget Envelope
              </label>
              <span className="font-bold text-[#173a5e] dark:text-sky-300">₹{budget} lakh</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-full accent-[#173a5e]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#173a5e] text-white font-bold text-xs hover:bg-[#102c49] shadow-sm"
          >
            Generate District Plan
          </button>

          <p className="text-[10px] text-slate-400">
            Generation uses rule-based synthesis. All proposals must undergo District Officer review before authorization.
          </p>
        </form>

        {/* Output Panel */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase">GENERATED SCENARIO</span>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {district} • {period} Capacity Plan
                </h2>
              </div>

              {generatedPlan && (
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => showToast('Prototype PDF export requested. File generation simulated.')}
                    className="px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Prototype Excel export requested. Data package simulated.')}
                    className="px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Excel</span>
                  </button>
                </div>
              )}
            </div>

            {generatedPlan ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60 border-b text-[11px] font-bold text-slate-500 uppercase">
                      <th className="p-3">Recommended Course</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Trainers</th>
                      <th className="p-3">Equipment Needs</th>
                      <th className="p-3">Est. Cost</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {generatedPlan.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{row.course}</td>
                        <td className="p-3 font-semibold">{row.seats}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{row.trainers}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{row.equipment}</td>
                        <td className="p-3 font-bold text-emerald-600">{row.cost}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                            {row.priority}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 whitespace-nowrap">{row.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <p className="font-semibold text-sm">Select planning parameters and click Generate Plan</p>
                <p className="text-xs">Produces a reviewable capacity roadmap with seats, trainers, tooling, and budgets.</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Officer Review Required:</strong> Recommendations do not autonomously commit government budget or course approvals.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
