import fs from 'fs';
import path from 'path';
import { 
  UserProfile, 
  ResumeAnalysisResult, 
  EmployerJobPost, 
  CandidateApplication, 
  CurriculumRecord, 
  CurriculumReviewItem, 
  CurriculumSignOffRecord, 
  TrainingPlan, 
  TrainerRecord, 
  EquipmentRecord, 
  BudgetRecord, 
  AlertItem, 
  DataQualityMetric, 
  DataSourceRecord, 
  ReportItem, 
  AuditLogEntry, 
  PlatformUser, 
  AssistantChatMessage 
} from '../types';

export interface AppPersistentState {
  userProfile: UserProfile;
  savedJobIds: string[];
  jobApplications: CandidateApplication[];
  employerJobs: EmployerJobPost[];
  shortlistedCandidates: string[];
  curriculumRecords: CurriculumRecord[];
  curriculumReviews: CurriculumReviewItem[];
  curriculumSignOffs: Record<string, CurriculumSignOffRecord[]>;
  trainingPlans: TrainingPlan[];
  trainers: TrainerRecord[];
  equipment: EquipmentRecord[];
  budgets: BudgetRecord[];
  alerts: AlertItem[];
  dataQuality: DataQualityMetric;
  dataSources: DataSourceRecord[];
  reports: ReportItem[];
  auditLogs: AuditLogEntry[];
  users: PlatformUser[];
  assistantChatHistory: AssistantChatMessage[];
  linkedinSession: {
    connected: boolean;
    connectedAt: string | null;
    userProfile: {
      name: string;
      headline: string;
      email: string;
      organization: string;
    } | null;
  } | null;
  latestResumeAnalysis: ResumeAnalysisResult | null;
  lastUpdated: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_PROFILE: UserProfile = {
  id: 'user-default-candidate',
  personal: {
    name: 'M Navaneeth',
    email: 'm.navaneeth@example.edu.in',
    phone: '+91 98765 43210',
    location: 'Vijayawada, Andhra Pradesh, India',
    district: 'Pune',
    state: 'Maharashtra',
    profilePhoto: '',
  },
  professional: {
    currentJobTitle: 'Full Stack Developer',
    targetJobTitle: 'Software Engineer / Python Developer',
    yearsOfExperience: 1,
    employmentStatus: 'Employed',
    preferredEmploymentType: 'Full-time',
    preferredLocations: ['Pune', 'Mumbai', 'Bangalore', 'Hyderabad'],
    expectedSalary: '₹8,50,000 / year',
    noticePeriod: 'Immediate',
  },
  skills: {
    technicalSkills: [
      'Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'Next.js', 
      'Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 
      'Docker', 'Git', 'Linux', 'REST APIs', 'Tailwind CSS'
    ],
    softSkills: ['Problem Solving', 'Agile Teamwork', 'Technical Documentation', 'Communication'],
    skillProficiency: {
      Python: 'Advanced',
      React: 'Advanced',
      'Node.js': 'Advanced',
      TypeScript: 'Intermediate',
      PostgreSQL: 'Intermediate',
      AWS: 'Intermediate',
      Docker: 'Intermediate',
    },
    certifications: [
      'Python for Everybody - Coursera',
      'AWS Cloud Practitioner (In Progress)',
      'NPTEL Python Programming (Top 5%)'
    ],
    languages: ['English', 'Telugu', 'Hindi'],
  },
  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'SRM Institute of Science and Technology',
      fieldOfStudy: 'Computer Science',
      year: '2026',
      cgpa: '8.8 / 10',
    },
  ],
  experience: [
    {
      title: 'Full Stack Engineering Intern',
      company: 'SkillBridge Tech Labs',
      duration: '6 months',
      location: 'Pune, Maharashtra',
      description: 'Engineered high-performance real-time labour market analysis workflows using React, TypeScript, and Node.js.',
      responsibilities: [
        'Built automated OCR extraction pipeline for scanned PDF resumes.',
        'Integrated Adzuna job search API and deterministic skill-matching calculation.',
      ],
      skillsUsed: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      certificateName: 'Python for Everybody Specialization',
      issuingOrganization: 'Coursera / University of Michigan',
      issueDate: '2025-06-15',
      credentialId: 'COURSERA-PY-8842',
      credentialUrl: 'https://coursera.org/verify/COURSERA-PY-8842',
    },
    {
      id: 'cert-2',
      certificateName: 'AWS Certified Cloud Practitioner',
      issuingOrganization: 'Amazon Web Services',
      issueDate: '2025-11-20',
      credentialId: 'AWS-CCP-9921',
      credentialUrl: 'https://aws.amazon.com/verification',
    }
  ],
  links: {
    linkedinUrl: 'https://linkedin.com/in/m-navaneeth',
    githubUrl: 'https://github.com/navaneethm',
    portfolioUrl: 'https://navaneeth.dev',
    otherUrls: ['https://leetcode.com/u/navaneethm'],
  },
  dataSourceLabel: 'Imported from verified resume',
  updatedAt: new Date().toISOString(),
};

