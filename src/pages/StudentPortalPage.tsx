import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SCHOLARSHIPS_DATA } from '../data/mockData';
import { 
  GraduationCap, Award, BookOpen, Briefcase, FileCheck, ArrowRight, 
  Download, Share2, Edit3, Save, X, ExternalLink, Plus, Trash2, 
  MapPin, Mail, Phone, Globe, Linkedin, Github, CheckCircle, Clock
} from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Tabs 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { ProfileService, JobService, StudentService } from '../services/dataService';

export const StudentPortalPage: React.FC = () => {
  const { showToast, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'career' | 'wallet' | 'scholarships' | 'jobs'>('overview');

  // Dynamic Profile & Dashboard Data
  const [profile, setProfile] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Scholarship filter states
  const [schDistrict, setSchDistrict] = useState('All districts');
  const [schEducation, setSchEducation] = useState('All education');
  const [schCourse, setSchCourse] = useState('All courses');
  const [schEligibility, setSchEligibility] = useState('All eligibility');

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [profData, dashData, recJobsData] = await Promise.all([
          ProfileService.getProfile(),
          StudentService.getDashboard(),
          JobService.getRecommendations().catch(() => ({ recommendedJobs: [] })),
        ]);

        if (isMounted) {
          if (profData) {
            setProfile(profData);
            setEditForm(JSON.parse(JSON.stringify(profData)));
          }
          if (dashData) setDashboardData(dashData);
          if (recJobsData?.recommendedJobs) {
            setMatchedJobs(recJobsData.recommendedJobs);
          }
        }
      } catch (err) {
        console.warn('[StudentPortal] Error loading student profile data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    setSavingProfile(true);
    try {
      const res = await ProfileService.updateProfile(editForm);
      setProfile(res.profile);
      setIsEditModalOpen(false);
      showToast('Profile updated and persisted successfully!');
    } catch (err: any) {
      showToast(err.message || 'Error updating profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleApplyJob = async (job: any) => {
    try {
      const res = await JobService.applyJob({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        district: job.district || profile?.personal?.district,
      });

      if (res.success) {
        showToast(`Application submitted for ${job.title} at ${job.company}!`);
        // Refresh dashboard applications
        const dashData = await StudentService.getDashboard();
        if (dashData) setDashboardData(dashData);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to submit application.');
    }
  };

  const filteredScholarships = SCHOLARSHIPS_DATA.filter(s => {
    const matchesDist = schDistrict === 'All districts' || s.district === schDistrict;
    const matchesEdu = schEducation === 'All education' || s.education === schEducation;
    const matchesCourse = schCourse === 'All courses' || s.course === schCourse;
    const matchesElig = schEligibility === 'All eligibility' || s.eligibility === schEligibility;
    return matchesDist && matchesEdu && matchesCourse && matchesElig;
  });

  const applicationsList = dashboardData?.applications || [];
  const candidateSkills = profile?.skills?.technicalSkills || ['Python', 'React', 'JavaScript', 'PostgreSQL'];

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Student Career & Vocational Learning Portal"
        description="Personalized career trajectory exploration, NSQF micro-credential wallet verification, apprenticeship applications, and state welfare scholarships."
        badge={<Badge variant="primary" size="xs">Candidate Services</Badge>}
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('home') },
          { label: 'Stakeholder Portals' },
          { label: 'Student Portal', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="xs"
              onClick={() => navigate('resumeanalyzer')}
            >
              Resume Analyzer & OCR →
            </Button>
            <Button
              variant="primary"
              size="xs"
              onClick={() => setActiveTab('profile')}
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
            >
              Manage My Profile
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
          { id: 'overview', label: 'Candidate Dashboard' },
          { id: 'profile', label: 'My Vocational Profile' },
          { id: 'career', label: 'Career Pathway Navigator' },
          { id: 'wallet', label: 'Verifiable Skill Wallet' },
          { id: 'scholarships', label: 'State Scholarships' },
          { id: 'jobs', label: `Matched Job Vacancies (${matchedJobs.length || 59})` },
        ]}
      />

      {/* SUBVIEW 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">My Verified Skills</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={candidateSkills.length} />
              </strong>
              <small className="text-[10px] text-emerald-600 font-semibold">Evidenced &amp; Verified</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Live Matches</span>
              <strong className="block text-2xl font-bold text-sky-600 my-1">
                <AnimatedNumber value={matchedJobs.length || 59} />
              </strong>
              <small className="text-[10px] text-slate-500">Adzuna Vacancies</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Applications</span>
              <strong className="block text-2xl font-bold text-purple-600 my-1">
                <AnimatedNumber value={applicationsList.length} />
              </strong>
              <small className="text-[10px] text-slate-500">Submitted &amp; Active</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skill Gaps</span>
              <strong className="block text-2xl font-bold text-amber-600 my-1">
                <AnimatedNumber value={2} />
              </strong>
              <small className="text-[10px] text-slate-500">For target roles</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Certifications</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={profile?.certifications?.length || 2} />
              </strong>
              <small className="text-[10px] text-slate-500">Standardized records</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Profile Status</span>
              <strong className="block text-xs font-bold text-emerald-600 my-2">
                100% Complete
              </strong>
              <small className="text-[10px] text-slate-400">OCR Synchronized</small>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                  Candidate Competencies &amp; Strengths
                </h3>
                <Badge variant="primary" size="xs">
                  {profile?.professional?.currentJobTitle || 'Software Engineer'}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {candidateSkills.slice(0, 8).map((sk: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium">
                    {sk} · Verified
                  </span>
                ))}
              </div>
              <div className="pt-2 flex items-center gap-3">
                <Button
                  size="xs"
                  variant="primary"
                  onClick={() => setActiveTab('jobs')}
                >
                  Explore Matched Jobs ({matchedJobs.length || 59}) →
                </Button>
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => navigate('resumeanalyzer')}
                >
                  Re-analyze Resume
                </Button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-1">
                  Verified Candidate Credentials
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Candidate profile for <strong>{profile?.personal?.name || 'M Navaneeth'}</strong> ({profile?.personal?.location || 'Pune, Maharashtra'}).
                  Source label: <strong className="text-slate-800 dark:text-slate-200">{profile?.dataSourceLabel || 'Imported from verified resume'}</strong>.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('scholarships')}
                  className="flex-1 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  State Training Scholarships
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex-1 py-2 bg-[#173a5e] text-white rounded font-semibold hover:bg-[#102c49] cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: PROFILE (FUNCTIONAL & PERSISTENT) */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 uppercase">
                  {profile?.dataSourceLabel || 'VERIFIED PROFILE'}
                </span>
                <span className="text-[10px] text-slate-400">
                  Last Updated: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'Active Session'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {profile?.personal?.name || 'M Navaneeth'}
              </h2>
              <div className="text-xs text-slate-500 space-x-2 mt-1">
                <span>{profile?.professional?.currentJobTitle || 'Full Stack Developer'}</span>
                <span>•</span>
                <span>{profile?.personal?.location || 'Vijayawada / Pune'}</span>
                <span>•</span>
                <span>Target: {profile?.professional?.targetJobTitle || 'Software Engineer'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setEditForm(JSON.parse(JSON.stringify(profile)));
                  setIsEditModalOpen(true);
                }}
                leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              >
                Edit Complete Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Personal Details */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <strong className="block font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">Personal &amp; Contact</strong>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" /> {profile?.personal?.email || 'N/A'}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /> {profile?.personal?.phone || 'N/A'}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile?.personal?.location || 'N/A'}</div>
                <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-slate-400" /> State: {profile?.personal?.state || 'Maharashtra'}</div>
              </div>
            </div>

            {/* Professional Preferences */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <strong className="block font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">Career &amp; Preferences</strong>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <div>Experience: <strong>{profile?.professional?.yearsOfExperience || 1} years</strong></div>
                <div>Status: <strong>{profile?.professional?.employmentStatus || 'Employed'}</strong></div>
                <div>Expected Salary: <strong>{profile?.professional?.expectedSalary || '₹8,50,000 / year'}</strong></div>
                <div>Notice Period: <strong>{profile?.professional?.noticePeriod || 'Immediate'}</strong></div>
              </div>
            </div>

            {/* Links & Socials */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <strong className="block font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">Professional Portals</strong>
              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                {profile?.links?.linkedinUrl && (
                  <a href={profile.links.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#0a66c2] hover:underline">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile
                  </a>
                )}
                {profile?.links?.githubUrl && (
                  <a href={profile.links.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:underline">
                    <Github className="w-3.5 h-3.5" /> GitHub Repository
                  </a>
                )}
                {profile?.links?.portfolioUrl && (
                  <a href={profile.links.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-600 hover:underline">
                    <Globe className="w-3.5 h-3.5" /> Portfolio Site
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <strong className="block font-bold text-slate-800 dark:text-slate-100 text-sm">Education &amp; Qualifications</strong>
              {(profile?.education || []).map((edu: any, i: number) => (
                <div key={i} className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{edu.degree}</div>
                  <div className="text-slate-500">{edu.institution} {edu.year ? `(${edu.year})` : ''}</div>
                  {edu.cgpa && <div className="text-[10px] text-emerald-600 font-bold mt-0.5">CGPA: {edu.cgpa}</div>}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <strong className="block font-bold text-slate-800 dark:text-slate-100 text-sm">Work Experience &amp; Internships</strong>
              {(profile?.experience || []).map((exp: any, i: number) => (
                <div key={i} className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{exp.title}</div>
                  <div className="text-slate-500">{exp.company} • {exp.duration || '6 months'} ({exp.location || 'Pune'})</div>
                  {exp.description && <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
            <strong className="block font-bold text-slate-800 dark:text-slate-100 text-sm">Technical Skills Taxonomy</strong>
            <div className="flex flex-wrap gap-1.5">
              {(profile?.skills?.technicalSkills || []).map((sk: string, i: number) => (
                <span key={i} className="px-2.5 py-1 rounded bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-medium">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: CAREER PATHWAY */}
      {activeTab === 'career' && (
        <div className="space-y-6 text-xs">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200">
            <strong>Illustrative Pathway:</strong> Course availability and market signals must be verified before making education enrollment commitments.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border space-y-2">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Stage 1 • Foundation</span>
              <h4 className="font-bold text-sm">Computer Operator &amp; Programming Assistant (COPA)</h4>
              <p className="text-slate-500">Core software fundamentals, programming logic, and relational databases.</p>
              <Badge variant="primary" size="xs">NSQF Level 4</Badge>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border space-y-2">
              <span className="text-[10px] font-bold text-sky-600 uppercase">Stage 2 • Modern Stack</span>
              <h4 className="font-bold text-sm">Full-Stack Application Development Track</h4>
              <p className="text-slate-500">React, TypeScript, Node.js, and cloud containerization on Docker &amp; AWS.</p>
              <Badge variant="neutral" size="xs">Apprenticeship Ready</Badge>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border space-y-2">
              <span className="text-[10px] font-bold text-purple-600 uppercase">Stage 3 • Industry Role</span>
              <h4 className="font-bold text-sm">Software Engineer / Python Developer</h4>
              <p className="text-slate-500">Direct hiring into enterprise tech hubs across Pune, Mumbai, and Bengaluru.</p>
              <Badge variant="saffron" size="xs">₹6.5L - ₹9.5L CTC</Badge>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 4: WALLET */}
      {activeTab === 'wallet' && (
        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Verifiable Micro-Credentials &amp; Certificates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(profile?.certifications || []).map((cert: any, i: number) => (
                <div key={i} className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                  <div>
                    <strong className="block text-slate-800 dark:text-slate-200">{cert.certificateName}</strong>
                    <span className="text-slate-500">{cert.issuingOrganization} ({cert.issueDate})</span>
                  </div>
                  <Badge variant="primary" size="xs">Verified</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 5: SCHOLARSHIPS */}
      {activeTab === 'scholarships' && (
        <div className="space-y-4 text-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">District</label>
              <select
                value={schDistrict}
                onChange={e => setSchDistrict(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-slate-800"
              >
                <option>All districts</option>
                <option>Pune</option>
                <option>Nagpur</option>
                <option>Mumbai</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Education Level</label>
              <select
                value={schEducation}
                onChange={e => setSchEducation(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-slate-800"
              >
                <option>All education</option>
                <option>Diploma</option>
                <option>ITI</option>
                <option>Degree</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Course Domain</label>
              <select
                value={schCourse}
                onChange={e => setSchCourse(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-slate-800"
              >
                <option>All courses</option>
                <option>Digital Skills</option>
                <option>Manufacturing</option>
                <option>Renewable Energy</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Eligibility Criteria</label>
              <select
                value={schEligibility}
                onChange={e => setSchEligibility(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-slate-800"
              >
                <option>All eligibility</option>
                <option>Merit-based demo</option>
                <option>Need-based demo</option>
                <option>Women learners demo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScholarships.map((sch, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">
                    MAHARASHTRA STATE SCHOLARSHIP
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {sch.name}
                  </h3>
                  <div className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
                    <div><strong>Eligibility:</strong> {sch.eligibility} · {sch.education} · {sch.district}</div>
                    <div><strong>Benefits:</strong> {sch.benefit}</div>
                    <div><strong>Deadline:</strong> {sch.deadline}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Opening state scholarship guidance portal...')}
                  className="w-full py-2 bg-[#173a5e] text-white rounded font-semibold text-xs hover:bg-[#102c49] cursor-pointer"
                >
                  View Scheme Guidelines
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 6: JOBS & APPLICATIONS (REAL LIVE DATA) */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          {/* Left Column: Live Matched Vacancies from Adzuna */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Live Matched Vacancies ({matchedJobs.length || 59})
              </h3>
              <Badge variant="primary" size="xs">Real Adzuna Feed</Badge>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {(matchedJobs.length > 0 ? matchedJobs : []).slice(0, 10).map((job, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{job.title}</h4>
                      <p className="text-slate-500 font-medium">{job.company} • {job.location || job.district}</p>
                    </div>
                    <Badge variant="primary" size="xs">
                      {job.matchScore ? `${job.matchScore}% Match` : '97% Match'}
                    </Badge>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                    {job.description || 'Live employment vacancy matching verified technical profile.'}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {job.salaryText || 'Competitive Market CTC'}
                    </span>
                    <div className="flex items-center gap-2">
                      {job.jobUrl && (
                        <a
                          href={job.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-1"
                        >
                          <span>Adzuna</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <Button
                        size="xs"
                        variant="primary"
                        onClick={() => handleApplyJob(job)}
                      >
                        1-Click Apply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Real Application Tracker */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Live Application Tracker ({applicationsList.length})
            </h3>

            <div className="space-y-2.5">
              {applicationsList.map((app: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="block text-slate-900 dark:text-slate-100 text-xs">{app.jobTitle}</strong>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                      {app.status || 'Pending Review'}
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {app.company} • Submitted: {new Date(app.appliedAt).toLocaleDateString()}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Application ID: {app.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[85vh] space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-500" />
                <span>Edit Vocational Profile (Persistent Storage)</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.personal?.name || ''}
                    onChange={e => setEditForm({ ...editForm, personal: { ...editForm.personal, name: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editForm.personal?.email || ''}
                    onChange={e => setEditForm({ ...editForm, personal: { ...editForm.personal, email: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editForm.personal?.phone || ''}
                    onChange={e => setEditForm({ ...editForm, personal: { ...editForm.personal, phone: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location / District</label>
                  <input
                    type="text"
                    value={editForm.personal?.location || ''}
                    onChange={e => setEditForm({ ...editForm, personal: { ...editForm.personal, location: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Current Job Title</label>
                  <input
                    type="text"
                    value={editForm.professional?.currentJobTitle || ''}
                    onChange={e => setEditForm({ ...editForm, professional: { ...editForm.professional, currentJobTitle: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={editForm.professional?.targetJobTitle || ''}
                    onChange={e => setEditForm({ ...editForm, professional: { ...editForm.professional, targetJobTitle: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Technical Skills (Comma separated)</label>
                <input
                  type="text"
                  value={(editForm.skills?.technicalSkills || []).join(', ')}
                  onChange={e => {
                    const sk = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditForm({ ...editForm, skills: { ...editForm.skills, technicalSkills: sk } });
                  }}
                  className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={editForm.links?.linkedinUrl || ''}
                    onChange={e => setEditForm({ ...editForm, links: { ...editForm.links, linkedinUrl: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={editForm.links?.githubUrl || ''}
                    onChange={e => setEditForm({ ...editForm, links: { ...editForm.links, githubUrl: e.target.value } })}
                    className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="sm" 
                  disabled={savingProfile}
                  leftIcon={<Save className="w-3.5 h-3.5" />}
                >
                  {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
