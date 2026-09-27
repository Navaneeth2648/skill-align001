import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, ArrowLeft, Check, Edit2, ShieldCheck, Eye } from 'lucide-react';

export const JobDetailPage: React.FC = () => {
  const { 
    jobs, 
    selectedJobId, 
    navigate, 
    validateJobExtract, 
    editJobExtract, 
    showToast 
  } = useApp();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const job = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const handleStartEdit = (idx: number, currentSkill: string) => {
    setEditingIndex(idx);
    setEditText(currentSkill);
  };

  const handleSaveEdit = (idx: number) => {
    if (job && editText.trim()) {
      editJobExtract(job.id, idx, editText.trim());
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          type="button"
          onClick={() => navigate('jobintel')}
          className="flex items-center gap-1 hover:text-[#173a5e] dark:hover:text-sky-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Job Intelligence</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-sm">
          {job.title}
        </span>
      </div>

      {/* Head */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight">
            {job.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {job.employer} • {job.district} • {job.industry}
          </p>
        </div>
        <span className={`self-start sm:self-auto text-[10px] font-bold px-2.5 py-1 rounded border ${
          job.status === 'Validated'
            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300'
            : 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300'
        }`}>
          {job.status}
        </span>
      </div>

      {/* Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Description & Metadata Context */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              Synthetic Job Description
            </h2>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {job.description}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 text-xs">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              Record Metadata &amp; Provenance
            </h2>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-slate-500">Experience Needed:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{job.experience}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-slate-500">Salary Envelope:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{job.salaryText}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-slate-500">Posted Timestamp:</span>
                <span className="text-slate-700 dark:text-slate-300">{job.posted}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-slate-500">Source Feed:</span>
                <span className="text-slate-700 dark:text-slate-300">{job.source}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="font-semibold text-slate-500">Verification Status:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{job.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Skill Extractions List */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>AI-Extracted Skills &amp; Traceable Evidence</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each extraction provides confidence scoring, proficiency rating, and quoted contextual evidence from the vacancy.
            </p>
          </div>

          <div className="space-y-3">
            {job.extracts.map(([skill, prof, conf, snippet], idx) => {
              const isEditing = editingIndex === idx;

              return (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 flex-1">
                        <input
                          type="text"
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                          className="px-2 py-1 border border-slate-300 rounded text-xs w-full bg-white dark:bg-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(idx)}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <strong className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {skill} • <span className="font-normal text-slate-500">{prof}</span>
                      </strong>
                    )}

                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                      {conf}% confidence
                    </span>
                  </div>

                  <blockquote className="border-l-3 border-amber-500 pl-3 py-1 bg-white dark:bg-slate-800/80 italic text-slate-600 dark:text-slate-300 text-[11px] rounded-r">
                    "{snippet}"
                  </blockquote>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => showToast(`Quoted evidence: "${snippet}" (Confidence: ${conf}%)`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-[11px]"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Evidence</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => validateJobExtract(job.id, idx)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#173a5e] text-white hover:bg-[#102c49] text-[11px] font-semibold"
                    >
                      <Check className="w-3 h-3" />
                      <span>Validate</span>
                    </button>

                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => handleStartEdit(idx, skill)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-[11px]"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200">
            <strong>Human Verification Policy:</strong> Reviewers must validate AI skill extractions before entries become part of statewide vacancy indices.
          </div>
        </div>
      </div>
    </div>
  );
};