const INITIAL_CURRICULUM: CurriculumRecord[] = [
  {
    id: 'curr-copa',
    code: 'DGT-ITI-COPA-01',
    name: 'Computer Operator & Programming Assistant (COPA)',
    industry: 'Information Technology',
    totalHours: 1200,
    institutesCount: 84,
    studentsCount: 6240,
    currentPlacementRate: '58%',
    lastReviewDate: '2026-07-12',
    status: 'Under Review',
    marketDemandSkills: [
      'HTML', 'CSS', 'JavaScript', 'Programming Logic', 'Databases', 'Python', 'React.js', 
      'AWS Basics', 'Git', 'REST APIs', 'Linux', 'Cybersecurity', 'Excel', 'Power BI', 
      'Networking', 'Cloud Concepts', 'UI Design', 'Testing', 'Agile', 'Node.js', 
      'TypeScript', 'Data Analytics', 'SQL', 'Java', 'Docker'
    ],
    coveredSkills: [
      'HTML', 'CSS', 'JavaScript', 'Programming Logic', 'Databases', 'Excel', 'Networking', 
      'SQL', 'Java', 'Linux', 'Cybersecurity', 'UI Design', 'Testing', 'Git', 'Agile'
    ],
    alignmentPercentage: 62,
    skillGaps: [
      { skill: 'React.js', demand: 'High', coverage: 'Not covered', requiredProficiency: 'Intermediate', gap: 'Full gap', learningTime: '3 months', estimatedCost: '₹18,000', priority: 'High' },
      { skill: 'Python', demand: 'High', coverage: 'Foundation only', requiredProficiency: 'Advanced', gap: 'Proficiency gap', learningTime: '2 months', estimatedCost: '₹14,000', priority: 'High' },
      { skill: 'AWS Basics', demand: 'Moderate', coverage: 'Not covered', requiredProficiency: 'Beginner', gap: 'Full gap', learningTime: '1 month', estimatedCost: '₹9,000', priority: 'Medium' },
      { skill: 'REST APIs', demand: 'High', coverage: 'Introductory', requiredProficiency: 'Intermediate', gap: 'Coverage gap', learningTime: '6 weeks', estimatedCost: '₹11,000', priority: 'High' },
      { skill: 'Docker', demand: 'Moderate', coverage: 'Not covered', requiredProficiency: 'Beginner', gap: 'Full gap', learningTime: '1 month', estimatedCost: '₹8,500', priority: 'Medium' },
    ],
  },
  {
    id: 'curr-electrical',
    code: 'DGT-ITI-ELEC-02',
    name: 'Electrical Technician & EV Conversion',
    industry: 'Automotive & Electrical Engineering',
    totalHours: 1400,
    institutesCount: 112,
    studentsCount: 5180,
    currentPlacementRate: '71%',
    lastReviewDate: '2026-08-08',
    status: 'Approved',
    marketDemandSkills: ['Circuit Analysis', 'Motor Drives', 'EV Safety', 'CAN Bus', 'Inverter Testing', 'PLC Basics', 'High Voltage Isolation'],
    coveredSkills: ['Circuit Analysis', 'Motor Drives', 'Inverter Testing', 'PLC Basics', 'High Voltage Isolation'],
    alignmentPercentage: 81,
    skillGaps: [
      { skill: 'EV Safety', demand: 'High', coverage: 'Foundation only', requiredProficiency: 'Intermediate', gap: 'Proficiency gap', learningTime: '6 weeks', estimatedCost: '₹12,000', priority: 'High' },
    ],
  },
  {
    id: 'curr-iot',
    code: 'DGT-ITI-IOT-03',
    name: 'Industrial IoT & Smart Automation Technician',
    industry: 'Advanced Manufacturing',
    totalHours: 1100,
    institutesCount: 37,
    studentsCount: 1960,
    currentPlacementRate: '66%',
    lastReviewDate: '2026-06-29',
    status: 'Revision Required',
    marketDemandSkills: ['Sensors & Transducers', 'Edge Analytics', 'MQTT / Modbus', 'Microcontroller Programming', 'SCADA', 'Cloud Telemetry'],
    coveredSkills: ['Sensors & Transducers', 'Microcontroller Programming', 'MQTT / Modbus', 'SCADA'],
    alignmentPercentage: 74,
    skillGaps: [
      { skill: 'Edge Analytics', demand: 'Moderate', coverage: 'Not covered', requiredProficiency: 'Intermediate', gap: 'Full gap', learningTime: '2 months', estimatedCost: '₹16,000', priority: 'Medium' },
    ],
  },
];

