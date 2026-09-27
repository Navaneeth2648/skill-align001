import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHOLARSHIPS_DATA } from '../data/mockData';
import { GraduationCap, Award, BookOpen, Briefcase, FileCheck, ArrowRight, Download, Share2 } from 'lucide-react';
import { 
  PageHeader, Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter, Button, Badge, Tabs 
} from '../components/ui';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export const StudentPortalPage: React.FC = () => {
  const { showToast, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'career' | 'wallet' | 'scholarships' | 'jobs'>('overview');

  // Scholarship filter states
  const [schDistrict, setSchDistrict] = useState('All districts');
  const [schEducation, setSchEducation] = useState('All education');
  const [schCourse, setSchCourse] = useState('All courses');
  const [schEligibility, setSchEligibility] = useState('All eligibility');

  const filteredScholarships = SCHOLARSHIPS_DATA.filter(s => {
    const matchesDist = schDistrict === 'All districts' || s.district === schDistrict;
    const matchesEdu = schEducation === 'All education' || s.education === schEducation;
    const matchesCourse = schCourse === 'All courses' || s.course === schCourse;
    const matchesElig = schEligibility === 'All eligibility' || s.eligibility === schEligibility;
    return matchesDist && matchesEdu && matchesCourse && matchesElig;
  });

  return (
    <div className="space-y-5">
      {/* Standardized Page Header */}
      <PageHeader
        title="Student Career &amp; Vocational Learning Portal"
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
              onClick={() => navigate('jobintel')}
            >
              Search Open Vacancies →
            </Button>
            <Button
              variant="primary"
              size="xs"
              onClick={() => setActiveTab('wallet')}
              leftIcon={<Award className="w-3.5 h-3.5" />}
            >
              Verify Digital Wallet
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
          { id: 'jobs', label: 'Matched Job Vacancies' },
        ]}
      />

      {/* SUBVIEW 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">My Skills</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={7} />
              </strong>
              <small className="text-[10px] text-emerald-600 font-semibold">3 evidenced by projects</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skill Gaps</span>
              <strong className="block text-2xl font-bold text-amber-600 my-1">
                <AnimatedNumber value={4} />
              </strong>
              <small className="text-[10px] text-slate-500">For selected pathway</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Recommended</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={5} />
              </strong>
              <small className="text-[10px] text-slate-500">Courses to review</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Job Matches</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={18} />
              </strong>
              <small className="text-[10px] text-sky-600 font-semibold">Illustrative matches</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Applications</span>
              <strong className="block text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">
                <AnimatedNumber value={3} />
              </strong>
              <small className="text-[10px] text-slate-500">Demo records</small>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Certificates</span>
              <strong className="block text-2xl font-bold text-purple-600 my-1">
                <AnimatedNumber value={2} />
              </strong>
              <small className="text-[10px] text-slate-500">Verified credentials</small>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                Current Verified Skill Portfolio
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium">
                  HTML · Intermediate
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium">
                  CSS · Intermediate
                </span>
                <span className="px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300 font-medium">
                  JavaScript · Foundation
                </span>
                <span className="px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300 font-medium">
                  Git · Foundation
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('career')}
                className="mt-3 px-4 py-2 bg-[#173a5e] text-white rounded-lg text-xs font-semibold hover:bg-[#102c49]"
              >
                Explore Full Career Pathway →
              </button>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-1">
                  Guidance Note
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Career pathway sequences demonstrate possible learning steps grounded in market vacancy demand. They do not promise admission, institutional placement, or guaranteed salaries.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('scholarships')}
                className="w-full py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded font-semibold hover:bg-slate-50"
              >
                Check Eligible Training Scholarships
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">STUDENT PROFILE • DEMO</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Riya Deshmukh</h2>
              <div className="text-xs text-slate-500 space-x-2 mt-1">
                <span>Diploma in Computer Engineering</span>
                <span>•</span>
                <span>Pune District</span>
                <span>•</span>
                <span>Entry-level</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Prototype profile editing is not persisted in this demo session.')}
              className="px-3 py-1.5 rounded border text-xs font-semibold hover:bg-slate-50"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border">
              <strong className="block font-bold mb-1">Academic Education</strong>
              <p className="text-slate-600 dark:text-slate-400">Diploma in Computer Engineering · 2026 synthetic record</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border">
              <strong className="block font-bold mb-1">Verified Projects</strong>
              <p className="text-slate-600 dark:text-slate-400">Accessible district service directory; training center schedule interface</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border">
              <strong className="block font-bold mb-1">Career Interests</strong>
              <p className="text-slate-600 dark:text-slate-400">Civic technology, Frontend web development, Cloud application support</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 bg-white dark:bg-slate-900">
              <strong className="block text-xl font-bold text-slate-800 dark:text-slate-100">HTML / CSS / JS</strong>
              <span className="text-slate-500">Current demonstrated foundation</span>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900">
              <strong className="block text-xl font-bold text-slate-800 dark:text-slate-100">5 Progressive Steps</strong>
              <span className="text-slate-500">Suggested sequential curriculum</span>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900">
              <strong className="block text-xl font-bold text-emerald-600">₹3.6–7.2L</strong>
              <span className="text-slate-500">Historical illustrative entry salary range</span>
            </div>
          </div>

          {/* 5-Step Visual Ladder */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                step: 'Step 1: Current Foundation',
                duration: 'Existing skills',
                skills: 'HTML, CSS, JavaScript',
                diff: 'Foundation',
                course: 'Prior learning record',
                occ: 'Web support trainee'
              },
              {
                step: 'Step 2: JavaScript Advanced',
                duration: '6 weeks',
                skills: 'ES modules, async, testing',
                diff: 'Intermediate',
                course: 'Advanced JavaScript Lab',
                occ: 'Frontend trainee'
              },
              {
                step: 'Step 3: React.js',
                duration: '8 weeks',
                skills: 'Components, state, accessible UI',
                diff: 'Intermediate',
                course: 'React Application Development',
                occ: 'Junior frontend dev'
              },
              {
                step: 'Step 4: Node.js Backend',
                duration: '8 weeks',
                skills: 'APIs, database access, security',
                diff: 'Intermediate',
                course: 'Server-side JavaScript',
                occ: 'Web app developer'
              },
              {
                step: 'Step 5: AWS Cloud Foundations',
                duration: '6 weeks',
                skills: 'Cloud hosting, deployment, CI/CD',
                diff: 'Intermediate',
                course: 'Cloud Foundations Lab',
                occ: 'Cloud support associate'
              }
            ].map((p, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">
                    {p.step}
                  </span>
                  <strong className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                    {p.skills}
                  </strong>
                  <div className="text-[11px] text-slate-500 mt-2 space-y-1">
                    <div><strong>Duration:</strong> {p.duration}</div>
                    <div><strong>Difficulty:</strong> {p.diff}</div>
                    <div><strong>Course:</strong> {p.course}</div>
                    <div><strong>Target Role:</strong> {p.occ}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 4: SKILL WALLET */}
      {activeTab === 'wallet' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6 text-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Digital Credential &amp; Skill Wallet
              </h2>
              <p className="text-slate-500">
                Tamper-evident verification of completed vocational courses, assessments, and projects.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => showToast('Resume generated in demo preview.')}
                className="px-3 py-1.5 rounded bg-[#173a5e] text-white hover:bg-[#102c49] font-medium"
              >
                Generate Resume
              </button>
              <button
                type="button"
                onClick={() => showToast('Profile exported as JSON demo package.')}
                className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 font-medium"
              >
                Export Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Verified Skill Badges</h3>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">HTML5</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">CSS3</span>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">JavaScript</span>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">Git Versioning</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Issued Certificates</h3>
              <div className="space-y-1 text-slate-600 dark:text-slate-300">
                <div>• Web Development Foundations (MSBTE Demo)</div>
                <div>• Digital Accessibility Basics (2026)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Practical Assessments</h3>
              <div className="space-y-1 text-slate-600 dark:text-slate-300">
                <div>• JavaScript Core Quiz: <strong>72% score</strong></div>
                <div>• Responsive Design Lab: <strong>88% score</strong></div>
              </div>
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
                    DEMO SCHOLARSHIP ENTRY
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
                  onClick={() => showToast('Demonstration scheme link; no external application endpoint exists.')}
                  className="w-full py-2 bg-[#173a5e] text-white rounded font-semibold text-xs hover:bg-[#102c49]"
                >
                  View Scheme Guidelines
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 6: JOBS & APPLICATIONS */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Illustrative Job Matches
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200">Junior Frontend Trainee</strong>
                  <span className="text-slate-500">Pune • Sahyadri Digital Systems</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  6 of 9 skills overlap
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200">Web Support Associate</strong>
                  <span className="text-slate-500">Pune • Deccan Mobility</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  5 of 7 skills overlap
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200">UI Testing Apprentice</strong>
                  <span className="text-slate-500">Mumbai • Tech Network</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                  4 of 6 skills overlap
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              Skill overlap indicates curriculum alignment; not an automated hiring promise.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Demonstration Application Tracker
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200">Web Support Associate</strong>
                  <span className="text-slate-500">Submitted 22 Sep 2026</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                  Assessment Invited
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200">Frontend Trainee</strong>
                  <span className="text-slate-500">Submitted 20 Sep 2026</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                  Submitted
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-200">UI Testing Apprentice</strong>
                  <span className="text-slate-500">Drafted 24 Sep 2026</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                  Draft
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
