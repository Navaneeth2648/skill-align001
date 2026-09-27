import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DISTRICTS_DATA } from '../../data/mockData';
import { MapPin, TrendingUp, Building2, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface RegionData {
  id: string;
  name: string;
  division: string;
  jobs: number;
  topSkill: string;
  primarySector: string;
  institutes: number;
  imbalanceScore: 'High Deficit' | 'Balanced' | 'Moderate Gap';
  color: string;
  coordinates: { x: number; y: number };
}

const REGIONS: RegionData[] = [
  {
    id: 'pune',
    name: 'Pune District & Division',
    division: 'Western Maharashtra',
    jobs: 18420,
    topSkill: 'EV Diagnostics & Systems',
    primarySector: 'Automotive & Software',
    institutes: 86,
    imbalanceScore: 'High Deficit',
    color: '#b45309',
    coordinates: { x: 195, y: 220 }
  },
  {
    id: 'mumbai',
    name: 'Mumbai & Konkan Hub',
    division: 'Konkan Division',
    jobs: 28920,
    topSkill: 'Data Analytics & Cloud Architecture',
    primarySector: 'Banking, FinTech & Services',
    institutes: 112,
    imbalanceScore: 'Moderate Gap',
    color: '#102c49',
    coordinates: { x: 105, y: 195 }
  },
  {
    id: 'nashik',
    name: 'Nashik & Khandesh Hub',
    division: 'Northern Maharashtra',
    jobs: 7820,
    topSkill: 'Industrial IoT & Precision Agro-Engineering',
    primarySector: 'Smart Manufacturing & Electrical',
    institutes: 48,
    imbalanceScore: 'Moderate Gap',
    color: '#0284c7',
    coordinates: { x: 180, y: 125 }
  },
  {
    id: 'sambhajinagar',
    name: 'Chhatrapati Sambhajinagar Hub',
    division: 'Marathwada Division',
    jobs: 6940,
    topSkill: 'PLC Automation & Industrial Maintenance',
    primarySector: 'Automotive Components & Pharma',
    institutes: 42,
    imbalanceScore: 'High Deficit',
    color: '#c2410c',
    coordinates: { x: 285, y: 165 }
  },
  {
    id: 'nagpur',
    name: 'Nagpur Logistics & Clean Energy',
    division: 'Vidarbha Division',
    jobs: 7250,
    topSkill: 'Solar PV & Heavy Equipment Ops',
    primarySector: 'Renewable Power & Logistics',
    institutes: 54,
    imbalanceScore: 'Moderate Gap',
    color: '#15803d',
    coordinates: { x: 440, y: 115 }
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur & Southern Cluster',
    division: 'Southern Maharashtra',
    jobs: 4890,
    topSkill: 'CNC Programming & Casting Metallurgy',
    primarySector: 'Foundry & Heavy Engineering',
    institutes: 36,
    imbalanceScore: 'Balanced',
    color: '#475569',
    coordinates: { x: 190, y: 310 }
  }
];

export const MaharashtraRegionMap: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [selectedRegionId, setSelectedRegionId] = useState<string>('pune');

  const selectedRegion = REGIONS.find(r => r.id === selectedRegionId) || REGIONS[0];

  const handleSelect = (rId: string) => {
    setSelectedRegionId(rId);
    const reg = REGIONS.find(r => r.id === rId);
    if (reg) {
      showToast(`Selected regional focus: ${reg.name} (${reg.jobs.toLocaleString('en-IN')} postings)`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Visual Geographic Schematic */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#102c49] dark:text-sky-400" />
              <span>Maharashtra Regional Demand Cartogram</span>
            </h4>
            <span className="text-[11px] text-slate-500">
              Interactive 6-division administrative clusters • Click any regional node to inspect supply/demand balance
            </span>
          </div>
          <Badge variant="neutral" size="xs">36 Districts Mapped</Badge>
        </div>

        {/* Interactive SVG Regional Map Container */}
        <div className="relative my-3 bg-slate-50 dark:bg-slate-950/60 rounded-md border border-slate-200/80 dark:border-slate-800 p-2 overflow-hidden flex items-center justify-center min-h-[290px]">
          <svg
            viewBox="0 0 540 370"
            className="w-full h-auto max-h-[300px] select-none"
            aria-label="Maharashtra Administrative Divisions Map"
          >
            {/* Generalized Maharashtra State Boundary Outline */}
            <path
              d="M 60,160 
                 L 110,90 
                 L 220,70 
                 L 320,60 
                 L 430,70 
                 L 510,95 
                 L 500,165 
                 L 420,200 
                 L 360,250 
                 L 290,270 
                 L 240,340 
                 L 170,350 
                 L 140,290 
                 L 90,240 
                 L 60,160 Z"
              className="fill-slate-200/50 dark:fill-slate-800/40 stroke-slate-300 dark:stroke-slate-700 stroke-1 stroke-dasharray-2"
            />

            {/* Connecting Regional Corridors (Samruddhi / Industrial Arteries) */}
            <line x1="105" y1="195" x2="195" y2="220" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="105" y1="195" x2="180" y2="125" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="180" y1="125" x2="285" y2="165" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="285" y1="165" x2="440" y2="115" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="195" y1="220" x2="190" y2="310" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />

            {/* Regional Nodes */}
            {REGIONS.map(reg => {
              const isSelected = reg.id === selectedRegionId;
              const radius = Math.max(16, Math.min(28, Math.round(Math.sqrt(reg.jobs) * 0.16)));

              return (
                <g
                  key={reg.id}
                  onClick={() => handleSelect(reg.id)}
                  className="cursor-pointer transition-transform duration-150"
                  tabIndex={0}
                  role="button"
                  aria-label={`${reg.name}, ${reg.jobs} jobs`}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSelect(reg.id)}
                >
                  {/* Pulse ring for selected */}
                  {isSelected && (
                    <circle
                      cx={reg.coordinates.x}
                      cy={reg.coordinates.y}
                      r={radius + 8}
                      fill="none"
                      stroke={reg.color}
                      strokeWidth="2"
                      className="opacity-40 animate-pulse"
                    />
                  )}

                  {/* Main Bubble */}
                  <circle
                    cx={reg.coordinates.x}
                    cy={reg.coordinates.y}
                    r={radius}
                    fill={isSelected ? reg.color : '#ffffff'}
                    stroke={reg.color}
                    strokeWidth={isSelected ? '3' : '2'}
                    className="shadow-xs transition-colors duration-150 dark:fill-slate-800"
                  />

                  {/* Center Dot or Count */}
                  <text
                    x={reg.coordinates.x}
                    y={reg.coordinates.y + 4}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : reg.color}
                    fontSize="10"
                    fontWeight="bold"
                    className="select-none pointer-events-none font-mono"
                  >
                    {Math.round(reg.jobs / 1000)}k
                  </text>

                  {/* Label */}
                  <text
                    x={reg.coordinates.x}
                    y={reg.coordinates.y + radius + 13}
                    textAnchor="middle"
                    fill="#334155"
                    fontSize="9"
                    fontWeight={isSelected ? 'bold' : '600'}
                    className="dark:fill-slate-300 pointer-events-none select-none"
                  >
                    {reg.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xs p-1.5 rounded border border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 space-y-0.5 pointer-events-none">
            <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Demand Volume (k)</div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#102c49]" />
              <span>High (&gt;15k)</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
              <span>Mid (5k–15k)</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#475569]" />
              <span>Emerging</span>
            </div>
          </div>
        </div>

        {/* Quick Division Selector Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2">
          {REGIONS.map(reg => (
            <button
              key={reg.id}
              type="button"
              onClick={() => handleSelect(reg.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer border ${
                reg.id === selectedRegionId
                  ? 'bg-[#102c49] text-white border-[#102c49]'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {reg.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Region Detailed Diagnostic Box */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                {selectedRegion.division}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                {selectedRegion.name}
              </h3>
            </div>
            <Badge
              variant={selectedRegion.imbalanceScore === 'High Deficit' ? 'danger' : 'warning'}
              size="xs"
              dot
            >
              {selectedRegion.imbalanceScore}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Active Demand</span>
              <strong className="text-base font-extrabold text-[#102c49] dark:text-sky-300 tabular-nums">
                {selectedRegion.jobs.toLocaleString('en-IN')}
              </strong>
              <span className="block text-[10px] text-slate-400">Validated vacancies</span>
            </div>

            <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Training Capacity</span>
              <strong className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                {selectedRegion.institutes} ITIs
              </strong>
              <span className="block text-[10px] text-slate-400">Govt. + Pvt. institutes</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Top Emerging Skill:</span>
                <span className="font-bold text-[#b45309] dark:text-amber-400">{selectedRegion.topSkill}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Key Sector Focus:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedRegion.primarySector}</span>
              </div>
            </div>

            {/* Imbalance Meter */}
            <div className="p-2.5 rounded bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-700 dark:text-slate-300">Supply-to-Demand Coverage Ratio</span>
                <span className="text-[#b45309] tabular-nums">64% (Gap Signal)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-[#b45309] rounded-full" style={{ width: '64%' }} />
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Current annual ITI admissions output covers 64% of recurring regional vacancy inflows.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => navigate('districtintel')}
            rightIcon={<ArrowRight className="w-3 h-3" />}
          >
            Pune Deep Dive
          </Button>

          <Button
            variant="primary"
            size="xs"
            onClick={() => navigate('jobintel')}
          >
            View Regional Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};