const INITIAL_TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'tp-pune-2026',
    title: 'Pune District EV & Green Mobility Workforce Acceleration',
    district: 'Pune',
    institution: 'Government ITI Aundh, Pune',
    courses: ['EV Diagnostic Technician', 'Battery Management Systems'],
    skills: ['EV Systems', 'CAN Bus', 'Diagnostics', 'High Voltage Safety'],
    targetAudience: 'Final Year ITI & Polytechnic Trainees',
    duration: '16 Weeks',
    trainer: 'Farhan Shaikh',
    startDate: '2026-10-15',
    endDate: '2027-02-15',
    status: 'Scheduled',
    progress: 25,
    budgetAllocated: 1250000,
  },
  {
    id: 'tp-mumbai-2026',
    title: 'Mumbai Metropolitan Cloud & Modern Web Application Track',
    district: 'Mumbai',
    institution: 'Government Technical Institute, Worli',
    courses: ['COPA React & Cloud Enrichment'],
    skills: ['React', 'Node.js', 'AWS Basics', 'Docker'],
    targetAudience: 'ITI COPA Graduates & Underemployed Youth',
    duration: '12 Weeks',
    trainer: 'Ananya Kulkarni',
    startDate: '2026-11-01',
    endDate: '2027-01-30',
    status: 'In Progress',
    progress: 40,
    budgetAllocated: 950000,
  },
  {
    id: 'tp-nashik-2026',
    title: 'Nashik Industrial Automation & CNC Machining Upskilling',
    district: 'Nashik',
    institution: 'Government ITI Satpur, Nashik',
    courses: ['CNC Turning & Milling Operation'],
    skills: ['CNC Programming', 'Quality Control', 'Industrial Safety'],
    targetAudience: 'Machinist Trade Apprentices',
    duration: '8 Weeks',
    trainer: 'Suresh Patil',
    startDate: '2026-09-15',
    endDate: '2026-11-15',
    status: 'In Progress',
    progress: 65,
    budgetAllocated: 780000,
  },
];

const INITIAL_TRAINERS: TrainerRecord[] = [
  {
    id: 1,
    name: 'Ananya Kulkarni',
    institute: 'Government ITI Aundh',
    district: 'Pune',
    skills: ['React', 'JavaScript', 'AWS', 'Python'],
    experience: 9,
    cert: 'Current',
    last: '2026-08-18',
    qualification: 'M.Tech, Computer Science',
    levels: [['JavaScript', 88], ['React', 82], ['AWS', 70], ['Teaching practice', 91]],
    availability: 'Available',
  },
  {
    id: 2,
    name: 'Suresh Patil',
    institute: 'Government ITI Pimpri',
    district: 'Pune',
    skills: ['Industrial IoT', 'PLC', 'SCADA', 'Sensors'],
    experience: 12,
    cert: 'Renewal due',
    last: '2026-07-11',
    qualification: 'B.E., Instrumentation',
    levels: [['Industrial IoT', 72], ['PLC', 86], ['Sensors', 79], ['Teaching practice', 84]],
    availability: 'Available',
  },
  {
    id: 3,
    name: 'Meera Jadhav',
    institute: 'Government Polytechnic Pune',
    district: 'Pune',
    skills: ['Python', 'Power BI', 'SQL', 'Data Analytics'],
    experience: 7,
    cert: 'Current',
    last: '2026-09-05',
    qualification: 'M.E., Computer Engineering',
    levels: [['Python', 84], ['Power BI', 78], ['Data analysis', 81], ['Teaching practice', 76]],
    availability: 'On Assignment',
  },
  {
    id: 4,
    name: 'Farhan Shaikh',
    institute: 'Government ITI Worli',
    district: 'Mumbai',
    skills: ['EV Diagnostics', 'Electrical Safety', 'CAN Bus'],
    experience: 10,
    cert: 'Development needed',
    last: '2026-05-23',
    qualification: 'B.E., Electrical Engineering',
    levels: [['EV Diagnostics', 65], ['Electrical Safety', 89], ['CAN Bus', 58], ['Teaching practice', 82]],
    availability: 'Available',
  },
  {
    id: 5,
    name: 'Nisha Pawar',
    institute: 'Government ITI Nagpur',
    district: 'Nagpur',
    skills: ['Solar PV', 'Renewable Tech', 'Microgrid Maintenance'],
    experience: 6,
    cert: 'Current',
    last: '2026-08-29',
    qualification: 'B.Tech, Energy Technology',
    levels: [['Solar PV', 85], ['Inverter Maintenance', 80], ['Safety Protocols', 92], ['Teaching practice', 78]],
    availability: 'Available',
  },
];

