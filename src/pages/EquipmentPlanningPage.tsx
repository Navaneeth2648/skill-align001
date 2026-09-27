import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_DATA } from '../data/mockData';
import { Wrench, CheckCircle, Clock, Plus, ArrowLeft } from 'lucide-react';

export const EquipmentPlanningPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'detail' | 'sharing'>('dashboard');

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-500" />
            <span>Equipment Planning &amp; Allocation</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Lab equipment requirements, shortages, utilization rates, and procurement scenarios for training delivery.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
          DEMO DATA
        </span>
      </div>

      {/* Subview Nav Bar */}
      <div className="bg-[#102c49] text-white p-2 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'dashboard' ? 'bg-white text-[#102c49]' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Equipment Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('detail')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'detail' ? 'bg-white text-[#102c49]' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Arduino Kit Detail
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sharing')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'sharing' ? 'bg-white text-[#102c49]' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Inter-Institute Sharing
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('trainers')}
            className="px-2.5 py-1 rounded bg-white/10 text-slate-200 hover:bg-white/20 text-[11px]"
          >
            Trainer Planning →
          </button>
          <button
            type="button"
            onClick={() => navigate('districtintel')}
            className="px-2.5 py-1 rounded bg-white/10 text-slate-200 hover:bg-white/20 text-[11px]"
          >
            District Evidence →
          </button>
        </div>
      </div>

      {/* SUBVIEW 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3.5">Equipment / Tooling Set</th>
                    <th className="p-3.5">Required Units</th>
                    <th className="p-3.5">Available Units</th>
                    <th className="p-3.5">Shortage Units</th>
                    <th className="p-3.5">Utilization %</th>
                    <th className="p-3.5">Unit Cost</th>
                    <th className="p-3.5">Total Shortage Cost</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {EQUIPMENT_DATA.map((e, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                        {e.name}
                      </td>
                      <td className="p-3.5 text-slate-700 dark:text-slate-300 font-semibold">{e.required}</td>
                      <td className="p-3.5 text-slate-700 dark:text-slate-300">{e.available}</td>
                      <td className="p-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          e.shortage > 8 
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200' 
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                        }`}>
                          {e.shortage} units
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                        {e.utilization}%
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        ₹{e.unitCost.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{e.totalCost.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            if (idx === 0) {
                              setActiveTab('detail');
                            } else {
                              showToast(`Detailed BOM is demonstrated for Arduino Kit.`);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-[#173a5e] text-white hover:bg-[#102c49] font-medium text-[11px]"
                        >
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Total shortage cost represents shortage units multiplied by the illustrative benchmark unit cost.
          </p>
        </div>
      )}

      {/* SUBVIEW 2: EQUIPMENT DETAIL */}
      {activeTab === 'detail' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs border-t-4 border-t-[#173a5e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                EQUIPMENT DETAIL • DEMO SPECIFICATION
              </span>
              <h2 className="text-2xl font-extrabold text-[#102c49] dark:text-white">
                Arduino Kit (IoT &amp; Embedded Practice Lab)
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap font-medium">
                <span>Required: 30 units</span>
                <span>•</span>
                <span>Available: 18 units</span>
                <span>•</span>
                <span className="text-rose-600 font-bold">Shortage: 12 units</span>
                <span>•</span>
                <span>Current Utilization: 86%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* BOM Table */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                Bill of Materials (BOM) Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60 border-b text-[11px] font-bold text-slate-500 uppercase">
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5">Qty</th>
                      <th className="p-2.5">Unit Cost</th>
                      <th className="p-2.5">Total</th>
                      <th className="p-2.5 text-right">Procurement Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Arduino Uno board</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">12</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">₹2,100</td>
                      <td className="p-2.5 font-bold">₹25,200</td>
                      <td className="p-2.5 text-right">
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                          Requested
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Sensor assortment</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">12</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">₹1,600</td>
                      <td className="p-2.5 font-bold">₹19,200</td>
                      <td className="p-2.5 text-right">
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                          Approved
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Breadboard &amp; jumper set</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">12</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">₹650</td>
                      <td className="p-2.5 font-bold">₹7,800</td>
                      <td className="p-2.5 text-right">
                        <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold text-[10px]">
                          Ordered
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Protective storage case</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">12</td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">₹450</td>
                      <td className="p-2.5 font-bold">₹5,400</td>
                      <td className="p-2.5 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Utilization & Maintenance */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                  Lab Utilization Trend • Jul–Sep 2026
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>July 2026</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-[#173a5e] rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>August 2026</span>
                      <span>81%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-[#173a5e] rounded-full" style={{ width: '81%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>September 2026</span>
                      <span className="text-amber-600 font-bold">86% (High Congestion)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '86%' }} />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">Unit: Scheduled lab hours used ÷ Available operational hours.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs text-xs space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Lab Maintenance Log</h4>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5">
                  <div className="border-l-2 border-slate-300 pl-2">
                    <strong>12 Sep 2026 · Quarterly Inspection:</strong> 18 kits passed; 2 USB cables replaced.
                  </div>
                  <div className="border-l-2 border-slate-300 pl-2">
                    <strong>04 Aug 2026 · Sensor Calibration:</strong> Verified by institute lab technician.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Procurement Workflow */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              Procurement Lifecycle Workflow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">1. Requested</span>
                <p className="text-slate-500 text-[11px] mt-1">Lab coordinator · 16 Sep</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">2. Approved</span>
                <p className="text-slate-500 text-[11px] mt-1">ITI Principal · 20 Sep</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300">
                <span className="font-bold text-amber-800 dark:text-amber-300">3. Ordered (Current)</span>
                <p className="text-slate-500 text-[11px] mt-1">Procurement desk · 25 Sep</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500">4. Delivered</span>
                <p className="text-slate-400 text-[11px] mt-1">Pending supplier dispatch</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: SHARING REQUESTS */}
      {activeTab === 'sharing' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Inter-Institute Tooling Sharing Requests
              </h2>
              <p className="text-xs text-slate-500">
                Synthetic requests evaluated before issuing new capital procurement tenders.
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast('New sharing request recorded for this demonstration session.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#173a5e] text-white rounded-lg text-xs font-semibold hover:bg-[#102c49]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Sharing Request</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-3.5">Requesting Institute</th>
                  <th className="p-3.5">Equipment</th>
                  <th className="p-3.5">Quantity</th>
                  <th className="p-3.5">Potential Lender</th>
                  <th className="p-3.5">Sharing Window</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">Aundh ITI</td>
                  <td className="p-3.5">Arduino Kit</td>
                  <td className="p-3.5 font-semibold">6 units</td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300">Pimpri ITI</td>
                  <td className="p-3.5 text-slate-500">05–23 Oct 2026</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                      Under Review
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">Govt. Polytechnic Pune</td>
                  <td className="p-3.5">PLC Trainer</td>
                  <td className="p-3.5 font-semibold">3 units</td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300">Haveli Skill Centre</td>
                  <td className="p-3.5 text-slate-500">12–30 Oct 2026</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                      Approved
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
