import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CANDIDATES_DATA } from '../data/mockData';
import { Building2, Plus, Users, Award, MessageSquare, Briefcase, CheckCircle2, ChevronRight, ArrowRight, Share2 } from 'lucide-react';
import { JobRecord } from '../types';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Tabs 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { EmployerService } from '../services/dataService';

export const EmployerPortalPage: React.FC = () => {
  const { addJob, showToast, navigate, openLinkedInModal } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'post' | 'candidates' | 'partners' | 'apprentice' | 'feedback'>('overview');

  // Post Job Wizard State
  const [wizardStage, setWizardStage] = useState<0 | 1 | 2 | 3>(0);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDistrict, setJobDistrict] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobSkillsRaw, setJobSkillsRaw] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [extractedSkills, setExtractedSkills] = useState<{ skill: string; conf: number; checked: boolean }[]>([]);

  // Candidates filter
  const [candidateSearch, setCandidateSearch] = useState('');
  const [candidateSkill, setCandidateSkill] = useState('All skills');
  const [candidateDistrict, setCandidateDistrict] = useState('All districts');

  // Feedback State
  const [fbScores, setFbScores] = useState({
    satisfaction: '4.1/5',
    relevance: '3.8/5',
    quality: '4.0/5',
    hired: '68%'
  });
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  const handleShortlist = async (candidateId: string, candidateName: string) => {
    try {
      await EmployerService.shortlistCandidate(candidateId);
      setShortlistedIds(prev => [...prev, candidateId]);
      showToast(`Candidate ${candidateName} added to Employer Shortlist.`);
    } catch {
      setShortlistedIds(prev => [...prev, candidateId]);
      showToast(`Candidate ${candidateName} shortlisted.`);
    }
  };

  const filteredCandidates = CANDIDATES_DATA.filter(c => {
    const q = candidateSearch.toLowerCase();
    const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.skills.join(' ').toLowerCase().includes(q);
    const matchesSkill = candidateSkill === 'All skills' || c.skills.includes(candidateSkill);
    const matchesDistrict = candidateDistrict === 'All districts' || c.district === candidateDistrict;
    return matchesSearch && matchesSkill && matchesDistrict;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsList = jobSkillsRaw.split(',').map(s => s.trim()).filter(Boolean);
    if (!skillsList.length) {
      showToast('Please enter at least one skill requirement.');
      return;
    }

    setExtractedSkills(
      skillsList.map((skill, i) => ({
        skill,
        conf: Math.max(82, 95 - i * 3),
        checked: true
      }))
    );
    setWizardStage(1);
    showToast('AI skill extraction generated. Review and validate.');
  };

  const handleValidateSkills = () => {
    const validated = extractedSkills.filter(s => s.checked);
    if (!validated.length) {
      showToast('Please check at least one verified skill requirement.');
      return;
    }
    setWizardStage(2);
    showToast(`${validated.length} skills confirmed by employer.`);
  };

  const handlePublishJob = async () => {
    const validatedSkills = extractedSkills.filter(s => s.checked).map(s => s.skill);
    const newRecord: JobRecord = {
      id: Date.now(),
      title: jobTitle || 'Frontend Developer',
      employer: 'Sahyadri Digital Systems',
      industry: 'IT',
      district: jobDistrict || 'Pune',
      skills: validatedSkills,
      experience: jobExperience || '2–4 years',
      salary: 750000,
      salaryText: jobSalary || '₹6–8L',
      posted: new Date().toISOString().split('T')[0],
      source: 'Employer Portal Demo',
      status: 'Validated',
      description: jobDescription || 'Newly published synthetic position by employer.',
      extracts: validatedSkills.map((s, i) => [s, 'Intermediate', 92 - i * 2, 'Employer validated requirement'])
    };

    try {
      await EmployerService.postJob({
        title: jobTitle || 'Frontend Developer',
        company: 'Sahyadri Digital Systems',
        district: jobDistrict || 'Pune',
        description: jobDescription || 'Newly published position.',
        skills: validatedSkills,
        employmentType: 'Full-time',
        salary: jobSalary || '₹6–8L',
        experience: jobExperience || '2–4 years',
        status: 'Active'
      });
      showToast('Job requirement persisted to database and state vacancy board.');
    } catch {
      showToast('Job requirement posted locally.');
    }

    addJob(newRecord);
    setWizardStage(3);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFbScores({
      satisfaction: '4.2/5',
      relevance: '3.9/5',
      quality: '4.1/5',
      hired: '71%'
    });
    showToast('Employer feedback submitted and merged into regional analytics.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Employer Collaboration Workspace"
        description="Sahyadri Digital Systems • Verified enterprise employer portal connecting industry demand requisitions, apprentice placement, and institutional feedback loops."
        badge={<Badge variant="success" size="xs">Verified Industry Partner</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Stakeholder Portals' },
          { label: 'Employer Portal', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => navigate('jobintel')}
            >
              Job Market Engine →
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={openLinkedInModal}
              leftIcon={<Share2 className="w-3.5 h-3.5 text-[#0a66c2]" />}
            >
              LinkedIn OAuth
            </Button>
            <Button
              variant="primary"
              size="xs"
              onClick={() => setActiveTab('post')}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Post Vacancy
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <Tabs
        variant="segmented"
        activeTab={activeTab}
        onChange={tab => setActiveTab(tab as any)}
        tabs={[
          { id: 'overview', label: 'Overview & Funnel' },
          { id: 'post', label: 'Post Vacancy (NLP Wizard)' },
          { id: 'candidates', label: 'Candidate Match Ledger' },
          { id: 'partners', label: 'Vocational Training Partners' },
          { id: 'apprentice', label: 'Apprenticeships & Stagiaires' },
          { id: 'feedback', label: 'Curricular Feedback' },
        ]}
      />

      {/* SUBVIEW 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Active Jobs</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={6} />
              </strong>
              <small className="text-[10px] text-amber-600 font-semibold">2 awaiting validation</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Applicants</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={84} />
              </strong>
              <small className="text-[10px] text-emerald-600 font-semibold">27 assessed</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skill Requirements</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={18} />
              </strong>
              <small className="text-[10px] text-sky-600 font-semibold">Human-validated</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Training Partners</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={4} />
              </strong>
              <small className="text-[10px] text-slate-500">Across Pune district</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Apprenticeships</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={12} />
              </strong>
              <small className="text-[10px] text-emerald-600 font-semibold">8 positions open</small>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hiring Pipeline */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                Hiring Funnel Pipeline • Sep 2026
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Applications Received</span>
                    <span>84 candidates</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-[#173a5e] rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Screened Candidates</span>
                    <span>53 candidates (63%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-sky-600 rounded-full" style={{ width: '63%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Technically Assessed</span>
                    <span>27 candidates (32%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Selected / Hired</span>
                    <span className="font-bold text-emerald-600">8 hires (10%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Responsibilities */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-2">
                  Employer Evidence Safeguards
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Employers validate AI-extracted skills before job postings become active. You distinguish mandatory requirements from preferred skills to prevent false demand amplification. Candidate search does not rank or make automated hiring choices.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('post')}
                className="w-full py-2 bg-[#173a5e] text-white rounded-lg font-semibold text-xs hover:bg-[#102c49]"
              >
                Create &amp; Validate New Vacancy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: POST A JOB (WIZARD) */}
      {activeTab === 'post' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          {/* Stage Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[10px] font-bold uppercase tracking-wider">
            {['1. Create Job', '2. Skill Extraction', '3. Employer Validation', '4. Publish', '5. Applications', '6. Hiring Outcome'].map((step, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md border ${
                  idx < wizardStage
                    ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                    : idx === wizardStage
                    ? 'bg-amber-50 dark:bg-amber-950 border-amber-400 text-amber-900 dark:text-amber-200 font-black'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Wizard Step 0: Input Form */}
          {wizardStage === 0 && (
            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    required
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="e.g. Frontend Application Developer"
                    className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    District *
                  </label>
                  <select
                    required
                    value={jobDistrict}
                    onChange={e => setJobDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="">Select district</option>
                    <option>Pune</option>
                    <option>Mumbai</option>
                    <option>Nagpur</option>
                    <option>Nashik</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Job Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  placeholder="Describe day-to-day responsibilities, technology stack, and demonstrable deliverables..."
                  className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Required Skills (Comma separated) *
                </label>
                <input
                  required
                  value={jobSkillsRaw}
                  onChange={e => setJobSkillsRaw(e.target.value)}
                  placeholder="e.g. JavaScript, React, REST APIs, TypeScript"
                  className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Experience Range
                  </label>
                  <input
                    value={jobExperience}
                    onChange={e => setJobExperience(e.target.value)}
                    placeholder="e.g. 2–4 years"
                    className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Salary Range (Annual)
                  </label>
                  <input
                    value={jobSalary}
                    onChange={e => setJobSalary(e.target.value)}
                    placeholder="e.g. ₹6.5–8.5L"
                    className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#173a5e] text-white font-semibold text-xs hover:bg-[#102c49]"
                >
                  Proceed to AI Skill Extraction
                </button>
              </div>
            </form>
          )}

          {/* Wizard Step 1: Extraction Review */}
          {wizardStage === 1 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  AI Skill Extraction Review
                </h3>
                <p className="text-slate-500">
                  Select and validate the exact competencies that truly represent the job's core requirements.
                </p>
              </div>

              <div className="space-y-2">
                {extractedSkills.map((item, idx) => (
                  <label 
                    key={idx} 
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={e => {
                        const updated = [...extractedSkills];
                        updated[idx].checked = e.target.checked;
                        setExtractedSkills(updated);
                      }}
                      className="rounded text-[#173a5e] focus:ring-amber-500"
                    />
                    <div>
                      <strong className="block text-slate-800 dark:text-slate-200 text-xs">
                        {item.skill}
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        {item.conf}% confidence • Extracted from title and job description
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 rounded-lg text-amber-900 dark:text-amber-200">
                <strong>Human Validation Required:</strong> Unchecked items will be excluded from the public skill index to ensure data integrity.
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStage(0)}
                  className="px-3.5 py-1.5 rounded border border-slate-300 hover:bg-slate-50 text-xs"
                >
                  Edit Job Details
                </button>
                <button
                  type="button"
                  onClick={handleValidateSkills}
                  className="px-5 py-2 rounded-lg bg-[#173a5e] text-white font-semibold text-xs hover:bg-[#102c49]"
                >
                  Confirm &amp; Validate Skills
                </button>
              </div>
            </div>
          )}

          {/* Wizard Step 2: Publish Step */}
          {wizardStage === 2 && (
            <div className="space-y-4 text-xs text-center py-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  Validation Complete
                </h3>
                <p className="text-slate-500 max-w-md mx-auto mt-1">
                  The synthetic job vacancy for "{jobTitle}" is verified and ready to be recorded in this demonstration session.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePublishJob}
                className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm"
              >
                Publish Demo Job
              </button>
            </div>
          )}

          {/* Wizard Step 3: Success Screen */}
          {wizardStage === 3 && (
            <div className="space-y-4 text-xs text-center py-6">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                Published to Session Job Board
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {jobTitle}
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                The posting is now visible in the statewide Job Intelligence Engine and included in vacancy analytics.
              </p>

              <div className="flex justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setWizardStage(0);
                    setJobTitle('');
                    setJobDescription('');
                    setJobSkillsRaw('');
                  }}
                  className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 text-xs font-semibold"
                >
                  Create Another Job
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2 rounded-md bg-[#173a5e] text-white hover:bg-[#102c49] text-xs font-semibold"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW 3: CANDIDATES */}
      {activeTab === 'candidates' && (
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
            <strong>Candidate Discovery Disclaimer:</strong> Search filters through verified student profiles based on declared demonstration skills. It does not rank, recommend or make automated employment choices.
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Search</label>
              <input
                type="search"
                value={candidateSearch}
                onChange={e => setCandidateSearch(e.target.value)}
                placeholder="Candidate name or skills..."
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Skill</label>
              <select
                value={candidateSkill}
                onChange={e => setCandidateSkill(e.target.value)}
                className="p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800"
              >
                <option>All skills</option>
                <option>React</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>Power BI</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">District</label>
              <select
                value={candidateDistrict}
                onChange={e => setCandidateDistrict(e.target.value)}
                className="p-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800"
              >
                <option>All districts</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Nagpur</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b text-[11px] font-bold text-slate-500 uppercase">
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Education</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Declared Skills</th>
                  <th className="p-3">Verified Projects</th>
                  <th className="p-3">Availability</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCandidates.map((c, i) => {
                  const candidateId = String((c as any).id || i);
                  const isShortlisted = shortlistedIds.includes(candidateId);
                  return (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3">
                        <strong className="block text-slate-900 dark:text-slate-100 font-bold">{c.name}</strong>
                        <span className="text-[10px] text-amber-600 font-semibold">DEMO PROFILE</span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{c.education}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{c.district}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {c.skills.map((s, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 border text-slate-700 dark:text-slate-300">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{c.projects}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.availability === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {c.availability}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleShortlist(candidateId, c.name)}
                          disabled={isShortlisted}
                          className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors ${
                            isShortlisted
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                              : 'bg-[#173a5e] text-white hover:bg-[#102c49]'
                          }`}
                        >
                          {isShortlisted ? '✓ Shortlisted' : 'Shortlist'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 4: TRAINING PARTNERS */}
      {activeTab === 'partners' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Aundh ITI</h3>
              <p className="text-slate-500 mb-3">Pune District • Vocational Institute</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Relevant Courses:</span>
                  <span className="font-semibold">COPA, Advanced Web</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Capacity:</span>
                  <span className="font-semibold">120 seats</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Partnership enquiry recorded in demo session.')}
              className="mt-4 w-full py-2 bg-[#173a5e] text-white rounded font-semibold hover:bg-[#102c49]"
            >
              Start Partnership Enquiry
            </button>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Govt. Polytechnic Pune</h3>
              <p className="text-slate-500 mb-3">Pune District • Technical Diploma</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Relevant Courses:</span>
                  <span className="font-semibold">Computer Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Capacity:</span>
                  <span className="font-semibold">180 seats</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Partnership enquiry recorded in demo session.')}
              className="mt-4 w-full py-2 bg-[#173a5e] text-white rounded font-semibold hover:bg-[#102c49]"
            >
              Start Partnership Enquiry
            </button>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Pimpri ITI</h3>
              <p className="text-slate-500 mb-3">Pimpri-Chinchwad • Vocational Institute</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Relevant Courses:</span>
                  <span className="font-semibold">COPA Enrichment Module</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Capacity:</span>
                  <span className="font-semibold">80 seats</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Partnership enquiry recorded in demo session.')}
              className="mt-4 w-full py-2 bg-[#173a5e] text-white rounded font-semibold hover:bg-[#102c49]"
            >
              Start Partnership Enquiry
            </button>
          </div>
        </div>
      )}

      {/* SUBVIEW 5: APPRENTICESHIPS */}
      {activeTab === 'apprentice' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <form 
            onSubmit={e => {
              e.preventDefault();
              showToast('Apprenticeship preview created for this session; nothing was published.');
            }}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">
              Post New Apprenticeship Opportunity
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Apprenticeship Title
              </label>
              <input required placeholder="e.g. Junior Web Support Apprentice" className="w-full p-2 border rounded bg-white dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Positions Available
                </label>
                <input required type="number" min="1" max="100" defaultValue="4" className="w-full p-2 border rounded bg-white dark:bg-slate-800" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  District
                </label>
                <select className="w-full p-2 border rounded bg-white dark:bg-slate-800">
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Nagpur</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Supervised Learning Outcomes
              </label>
              <textarea required rows={3} placeholder="Key mentorship milestones..." className="w-full p-2 border rounded bg-white dark:bg-slate-800" />
            </div>
            <button type="submit" className="w-full py-2 bg-[#173a5e] text-white rounded font-semibold">
              Preview Demo Apprenticeship Posting
            </button>
          </form>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">
              Active Apprenticeship Vacancies
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 font-bold">Frontend Support Apprentice</strong>
                  <span className="text-slate-500">Pune • 6 months duration</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">4 open</span>
              </div>
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 font-bold">Data Quality Apprentice</strong>
                  <span className="text-slate-500">Pune • 3 months duration</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">2 open</span>
              </div>
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200 font-bold">Cloud Operations Apprentice</strong>
                  <span className="text-slate-500">Mumbai • 12 months duration</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">2 open</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 6: FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <form onSubmit={handleFeedbackSubmit} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">
              Submit Employer Quality Feedback
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Candidate Skill Satisfaction
              </label>
              <select required className="w-full p-2 border rounded bg-white dark:bg-slate-800">
                <option value="">Select rating (1-5)</option>
                <option>5 — High Excellence</option>
                <option>4 — Above Average</option>
                <option>3 — Adequate</option>
                <option>2 — Needs Improvement</option>
                <option>1 — Unsatisfactory</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Training Syllabus Relevance
              </label>
              <select required className="w-full p-2 border rounded bg-white dark:bg-slate-800">
                <option value="">Select rating (1-5)</option>
                <option>5 — Fully Aligned</option>
                <option>4 — Mostly Aligned</option>
                <option>3 — Moderately Aligned</option>
                <option>2 — Outdated</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hiring Outcome
              </label>
              <select required className="w-full p-2 border rounded bg-white dark:bg-slate-800">
                <option>Hired</option>
                <option>Further Assessment Required</option>
                <option>Not Selected</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Recommended Emerging Skills to Add
              </label>
              <input required placeholder="e.g. Next.js, Docker, Web Security" className="w-full p-2 border rounded bg-white dark:bg-slate-800" />
            </div>
            <button type="submit" className="w-full py-2 bg-[#173a5e] text-white rounded font-semibold">
              Add Feedback to Statewide Analytics
            </button>
          </form>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Aggregated Employer Feedback Analytics
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                <strong className="block text-2xl font-bold text-[#102c49] dark:text-sky-300">
                  {fbScores.satisfaction}
                </strong>
                <span className="text-slate-500 text-[11px]">Skill Satisfaction</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                <strong className="block text-2xl font-bold text-[#102c49] dark:text-sky-300">
                  {fbScores.relevance}
                </strong>
                <span className="text-slate-500 text-[11px]">Curriculum Relevance</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                <strong className="block text-2xl font-bold text-[#102c49] dark:text-sky-300">
                  {fbScores.quality}
                </strong>
                <span className="text-slate-500 text-[11px]">Practical Work Quality</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                <strong className="block text-2xl font-bold text-emerald-600">
                  {fbScores.hired}
                </strong>
                <span className="text-slate-500 text-[11px]">Positive Placement Rate</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              Aggregated across 42 verified synthetic employer evaluations in Maharashtra.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