const INITIAL_EQUIPMENT: EquipmentRecord[] = [
  { id: 1, name: 'Arduino & Microcontroller Starter Kits', category: 'Embedded / IoT', required: 30, available: 18, shortage: 12, utilization: 86, unitCost: 4800, totalCost: 57600, institution: 'Govt ITI Aundh', district: 'Pune', maintenanceStatus: 'Operational' },
  { id: 2, name: 'Electric Vehicle High-Voltage Diagnostic Rig', category: 'Automotive / EV', required: 14, available: 8, shortage: 6, utilization: 74, unitCost: 185000, totalCost: 1110000, institution: 'Govt ITI Pimpri', district: 'Pune', maintenanceStatus: 'Operational' },
  { id: 3, name: 'Industrial PLC Trainer & Simulation Rig', category: 'Automation', required: 25, available: 22, shortage: 3, utilization: 81, unitCost: 92000, totalCost: 276000, institution: 'Govt ITI Satpur', district: 'Nashik', maintenanceStatus: 'Operational' },
  { id: 4, name: 'CNC 3-Axis Milling Simulator Station', category: 'Mechanical / Machining', required: 12, available: 9, shortage: 3, utilization: 69, unitCost: 240000, totalCost: 720000, institution: 'Govt ITI Kolhapur', district: 'Kolhapur', maintenanceStatus: 'Maintenance Due' },
  { id: 5, name: 'Solar PV Grid-Tied Practice Test Bench', category: 'Renewable Energy', required: 20, available: 15, shortage: 5, utilization: 77, unitCost: 36000, totalCost: 180000, institution: 'Govt ITI Nagpur', district: 'Nagpur', maintenanceStatus: 'Operational' },
];

const INITIAL_BUDGETS: BudgetRecord[] = [
  { id: 'b-pune-labour', category: 'Curriculum & Modern Lab Infrastructure', institution: 'State Directorate of Vocational Education', district: 'Pune', financialYear: '2026-2027', allocated: 4500000, spent: 3120000, remaining: 1380000, status: 'Healthy' },
  { id: 'b-mumbai-it', category: 'High-Tech Digital Training Kits & Cloud Licensing', institution: 'Worli ITI Excellence Centre', district: 'Mumbai', financialYear: '2026-2027', allocated: 3800000, spent: 2950000, remaining: 850000, status: 'Healthy' },
  { id: 'b-nashik-auto', category: 'Industrial Robotics & Precision Tooling Upgrades', institution: 'Satpur Advanced Training Hub', district: 'Nashik', financialYear: '2026-2027', allocated: 2600000, spent: 2450000, remaining: 150000, status: 'Threshold Warning' },
  { id: 'b-vidarbha-solar', category: 'Solar Energy & Green Tech Field Benches', institution: 'Nagpur ITI Cluster', district: 'Nagpur', financialYear: '2026-2027', allocated: 1800000, spent: 980000, remaining: 820000, status: 'Healthy' },
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 1,
    severity: 'Critical',
    title: 'Surging EV diagnostics demand requires immediate lab capacity review',
    district: 'Pune',
    skill: 'EV Diagnostics',
    period: 'Jul–Sep 2026',
    evidence: 'Mentions increased across 74 verified automotive vacancy records in Chakan & Talegaon corridors.',
    action: 'Review trainer and diagnostic rig capacity in Government ITI Pimpri.',
    status: 'New',
    read: false,
    category: 'training_deadline',
    timestamp: '2026-09-27T08:30:00Z',
  },
  {
    id: 2,
    severity: 'High',
    title: 'COPA curriculum alignment below 65% state benchmark threshold',
    district: 'Pune',
    skill: 'React.js & Cloud Basics',
    period: 'Apr–Sep 2026',
    evidence: 'COPA syllabus covers 28 of 45 contemporary market-demand skills in centralized industrial benchmark.',
    action: 'Open curriculum revision package with subject expert panel.',
    status: 'Under Review',
    read: false,
    category: 'certification_expiry',
    timestamp: '2026-09-26T14:15:00Z',
  },
  {
    id: 3,
    severity: 'Medium',
    title: 'Trainer capacity deficit signal detected for Industrial IoT trades',
    district: 'Nashik',
    skill: 'Industrial IoT',
    period: 'Q3 2026',
    evidence: 'Synthesized regional plan identifies 11 fewer certified trainers than scheduled scenario demand.',
    action: 'Validate trainer roster and schedule ToT (Training of Trainers) cohort.',
    status: 'Action Required',
    read: true,
    category: 'training_deadline',
    timestamp: '2026-09-25T11:45:00Z',
  },
  {
    id: 4,
    severity: 'Information',
    title: 'Adzuna Labour Market API synchronization successful',
    district: 'Statewide',
    skill: 'All Trades',
    period: 'Sep 2026',
    evidence: 'Real-time telemetry validated 59 active vacancies across Maharashtra industrial hubs.',
    action: 'Retain ingestion records for state audit and decision analysis.',
    status: 'Resolved',
    read: true,
    category: 'system_error',
    timestamp: '2026-09-27T17:48:00Z',
  },
];

const INITIAL_DATA_SOURCES: DataSourceRecord[] = [
  {
    id: 'src-adzuna',
    name: 'Adzuna Labour Market Telemetry API',
    provider: 'Adzuna Ltd.',
    url: 'https://api.adzuna.com/v1/api/jobs/in/search',
    apiStatus: 'Active',
    lastSuccessfulSync: new Date().toISOString(),
    lastFailure: null,
    updateFrequency: 'Real-time On-demand / Hourly Cache',
    recordCount: 59,
    dataType: 'Live Employer Vacancies & Wage Distributions',
    reliabilityScore: 98,
    notes: 'Configured server-side with ADZUNA_APP_ID and ADZUNA_APP_KEY in .env.',
  },
  {
    id: 'src-dvet',
    name: 'Maharashtra DVET ITI Curriculum & Institute Registry',
    provider: 'Directorate of Vocational Education and Training, Maharashtra',
    url: 'https://dvet.gov.in',
    apiStatus: 'Active',
    lastSuccessfulSync: '2026-09-26T09:00:00Z',
    lastFailure: null,
    updateFrequency: 'Monthly Scheduled Sync',
    recordCount: 418,
    dataType: 'Standardized Course Syllabus, Approved Seats & Institute Directories',
    reliabilityScore: 99,
    notes: 'Official state vocational standard mapping.',
  },
  {
    id: 'src-ncs',
    name: 'National Career Service (NCS) Public Portal Registry',
    provider: 'Ministry of Labour & Employment, Govt. of India',
    url: 'https://www.ncs.gov.in',
    apiStatus: 'Active',
    lastSuccessfulSync: '2026-09-25T12:00:00Z',
    lastFailure: null,
    updateFrequency: 'Daily Periodic Aggregation',
    recordCount: 1420,
    dataType: 'National Occupational Standards (NOS) & Apprenticeship Register',
    reliabilityScore: 95,
    notes: 'Authorized public interface compliance.',
  },
  {
    id: 'src-msda',
    name: 'Maharashtra State Skill Development Society (MSSDS)',
    provider: 'Skill, Employment, Entrepreneurship & Innovation Dept',
    url: 'https://www.mahaswayam.gov.in',
    apiStatus: 'Active',
    lastSuccessfulSync: '2026-09-26T16:30:00Z',
    lastFailure: null,
    updateFrequency: 'Weekly Scheduled Sync',
    recordCount: 890,
    dataType: 'Scheme Beneficiaries & District Training Allotments',
    reliabilityScore: 96,
    notes: 'State policy & welfare funding tracker.',
  },
];

const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-state-2026',
    title: 'Maharashtra Annual Labour Market Intelligence & Skill Outlook 2026-27',
    code: 'MS-LMIP-ANN-2026',
    category: 'Statewide Intelligence',
    description: 'Comprehensive analysis of 120,000+ vacancies, emerging automation trades, wage trends and inter-district labor flows.',
    publicationDate: '2026-09-20',
    source: 'Department of Skill, Employment, Entrepreneurship & Innovation',
    fileSize: '4.8 MB',
    format: 'PDF',
  },
  {
    id: 'rep-pune-skillgap',
    title: 'Pune District Industrial Corridor Skill Gap & EV Transition Study',
    code: 'MS-LMI-PUN-SG-01',
    category: 'District Skill Gap',
    district: 'Pune',
    description: 'Empirical assessment of electric vehicle manufacturing and software engineering requirements across Chakan and Hinjawadi clusters.',
    publicationDate: '2026-09-15',
    source: 'Pune District Skill Committee & MIDC Advisory Board',
    fileSize: '3.2 MB',
    format: 'PDF',
  },
  {
    id: 'rep-curriculum-copa',
    title: 'Curriculum Modernization Whitepaper: Bridging ITI COPA to Modern Cloud & Web Stack',
    code: 'DVET-CW-2026-03',
    category: 'Curriculum Review',
    description: 'Actionable proposal to introduce React, REST APIs, and Cloud fundamentals into the two-semester COPA trade standard.',
    publicationDate: '2026-08-30',
    source: 'DVET State Subject Expert Panel',
    fileSize: '2.1 MB',
    format: 'PDF',
  },
  {
    id: 'rep-trainer-capacity',
    title: 'Statewide Trainer Competency & Modernization Roster Assessment',
    code: 'DVET-TR-CAP-2026',
    category: 'Capacity Planning',
    description: 'Evaluation of 2,400+ vocational trainers across all 36 Maharashtra districts with upskilling recommendations for Industry 4.0.',
    publicationDate: '2026-08-10',
    source: 'Maharashtra Vocational Training Academy',
    fileSize: '5.4 MB',
    format: 'PDF',
  },
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'aud-1', timestamp: '2026-09-27T17:48:02Z', user: 'System Service', role: 'System Admin', action: 'Resume Upload & OCR Analysis', module: 'Resume Analyzer', entity: 'M_Navaneeth_Resume.pdf', previousState: 'Unprocessed Document Buffer', newState: 'Structured Candidate Profile Extracted', status: 'Completed' },
  { id: 'aud-2', timestamp: '2026-09-27T17:48:12Z', user: 'System Service', role: 'System Admin', action: 'Adzuna Labour Market API Search', module: 'Job Matcher', entity: 'Candidate: M Navaneeth (India/Maharashtra)', previousState: 'Cache Lookup', newState: '59 Live Vacancies Retrieved & Matched', status: 'Completed' },
  { id: 'aud-3', timestamp: '2026-09-27T14:30:00Z', user: 'Asha Patil', role: 'District Officer', action: 'Updated Curriculum Review Stage', module: 'Curriculum Review', entity: 'COPA Enrichment Proposal', previousState: 'Department Review: Complete', newState: 'Technical Review: In review', status: 'Completed' },
  { id: 'aud-4', timestamp: '2026-09-26T11:20:00Z', user: 'Rohan Desai', role: 'State Admin', action: 'Created Training Plan', module: 'Training Plans', entity: 'Pune District EV & Green Mobility Workforce Acceleration', previousState: 'None', newState: 'Scheduled', status: 'Completed' },
  { id: 'aud-5', timestamp: '2026-09-25T16:45:00Z', user: 'Meera Joshi', role: 'Super Admin', action: 'Data Source Verification Ping', module: 'Data Sources', entity: 'Adzuna Labour Market Telemetry API', previousState: 'Configured', newState: 'Active (Status: 200 OK)', status: 'Completed' },
];

const INITIAL_USERS: PlatformUser[] = [
  { id: 'u-1', name: 'Rohan Desai', email: 'rohan.desai@maharashtra.gov.in', role: 'State Admin', permissions: 'Statewide analytics, budgets, reports, sign-off approval', status: 'Active', lastLogin: '2026-09-27T16:40:00Z', mfa: 'Enabled' },
  { id: 'u-2', name: 'Asha Patil', email: 'asha.patil@dvet.gov.in', role: 'District Officer', permissions: 'District intelligence, local training plans, institute monitoring', status: 'Active', lastLogin: '2026-09-27T15:20:00Z', mfa: 'Enabled' },
  { id: 'u-3', name: 'Vijay Sawant', email: 'principal@iti-aundh.edu.in', role: 'ITI Principal', permissions: 'Institute courses, trainers, equipment inventory, student enrollment', status: 'Active', lastLogin: '2026-09-26T18:10:00Z', mfa: 'Enabled' },
  { id: 'u-4', name: 'Ananya Kulkarni', email: 'ananya.kulkarni@iti-worli.edu.in', role: 'Trainer', permissions: 'Own profile, class schedules, trainee attendance, skill assessment', status: 'Active', lastLogin: '2026-09-26T12:08:00Z', mfa: 'Enabled' },
  { id: 'u-5', name: 'Sahyadri Digital HR', email: 'careers@sahyadridigital.com', role: 'Employer', permissions: 'Post job vacancies, search candidates, shortlist applicants', status: 'Active', lastLogin: '2026-09-27T11:00:00Z', mfa: 'Enabled' },
  { id: 'u-6', name: 'M Navaneeth', email: 'm.navaneeth@example.edu.in', role: 'Student', permissions: 'View profile, upload resume, view matching jobs, apply to vacancies', status: 'Active', lastLogin: '2026-09-27T17:50:00Z', mfa: 'Pending' },
];

const INITIAL_EMPLOYER_JOBS: EmployerJobPost[] = [
  {
    id: 'emp-job-1',
    title: 'Senior Frontend Engineer (React/TypeScript)',
    company: 'Sahyadri Digital Systems',
    district: 'Pune',
    location: 'Hinjawadi Phase 2, Pune',
    industry: 'Information Technology',
    experience: '2–4 years',
    salaryMin: 700000,
    salaryMax: 950000,
    salaryText: '₹7.0L - ₹9.5L',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'REST APIs'],
    description: 'Lead development of citizen-scale web platforms. Candidates must demonstrate solid expertise in React, TypeScript, and modern state architecture.',
    postedDate: '2026-09-24',
    status: 'Active',
    applicantsCount: 6,
  },
  {
    id: 'emp-job-2',
    title: 'Electric Vehicle Diagnostic Technician',
    company: 'Deccan Mobility Works',
    district: 'Pune',
    location: 'Chakan Industrial Zone, Pune',
    industry: 'Automotive & Clean Energy',
    experience: '1–3 years',
    salaryMin: 450000,
    salaryMax: 600000,
    salaryText: '₹4.5L - ₹6.0L',
    skills: ['EV Systems', 'CAN Bus', 'Diagnostics', 'Electrical Safety'],
    description: 'Perform fault identification and firmware updates across commercial EV fleets. Experience with battery management instrumentation preferred.',
    postedDate: '2026-09-22',
    status: 'Active',
    applicantsCount: 11,
  },
];

const INITIAL_APPLICATIONS: CandidateApplication[] = [
  {
    id: 'app-1',
    jobId: 'emp-job-1',
    jobTitle: 'Senior Frontend Engineer (React/TypeScript)',
    company: 'Sahyadri Digital Systems',
    district: 'Pune',
    applicantName: 'M Navaneeth',
    applicantEmail: 'm.navaneeth@example.edu.in',
    applicantPhone: '+91 98765 43210',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    matchScore: 95,
    appliedAt: '2026-09-27T17:55:00Z',
    status: 'Reviewing',
  },
];

const DEFAULT_STATE: AppPersistentState = {
  userProfile: INITIAL_PROFILE,
  savedJobIds: [],
  jobApplications: INITIAL_APPLICATIONS,
  employerJobs: INITIAL_EMPLOYER_JOBS,
  shortlistedCandidates: ['user-default-candidate'],
  curriculumRecords: INITIAL_CURRICULUM,
  curriculumReviews: [
    {
      id: 'rev-1',
      courseId: 'curr-copa',
      courseName: 'COPA',
      reviewerName: 'Dr. Sudhir Deshmukh',
      reviewerRole: 'Subject Expert Panel Lead',
      timestamp: '2026-09-26T14:00:00Z',
      status: 'Under Review',
      comments: 'Recommend introducing modern React and Cloud modules into Semester 2.',
    }
  ],
  curriculumSignOffs: {
    'curr-copa': [
      { id: 'so-1', stageName: 'Draft', courseId: 'curr-copa', owner: 'Curriculum Analyst', date: '2026-09-18', status: 'Complete', comments: 'Market demand evidence package compiled.', officerRole: 'Analyst', auditId: 'aud-c1' },
      { id: 'so-2', stageName: 'Department Review', courseId: 'curr-copa', owner: 'DVET Joint Director', date: '2026-09-21', status: 'Complete', comments: 'Approved for technical review panel.', officerRole: 'Joint Director', auditId: 'aud-c2' },
      { id: 'so-3', stageName: 'Technical Review', courseId: 'curr-copa', owner: 'Subject Expert Panel', date: '2026-09-26', status: 'In review', comments: 'Benchmarking module depth against industry apprenticeships.', officerRole: 'Panelist', auditId: 'aud-c3' },
    ]
  },
  trainingPlans: INITIAL_TRAINING_PLANS,
  trainers: INITIAL_TRAINERS,
  equipment: INITIAL_EQUIPMENT,
  budgets: INITIAL_BUDGETS,
  alerts: INITIAL_ALERTS,
  dataQuality: {
    overallQualityScore: 92,
    totalRecordsChecked: 1485,
    missingDistrictsCount: 14,
    duplicatesDetectedCount: 6,
    invalidLocationsCount: 3,
    staleRecordsCount: 22,
    extractionConfidenceWarnings: 5,
    lastRunTimestamp: new Date().toISOString(),
    qualityIssues: [
      { issue: 'Missing district metadata in third-party feeds', severity: 'Medium', count: '14', description: 'Records lack exact Maharashtra district codes; mapped to state aggregate.', recommendedAction: 'Apply reverse geocoding heuristics based on locality tags.' },
      { issue: 'Duplicate postings detected across sources', severity: 'Low', count: '6', description: 'Identical title and company postings detected across employer portal and external listings.', recommendedAction: 'Retain the canonical source record with higher evidence score.' },
    ],
  },
  dataSources: INITIAL_DATA_SOURCES,
  reports: INITIAL_REPORTS,
  auditLogs: INITIAL_AUDIT_LOGS,
  users: INITIAL_USERS,
  assistantChatHistory: [],
  linkedinSession: null,
  latestResumeAnalysis: null,
  lastUpdated: new Date().toISOString(),
};

function ensureStoreExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_STATE, null, 2), 'utf-8');
  }
}

export function getStoredState(): AppPersistentState {
  try {
    ensureStoreExists();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure all critical top-level keys exist if migrating from older store
    return {
      ...DEFAULT_STATE,
      ...parsed,
      userProfile: parsed.userProfile || DEFAULT_STATE.userProfile,
      savedJobIds: parsed.savedJobIds || DEFAULT_STATE.savedJobIds,
      jobApplications: parsed.jobApplications || DEFAULT_STATE.jobApplications,
      employerJobs: parsed.employerJobs || DEFAULT_STATE.employerJobs,
      shortlistedCandidates: parsed.shortlistedCandidates || DEFAULT_STATE.shortlistedCandidates,
      curriculumRecords: parsed.curriculumRecords || DEFAULT_STATE.curriculumRecords,
      trainingPlans: parsed.trainingPlans || DEFAULT_STATE.trainingPlans,
      trainers: parsed.trainers || DEFAULT_STATE.trainers,
      equipment: parsed.equipment || DEFAULT_STATE.equipment,
      budgets: parsed.budgets || DEFAULT_STATE.budgets,
      alerts: parsed.alerts || DEFAULT_STATE.alerts,
      dataSources: parsed.dataSources || DEFAULT_STATE.dataSources,
      reports: parsed.reports || DEFAULT_STATE.reports,
      auditLogs: parsed.auditLogs || DEFAULT_STATE.auditLogs,
      users: parsed.users || DEFAULT_STATE.users,
      assistantChatHistory: parsed.assistantChatHistory || [],
    };
  } catch (err) {
    console.warn('[Persistence] Error reading store.json, using default state:', err);
    return DEFAULT_STATE;
  }
}

export function saveStoredState(updates: Partial<AppPersistentState>): AppPersistentState {
  try {
    ensureStoreExists();
    const current = getStoredState();
    const merged: AppPersistentState = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2), 'utf-8');
    return merged;
  } catch (err) {
    console.error('[Persistence] Error writing store.json:', err);
    return { ...DEFAULT_STATE, ...updates };
  }
}

export function appendAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
  const newEntry: AuditLogEntry = {
    id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  const state = getStoredState();
  const updatedLogs = [newEntry, ...(state.auditLogs || [])].slice(0, 200); // keep 200 logs
  saveStoredState({ auditLogs: updatedLogs });
  return newEntry;
}
