import { 
  JobRecord, CourseData, SkillGapRow, AlertRecord, ApprovalStage, 
  TrainerRecord, EquipmentRecord, CandidateRecord, ScholarshipRecord, 
  AuditRecord, QualityIssue, DemoUser, NotificationItem, AssistantResponse, RouteId
} from '../types';

export interface DistrictItem {
  name: string;
  jobs: number;
  topSkill: string;
}

export const DISTRICTS_DATA: DistrictItem[] = [
  { name: 'Pune', jobs: 18420, topSkill: 'EV Technology' },
  { name: 'Mumbai', jobs: 16980, topSkill: 'Data Analytics' },
  { name: 'Nashik', jobs: 7820, topSkill: 'Industrial IoT' },
  { name: 'Nagpur', jobs: 7250, topSkill: 'Solar Installation' },
  { name: 'Thane', jobs: 11940, topSkill: 'Cloud' },
  { name: 'Kolhapur', jobs: 4890, topSkill: 'CNC' },
  { name: 'Nanded', jobs: 3260, topSkill: 'Healthcare' },
  { name: 'Amravati', jobs: 3710, topSkill: 'Logistics' },
  { name: 'Chhatrapati Sambhajinagar', jobs: 6940, topSkill: 'PLC' }
];

export const INITIAL_JOBS: JobRecord[] = [
  {
    id: 1,
    title: 'Frontend Application Developer',
    employer: 'Sahyadri Digital Systems',
    industry: 'IT',
    district: 'Pune',
    skills: ['React', 'TypeScript', 'AWS'],
    experience: '2–4 years',
    salary: 850000,
    salaryText: '₹6.5–8.5L',
    posted: '2026-09-24',
    source: 'Employer demo feed',
    status: 'Review',
    description: 'Build responsive citizen-service interfaces using advanced React and TypeScript. Deploy tested applications to AWS. Candidates should have 2–4 years of frontend experience.',
    extracts: [
      ['React', 'Advanced', 94, 'Build responsive citizen-service interfaces using advanced React and TypeScript.'],
      ['TypeScript', 'Intermediate', 91, 'using advanced React and TypeScript'],
      ['AWS', 'Beginner', 86, 'Deploy tested applications to AWS.']
    ]
  },
  {
    id: 2,
    title: 'CNC Machine Technician',
    employer: 'Mula Engineering Works',
    industry: 'Manufacturing',
    district: 'Kolhapur',
    skills: ['CNC', 'Quality Control'],
    experience: '2+ years',
    salary: 420000,
    salaryText: '₹3.2–4.2L',
    posted: '2026-09-23',
    source: 'Institute partner feed',
    status: 'Validated',
    description: 'Operate CNC turning centres, interpret technical drawings and complete dimensional quality-control checks.',
    extracts: [
      ['CNC', 'Intermediate', 96, 'Operate CNC turning centres'],
      ['Quality Control', 'Intermediate', 89, 'complete dimensional quality-control checks.']
    ]
  },
  {
    id: 3,
    title: 'EV Diagnostic Technician',
    employer: 'Deccan Mobility Works',
    industry: 'Automotive',
    district: 'Pune',
    skills: ['EV Systems', 'Diagnostics', 'CAN Bus'],
    experience: '1–3 years',
    salary: 560000,
    salaryText: '₹4.2–5.6L',
    posted: '2026-09-22',
    source: 'Employer demo feed',
    status: 'Validated',
    description: 'Diagnose electric vehicle battery and drivetrain faults using diagnostic tools and CAN bus analysis.',
    extracts: [
      ['EV Systems', 'Intermediate', 95, 'Diagnose electric vehicle battery and drivetrain faults'],
      ['CAN Bus', 'Intermediate', 92, 'using diagnostic tools and CAN bus analysis.']
    ]
  },
  {
    id: 4,
    title: 'Embedded Electronics Associate',
    employer: 'Vidarbha Circuits',
    industry: 'Electronics',
    district: 'Nagpur',
    skills: ['Embedded C', 'PCB Testing'],
    experience: '0–2 years',
    salary: 390000,
    salaryText: '₹3.0–3.9L',
    posted: '2026-09-21',
    source: 'Synthetic job board',
    status: 'Review',
    description: 'Test assembled PCBs and support embedded C firmware validation for industrial control products.',
    extracts: [
      ['Embedded C', 'Beginner', 88, 'support embedded C firmware validation'],
      ['PCB Testing', 'Intermediate', 93, 'Test assembled PCBs']
    ]
  },
  {
    id: 5,
    title: 'Clinical Data Coordinator',
    employer: 'Seva Health Network',
    industry: 'Healthcare',
    district: 'Mumbai',
    skills: ['Data Quality', 'Excel', 'Healthcare Data'],
    experience: '2–4 years',
    salary: 610000,
    salaryText: '₹4.8–6.1L',
    posted: '2026-09-20',
    source: 'Employer demo feed',
    status: 'Validated',
    description: 'Coordinate clinical data quality reviews using Excel and approved healthcare data procedures.',
    extracts: [
      ['Data Quality', 'Intermediate', 94, 'Coordinate clinical data quality reviews'],
      ['Excel', 'Advanced', 91, 'using Excel']
    ]
  },
  {
    id: 6,
    title: 'Warehouse Operations Planner',
    employer: 'Konkan Logistics Services',
    industry: 'Logistics',
    district: 'Thane',
    skills: ['Inventory', 'Power BI'],
    experience: '3–5 years',
    salary: 670000,
    salaryText: '₹5.1–6.7L',
    posted: '2026-09-19',
    source: 'Synthetic job board',
    status: 'Review',
    description: 'Plan warehouse inventory flows and create operational dashboards in Power BI.',
    extracts: [
      ['Inventory', 'Advanced', 90, 'Plan warehouse inventory flows'],
      ['Power BI', 'Intermediate', 94, 'create operational dashboards in Power BI.']
    ]
  },
  {
    id: 7,
    title: 'Banking Data Analyst',
    employer: 'Maharashtra Cooperative Digital',
    industry: 'Banking',
    district: 'Mumbai',
    skills: ['SQL', 'Python', 'Power BI'],
    experience: '2–4 years',
    salary: 920000,
    salaryText: '₹7.0–9.2L',
    posted: '2026-09-18',
    source: 'Employer demo feed',
    status: 'Validated',
    description: 'Analyse synthetic transaction portfolios with SQL and Python and communicate findings through Power BI.',
    extracts: [
      ['SQL', 'Advanced', 96, 'with SQL and Python'],
      ['Python', 'Intermediate', 93, 'with SQL and Python'],
      ['Power BI', 'Intermediate', 90, 'through Power BI.']
    ]
  },
  {
    id: 8,
    title: 'Site Planning Technician',
    employer: 'Godavari Buildworks',
    industry: 'Construction',
    district: 'Nashik',
    skills: ['AutoCAD', 'Estimation'],
    experience: '2–5 years',
    salary: 520000,
    salaryText: '₹4.0–5.2L',
    posted: '2026-09-17',
    source: 'Institute partner feed',
    status: 'Review',
    description: 'Prepare AutoCAD site drawings and support quantity estimation for public infrastructure projects.',
    extracts: [
      ['AutoCAD', 'Advanced', 95, 'Prepare AutoCAD site drawings'],
      ['Estimation', 'Intermediate', 88, 'support quantity estimation']
    ]
  },
  {
    id: 9,
    title: 'Solar Installation Supervisor',
    employer: 'Vidarbha Renewable Projects',
    industry: 'Renewable Energy',
    district: 'Nagpur',
    skills: ['Solar PV', 'Electrical Safety'],
    experience: '3–5 years',
    salary: 590000,
    salaryText: '₹4.6–5.9L',
    posted: '2026-09-16',
    source: 'Employer demo feed',
    status: 'Validated',
    description: 'Supervise rooftop solar PV installation teams and enforce electrical safety procedures.',
    extracts: [
      ['Solar PV', 'Advanced', 96, 'Supervise rooftop solar PV installation teams'],
      ['Electrical Safety', 'Advanced', 94, 'enforce electrical safety procedures.']
    ]
  },
  {
    id: 10,
    title: 'Telecom Network Associate',
    employer: 'Marathwada Connect',
    industry: 'Telecom',
    district: 'Chhatrapati Sambhajinagar',
    skills: ['Fiber Optics', 'Network Testing'],
    experience: '1–3 years',
    salary: 440000,
    salaryText: '₹3.4–4.4L',
    posted: '2026-09-15',
    source: 'Synthetic job board',
    status: 'Review',
    description: 'Install fiber optic links and perform network testing using calibrated field instruments.',
    extracts: [
      ['Fiber Optics', 'Intermediate', 95, 'Install fiber optic links'],
      ['Network Testing', 'Intermediate', 91, 'perform network testing']
    ]
  },
  {
    id: 11,
    title: 'Retail Operations Analyst',
    employer: 'Western Retail Collective',
    industry: 'Retail',
    district: 'Pune',
    skills: ['Excel', 'Inventory', 'Data Analytics'],
    experience: '1–3 years',
    salary: 510000,
    salaryText: '₹3.9–5.1L',
    posted: '2026-09-14',
    source: 'Employer demo feed',
    status: 'Validated',
    description: 'Use Excel and data analytics to monitor retail inventory and store operations.',
    extracts: [
      ['Excel', 'Advanced', 94, 'Use Excel and data analytics'],
      ['Data Analytics', 'Intermediate', 92, 'Use Excel and data analytics'],
      ['Inventory', 'Intermediate', 89, 'monitor retail inventory']
    ]
  }
];

export const COURSES_DATA: Record<string, CourseData> = {
  copa: {
    name: 'Computer Operator & Programming Assistant (COPA)',
    market: [
      'HTML', 'CSS', 'JavaScript', 'Programming Logic', 'Databases', 'Python', 'React.js', 
      'AWS Basics', 'Git', 'REST APIs', 'Linux', 'Cybersecurity', 'Excel', 'Power BI', 
      'Networking', 'Cloud Concepts', 'UI Design', 'Testing', 'Agile', 'Node.js', 
      'TypeScript', 'Data Analytics', 'SQL', 'Java', 'Spring Boot', 'Docker', 'Microservices', 
      'MongoDB', 'Web Accessibility', 'DevOps', 'API Security', 'Communication', 'Problem Solving', 
      'Version Control', 'Mobile Web', 'Deployment', 'JSON', 'Debugging', 'AI Fundamentals', 
      'Data Privacy', 'Operating Systems', 'Hardware Basics', 'Office Tools', 'Email Tools', 
      'Employability Skills'
    ],
    covered: [
      'HTML', 'CSS', 'JavaScript', 'Programming Logic', 'Databases', 'Excel', 'Networking', 
      'SQL', 'Java', 'Communication', 'Problem Solving', 'Operating Systems', 'Hardware Basics', 
      'Office Tools', 'Email Tools', 'Employability Skills', 'Linux', 'Cybersecurity', 'UI Design', 
      'Testing', 'JSON', 'Debugging', 'Data Privacy', 'Git', 'Version Control', 
      'Web Accessibility', 'Agile', 'Data Analytics'
    ],
    institutes: 84,
    students: 6240,
    placement: '58%',
    review: '12 Jul 2026'
  },
  electrical: {
    name: 'Electrical Technician',
    market: Array.from({ length: 42 }, (_, i) => `Electrical skill ${i + 1}`),
    covered: Array.from({ length: 34 }, (_, i) => `Electrical skill ${i + 1}`),
    institutes: 112,
    students: 5180,
    placement: '71%',
    review: '08 Aug 2026'
  },
  iot: {
    name: 'IoT Technician',
    market: Array.from({ length: 38 }, (_, i) => `IoT skill ${i + 1}`),
    covered: Array.from({ length: 28 }, (_, i) => `IoT skill ${i + 1}`),
    institutes: 37,
    students: 1960,
    placement: '66%',
    review: '29 Jun 2026'
  }
};

export const SKILL_GAPS_DATA: Record<string, SkillGapRow[]> = {
  copa: [
    { skill: 'React.js', demand: 'High', coverage: 'Not covered', requiredProficiency: 'Intermediate', gap: 'Full gap', learningTime: '3 months', estimatedCost: '₹18,000', priority: 'High' },
    { skill: 'Python', demand: 'High', coverage: 'Foundation only', requiredProficiency: 'Advanced', gap: 'Proficiency gap', learningTime: '2 months', estimatedCost: '₹14,000', priority: 'High' },
    { skill: 'AWS Basics', demand: 'Moderate', coverage: 'Not covered', requiredProficiency: 'Beginner', gap: 'Full gap', learningTime: '1 month', estimatedCost: '₹9,000', priority: 'Medium' },
    { skill: 'REST APIs', demand: 'High', coverage: 'Introductory', requiredProficiency: 'Intermediate', gap: 'Coverage gap', learningTime: '6 weeks', estimatedCost: '₹11,000', priority: 'High' },
    { skill: 'Docker', demand: 'Moderate', coverage: 'Not covered', requiredProficiency: 'Beginner', gap: 'Full gap', learningTime: '1 month', estimatedCost: '₹8,500', priority: 'Medium' }
  ],
  electrical: [
    { skill: 'EV Safety', demand: 'High', coverage: 'Foundation only', requiredProficiency: 'Intermediate', gap: 'Proficiency gap', learningTime: '6 weeks', estimatedCost: '₹12,000', priority: 'High' }
  ],
  iot: [
    { skill: 'Edge Analytics', demand: 'Moderate', coverage: 'Not covered', requiredProficiency: 'Intermediate', gap: 'Full gap', learningTime: '2 months', estimatedCost: '₹16,000', priority: 'Medium' }
  ]
};

export const INITIAL_ALERTS: AlertRecord[] = [
  {
    id: 1,
    severity: 'Critical',
    title: 'Skill demand change detected in selected district',
    district: 'Pune',
    skill: 'EV Diagnostics',
    period: 'Jul–Sep 2026',
    evidence: 'Mentions increased across 74 synthetic automotive job records.',
    action: 'Review trainer and equipment capacity.',
    status: 'New'
  },
  {
    id: 2,
    severity: 'High',
    title: 'Course alignment review threshold reached',
    district: 'Pune',
    skill: 'React.js',
    period: 'Apr–Sep 2026',
    evidence: 'COPA covers 28 of 45 market-demand skills in the centralized demo set.',
    action: 'Open curriculum evidence review.',
    status: 'Under Review'
  },
  {
    id: 3,
    severity: 'Medium',
    title: 'Trainer capacity gap signal',
    district: 'Nashik',
    skill: 'Industrial IoT',
    period: 'Q2 2026',
    evidence: 'Synthetic capacity plan identifies 11 fewer trainers than scenario demand.',
    action: 'Validate trainer roster and plan upskilling.',
    status: 'Action Required'
  },
  {
    id: 4,
    severity: 'Low',
    title: 'Placement outcome refresh due',
    district: 'Nagpur',
    skill: 'Solar PV',
    period: '2025–26 cohort',
    evidence: 'Last synthetic placement review exceeds the 90-day demo threshold.',
    action: 'Request institute outcome update.',
    status: 'New'
  },
  {
    id: 5,
    severity: 'Information',
    title: 'New employer validation completed',
    district: 'Mumbai',
    skill: 'Data Analytics',
    period: 'Sep 2026',
    evidence: 'Three synthetic employer records passed reviewer validation.',
    action: 'No action required; retain for audit.',
    status: 'Resolved'
  }
];

export const INITIAL_APPROVAL_STAGES: ApprovalStage[] = [
  { name: 'Draft', owner: 'Curriculum Analyst', date: '18 Sep 2026', status: 'Complete', comments: 'Evidence summary drafted.' },
  { name: 'Department Review', owner: 'Department Reviewer', date: '21 Sep 2026', status: 'Complete', comments: 'Scope accepted for review.' },
  { name: 'Technical Review', owner: 'Subject Expert Panel', date: '26 Sep 2026', status: 'In review', comments: 'Validating module depth.' },
  { name: 'Industry Review', owner: 'Employer Advisory Group', date: 'Not scheduled', status: 'Pending', comments: 'Awaiting request.' },
  { name: 'Approval', owner: 'Authorized Officer', date: 'Not scheduled', status: 'Pending', comments: 'No decision recorded.' },
  { name: 'Trainer Preparation', owner: 'Institute Network', date: 'Not scheduled', status: 'Pending', comments: 'Starts only after approval.' },
  { name: 'Implementation', owner: 'Institutes', date: 'Not scheduled', status: 'Pending', comments: 'Not started.' },
  { name: 'Evaluation', owner: 'Monitoring Unit', date: 'Not scheduled', status: 'Pending', comments: 'Not started.' }
];

export const TRAINERS_DATA: TrainerRecord[] = [
  {
    id: 1,
    name: 'Ananya Kulkarni',
    institute: 'Aundh ITI',
    skills: ['React', 'JavaScript', 'AWS'],
    experience: 9,
    cert: 'Current',
    last: '2026-08-18',
    qualification: 'M.Tech, Computer Science',
    levels: [['JavaScript', 88], ['React', 67], ['AWS', 42], ['Teaching practice', 91]]
  },
  {
    id: 2,
    name: 'Suresh Patil',
    institute: 'Pimpri ITI',
    skills: ['Industrial IoT', 'PLC'],
    experience: 12,
    cert: 'Renewal due',
    last: '2026-07-11',
    qualification: 'B.E., Instrumentation',
    levels: [['Industrial IoT', 72], ['PLC', 86], ['Sensors', 79], ['Teaching practice', 84]]
  },
  {
    id: 3,
    name: 'Meera Jadhav',
    institute: 'Govt. Polytechnic Pune',
    skills: ['Python', 'Power BI'],
    experience: 7,
    cert: 'Current',
    last: '2026-09-05',
    qualification: 'M.E., Computer Engineering',
    levels: [['Python', 84], ['Power BI', 78], ['Data analysis', 81], ['Teaching practice', 76]]
  },
  {
    id: 4,
    name: 'Farhan Shaikh',
    institute: 'Aundh ITI',
    skills: ['EV Diagnostics', 'Electrical Safety'],
    experience: 10,
    cert: 'Development needed',
    last: '2026-05-23',
    qualification: 'B.E., Electrical Engineering',
    levels: [['EV Diagnostics', 61], ['Electrical Safety', 89], ['CAN Bus', 54], ['Teaching practice', 82]]
  },
  {
    id: 5,
    name: 'Nisha Pawar',
    institute: 'Pimpri ITI',
    skills: ['React', 'Python'],
    experience: 5,
    cert: 'Current',
    last: '2026-08-29',
    qualification: 'B.Tech, Information Technology',
    levels: [['React', 75], ['Python', 72], ['Web accessibility', 68], ['Teaching practice', 74]]
  }
];

export const EQUIPMENT_DATA: EquipmentRecord[] = [
  { name: 'Arduino Kit', required: 30, available: 18, shortage: 12, utilization: 86, unitCost: 4800, totalCost: 57600 },
  { name: 'EV Diagnostic Rig', required: 14, available: 8, shortage: 6, utilization: 74, unitCost: 185000, totalCost: 1110000 },
  { name: 'PLC Trainer', required: 25, available: 22, shortage: 3, utilization: 81, unitCost: 92000, totalCost: 276000 },
  { name: 'CNC Simulator', required: 12, available: 9, shortage: 3, utilization: 69, unitCost: 240000, totalCost: 720000 },
  { name: 'Solar PV Practice Set', required: 20, available: 15, shortage: 5, utilization: 77, unitCost: 36000, totalCost: 180000 }
];

export const CANDIDATES_DATA: CandidateRecord[] = [
  { name: 'Aarav Shinde', education: 'Diploma, Computer Engineering', district: 'Pune', skills: ['React', 'JavaScript', 'Git'], projects: '2 verified demo projects', availability: 'Available' },
  { name: 'Isha More', education: 'B.Sc. Computer Science', district: 'Pune', skills: ['Python', 'Power BI', 'SQL'], projects: '3 verified demo projects', availability: 'Available' },
  { name: 'Zoya Khan', education: 'Diploma, IT', district: 'Mumbai', skills: ['JavaScript', 'React', 'Accessibility'], projects: '2 verified demo projects', availability: 'In training' },
  { name: 'Vedant Kale', education: 'ITI COPA', district: 'Nagpur', skills: ['Python', 'Excel', 'Data Analytics'], projects: '1 verified demo project', availability: 'Available' }
];

export const SCHOLARSHIPS_DATA: ScholarshipRecord[] = [
  {
    name: 'District Digital Learning Support — Demo Entry',
    district: 'Pune',
    education: 'Diploma',
    course: 'Digital Skills',
    eligibility: 'Merit-based demo',
    benefit: 'Illustrative course-fee support up to ₹18,000',
    deadline: '15 Dec 2026 (demo date)'
  },
  {
    name: 'Women in Technical Trades Support — Demo Entry',
    district: 'Nagpur',
    education: 'ITI',
    course: 'Manufacturing',
    eligibility: 'Women learners demo',
    benefit: 'Illustrative equipment and course support',
    deadline: '20 Jan 2027 (demo date)'
  },
  {
    name: 'Renewable Skills Access Grant — Demo Entry',
    district: 'Mumbai',
    education: 'Degree',
    course: 'Renewable Energy',
    eligibility: 'Need-based demo',
    benefit: 'Illustrative training support up to ₹24,000',
    deadline: '31 Jan 2027 (demo date)'
  }
];

export const AUDIT_LOGS_DATA: AuditRecord[] = [
  { timestamp: '26 Sep 2026 · 16:42', user: 'Asha Patil', role: 'District Officer', action: 'Updated curriculum review status', entity: 'COPA enrichment proposal', previousState: 'Technical Review: Pending', newState: 'Technical Review: In review', status: 'Completed' },
  { timestamp: '26 Sep 2026 · 15:18', user: 'Rohan Desai', role: 'State Admin', action: 'Generated district training plan', entity: 'Pune FY 2027 plan', previousState: 'No plan', newState: 'Draft generated', status: 'Completed' },
  { timestamp: '26 Sep 2026 · 14:05', user: 'Meera Joshi', role: 'Curriculum Reviewer', action: 'Approved evidence package', entity: 'EV Diagnostics module', previousState: 'Under Review', newState: 'Evidence accepted', status: 'Completed' },
  { timestamp: '26 Sep 2026 · 11:22', user: 'System Demo User', role: 'Super Admin', action: 'Login', entity: 'Administration workspace', previousState: 'Signed out', newState: 'Session active', status: 'Completed' },
  { timestamp: '25 Sep 2026 · 17:50', user: 'Asha Patil', role: 'District Officer', action: 'Updated alert status', entity: 'Alert ALT-104', previousState: 'New', newState: 'Under Review', status: 'Completed' },
  { timestamp: '25 Sep 2026 · 12:14', user: 'Rohan Desai', role: 'State Admin', action: 'Generated report', entity: 'State Labour Market Report', previousState: 'Not generated', newState: 'Preview generated', status: 'Pending Review' },
  { timestamp: '24 Sep 2026 · 10:02', user: 'System Demo User', role: 'Super Admin', action: 'Updated role permission', entity: 'Trainer role', previousState: 'View own profile', newState: 'View profile + learning plan', status: 'Completed' }
];

export const QUALITY_ISSUES_DATA: QualityIssue[] = [
  { issue: 'Missing records', severity: 'Critical', count: '2,836', description: '23% of demo job records are missing district information.', recommendedAction: 'Validate locations against the district reference list.' },
  { issue: 'Duplicate records', severity: 'High', count: '412', description: 'Potential duplicate jobs detected across synthetic feeds.', recommendedAction: 'Review match groups and retain the best-evidenced record.' },
  { issue: 'Invalid locations', severity: 'High', count: '186', description: 'Location values do not map to the demo district list.', recommendedAction: 'Standardize spelling and request source correction.' },
  { issue: 'Stale data', severity: 'Medium', count: '1,024', description: 'Records exceed the 90-day review threshold.', recommendedAction: 'Request source refresh before trend analysis.' },
  { issue: 'Extraction errors', severity: 'Medium', count: '74', description: 'Skill extraction confidence fell below the demo threshold.', recommendedAction: 'Send records for human extraction review.' },
  { issue: 'Anomalies', severity: 'Low', count: '29', description: 'Unusual salary or demand values require inspection.', recommendedAction: 'Compare with source evidence; do not auto-delete.' }
];

export const DEMO_USERS_DATA: DemoUser[] = [
  { name: 'Rohan Desai', role: 'State Admin', permissions: 'State analytics, budgets, reports', status: 'Active', lastLogin: '26 Sep 2026 · 15:44', mfa: 'Enabled' },
  { name: 'Asha Patil', role: 'District Officer', permissions: 'Pune district planning and review', status: 'Active', lastLogin: '26 Sep 2026 · 16:42', mfa: 'Enabled' },
  { name: 'Vijay Sawant', role: 'ITI Principal', permissions: 'Institute courses, trainers, equipment', status: 'Active', lastLogin: '25 Sep 2026 · 18:10', mfa: 'Enabled' },
  { name: 'Ananya Kulkarni', role: 'Trainer', permissions: 'Own profile and development plan', status: 'Active', lastLogin: '25 Sep 2026 · 12:08', mfa: 'Enabled' },
  { name: 'Meera Joshi', role: 'Super Admin', permissions: 'Users, roles, audit and health', status: 'Active', lastLogin: '26 Sep 2026 · 11:22', mfa: 'Enabled' },
  { name: 'Kavita More', role: 'District Officer', permissions: 'Nagpur district workspace', status: 'Invited', lastLogin: 'Never', mfa: 'Pending' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 1, type: 'Alerts', title: 'EV Diagnostics demand signal requires review', body: 'Pune district · high-priority evidence packet', read: false },
  { id: 2, type: 'Approvals', title: 'Curriculum evidence package awaiting review', body: 'COPA enrichment proposal · due 29 Sep', read: false },
  { id: 3, type: 'Reports', title: 'District Skill Gap preview generated', body: 'Pune · synthetic records · ready to view', read: true },
  { id: 4, type: 'Deadlines', title: 'Trainer development plan review due', body: '12 trainer profiles · due 30 Sep', read: false },
  { id: 5, type: 'Training', title: 'React Advanced cohort scheduled', body: 'Aundh ITI · 12 Oct 2026', read: true },
  { id: 6, type: 'Curriculum Reviews', title: 'Industry comments added', body: 'EV diagnostics module · 3 comments', read: false }
];

export const REPORT_TYPES_DATA: [string, string, string][] = [
  ['State Labour Market Report', 'STATE', 'Demand, occupations, skills and district comparisons.'],
  ['District Labour Market Report', 'DISTRICT', 'District-scoped workforce demand and capacity.'],
  ['Skill Gap Report', 'SKILLS', 'Market-demand skills compared with course coverage.'],
  ['Course Alignment Report', 'COURSES', 'Coverage, missing skills and review signals.'],
  ['Training Capacity Report', 'CAPACITY', 'Seats, trainers, institutes and constraints.'],
  ['Employer Report', 'EMPLOYERS', 'Demand, validation and feedback signals.'],
  ['Trainer Report', 'TRAINERS', 'Capability, certification and development gaps.'],
  ['Equipment Report', 'EQUIPMENT', 'Requirements, shortages and utilization.']
];

export const ASSISTANT_QUESTIONS = [
  'Which skills are growing in Pune?',
  'What skills are missing from this course?',
  'Show districts with high demand for Python.',
  'Which courses have low market alignment?',
  'Generate a district skill-gap summary.'
];

export const ASSISTANT_RESPONSES: Record<string, AssistantResponse> = {
  'Which skills are growing in Pune?': {
    answer: 'The Pune demonstration view shows the strongest growing signals for Electric Vehicle Technology (+28%), Industrial IoT (+22%) and Power BI (+17%). Treat these as review signals, not official growth estimates.',
    headers: ['Skill', 'Synthetic change signal'],
    rows: [['Electric Vehicle Technology', '+28%'], ['Industrial IoT', '+22%'], ['Power BI', '+17%']],
    why: 'These skills have the largest positive change values in the Pune demo trend view.',
    data: 'Synthetic Pune job records and skill-mention index.',
    period: 'Apr–Sep 2026',
    source: 'Job Market Signal Corpus — Demo',
    confidence: 'Moderate; direct read of demo trend values',
    assumptions: 'Changes in skill mentions are useful demand signals.',
    limitations: 'Synthetic sample; not representative of every employer or job channel.',
    evidence: 'Pune trend values: EV +28%, Industrial IoT +22%, Power BI +17%.',
    action: 'Validate with employers, then review trainer and equipment capacity.',
    route: 'skills'
  },
  'What skills are missing from this course?': {
    answer: 'For the selected COPA demonstration course, the highlighted gaps are React.js, Python at advanced proficiency, AWS Basics, REST APIs and Docker.',
    headers: ['Skill', 'Coverage', 'Priority'],
    rows: [
      ['React.js', 'Not covered', 'High'],
      ['Python', 'Foundation only', 'High'],
      ['AWS Basics', 'Not covered', 'Medium'],
      ['REST APIs', 'Introductory', 'High'],
      ['Docker', 'Not covered', 'Medium']
    ],
    why: 'These market-demand skills are absent or below the required proficiency in the centralized course comparison.',
    data: 'COPA coverage: 28 of 45 market-demand skills.',
    period: 'Course review 12 Jul 2026; market signals Apr–Sep 2026',
    source: 'Training Supply Register and Job Market Signal Corpus — Demo',
    confidence: 'High for the fixed set comparison; low for generalization',
    assumptions: 'The selected 45-skill demand set is the relevant comparator.',
    limitations: 'Synthetic course map and demand set; no official curriculum mapping.',
    evidence: 'Five highlighted gaps in the COPA demo analysis.',
    action: 'Open curriculum review; do not alter the course automatically.',
    route: 'skillgap'
  },
  'Show districts with high demand for Python.': {
    answer: 'The small job-record dataset contains one explicit Python vacancy, in Mumbai. That is not enough evidence to classify any district as having high Python demand; the platform should request more validated records.',
    headers: ['District', 'Explicit Python vacancies'],
    rows: [['Mumbai', '1'], ['Other demonstrated districts', '0']],
    why: 'Python appears in the Banking Data Analyst record located in Mumbai.',
    data: '11 synthetic job records currently listed in Job Intelligence.',
    period: '14–24 Sep 2026',
    source: 'Employer Demo Feed and Synthetic Job Board',
    confidence: 'High for this exact count; low for district demand classification',
    assumptions: 'Only explicit skill tags count as evidence.',
    limitations: 'Very small synthetic sample; absence is not evidence of no demand.',
    evidence: 'Job record 7: Banking Data Analyst, Mumbai, skills include Python.',
    action: 'Inspect the job record and obtain a broader validated sample before planning.',
    route: 'jobintel'
  },
  'Which courses have low market alignment?': {
    answer: 'Using a review threshold below 70%, COPA is the only demonstrated course below the threshold at 62%. IoT Technician is 74% and Electrical Technician is 81%. This is a review signal, not a judgement that a course is obsolete.',
    headers: ['Course', 'Calculated alignment'],
    rows: [['COPA', '62%'], ['IoT Technician', '74%'], ['Electrical Technician', '81%']],
    why: 'Alignment is calculated as covered market-demand skills divided by market-demand skills.',
    data: 'Centralized course and market skill arrays.',
    period: 'Latest demo reviews Jun–Aug 2026',
    source: 'Training Supply Register — Demo',
    confidence: 'High for the fixed calculation',
    assumptions: 'Each listed skill has equal weight.',
    limitations: 'No skill weighting, learning depth or local employer coverage.',
    evidence: 'COPA: 28 of 45; IoT: 28 of 38; Electrical: 34 of 42.',
    action: 'Review the COPA evidence package with technical and industry reviewers.',
    route: 'coursealignment'
  },
  'Generate a district skill-gap summary.': {
    answer: 'Pune shows 37 skill gaps in the district overview. The COPA example covers 28 of 45 market-demand skills (62%); the district demo also shows a trainer gap of 37 and shortages of 12 Arduino kits and 6 EV diagnostic rigs.',
    headers: ['Planning signal', 'Demo value'],
    rows: [
      ['District skill gaps', '37'],
      ['COPA alignment', '62%'],
      ['Trainer gap', '37'],
      ['Arduino kit shortage', '12'],
      ['EV diagnostic rig shortage', '6']
    ],
    why: 'Demand, course, trainer and equipment records are linked in the Pune evidence chain.',
    data: 'Pune district KPIs, COPA skill map, trainer and equipment demo records.',
    period: 'Snapshot synchronized 26 Sep 2026',
    source: 'Job Market, Institute and Employer Data — Demo',
    confidence: 'Moderate; cross-module synthetic summary',
    assumptions: 'Records use compatible district and course identifiers.',
    limitations: 'Synthetic values; no official inventory, enrolment or vacancy validation.',
    evidence: 'Pune District Workforce Intelligence and linked gap tables.',
    action: 'Open a district plan, validate source records and submit any proposal for human review.',
    route: 'districtintel'
  }
};

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    navHome: 'Home',
    navLabour: 'Labour Market',
    navSkills: 'Skills',
    navCourses: 'Courses',
    navInstitutes: 'Institutes',
    navEmployers: 'Employers',
    navReports: 'Reports',
    navAssistant: 'Assistant',
    navLogin: 'Login',
    hero: 'Connecting Skills, Training & Industry',
    assistantTitle: 'Labour Market Assistant',
    sourcesTitle: 'Data Sources',
    methodTitle: 'Data & Methodology',
    aboutTitle: 'About Platform',
    faqTitle: 'Frequently Asked Questions',
    contactTitle: 'Contact',

    // Header & Brand
    govTitle: 'Government of Maharashtra',
    deptTitle: 'Skill, Employment, Entrepreneurship & Innovation Department • LMI Cell',
    subDeptTitle: 'कौशल्य विकास व रोजगार विभाग',
    platformName: 'Maharashtra Skill & Labour Market Intelligence Platform',
    platformSub: 'MS-LMIP • State Decision Support System',
    searchPlaceholder: 'Search Index',
    evidenceSnapshot: 'Synchronized Evidence Snapshot:',
    districtsStatus: '36 Districts • 1,23,456 Synthetic Vacancies',
    prodBuild: 'BUILD: PROD-REV-3.4 • HUMAN-IN-THE-LOOP SAFEGUARD ACTIVE',
    roleLabel: 'Officer Role',
    toggleTheme: 'Toggle theme',
    toggleLargeFont: 'Toggle text size',
    selectLanguage: 'Interface Language',

    // Sidebar Section Titles
    secOverview: 'OVERVIEW',
    secLabour: 'LABOUR MARKET INTELLIGENCE',
    secCurriculum: 'CURRICULUM & TRAINING',
    secResource: 'RESOURCE PLANNING',
    secStakeholders: 'STAKEHOLDER PORTALS',
    secMonitoring: 'MONITORING & GOVERNANCE',
    secAdmin: 'ADMINISTRATION',

    // Sidebar Navigation Items
    menuDashboard: 'Executive Dashboard',
    menuStatewide: 'Statewide Overview',
    menuLabourDemand: 'Labour Market Demand',
    menuJobVacancy: 'Job Vacancy Engine',
    menuSkillDemand: 'Skill Demand Index',
    menuDistrictIntel: 'District Intelligence',
    menuSkillGap: 'Skill Gap Matrix',
    menuCourseAlign: 'Course Alignment',
    menuCurriculumReview: 'Curriculum Review',
    menuTrainingPlans: 'Training Plans',
    menuTrainerMgmt: 'Trainer Management',
    menuEquipmentPlan: 'Equipment Planning',
    menuBudgetPlan: 'Budget Planning',
    menuScenarioSim: 'Scenario Simulator',
    menuEmployerPortal: 'Employer Portal',
    menuStudentPortal: 'Student Portal',
    menuResumeAnalyzer: 'Resume Analyzer',
    menuInstitutes: 'Institutional Pages',
    menuAlertCentre: 'Alert Centre',
    menuDataQuality: 'Data Quality',
    menuDataSources: 'Data Sources',
    menuReportsCentre: 'Reports & Gazettes',
    menuAuditLogs: 'Audit Logs',
    menuSystemHealth: 'System Health',
    menuUserMgmt: 'User Management',
    menuMethodology: 'Methodology & Standards',
    menuAssistant: 'Intelligence Assistant',

    // Common UI actions
    btnExport: 'Export',
    btnDownload: 'Download',
    btnFilter: 'Filter',
    btnApply: 'Apply',
    btnClear: 'Clear',
    btnSearch: 'Search',
    btnSave: 'Save',
    btnCancel: 'Cancel',
    btnBack: 'Back',
    btnRefresh: 'Refresh',
    btnViewDetails: 'View Details',
    statusActive: 'Active',
    statusPending: 'Pending',
    statusApproved: 'Approved',
    statusCritical: 'Critical',
    statusHigh: 'High',
    statusMedium: 'Medium',
    statusLow: 'Low',
  },
  mr: {
    navHome: 'मुख्यपृष्ठ',
    navLabour: 'श्रम बाजार',
    navSkills: 'कौशल्ये',
    navCourses: 'अभ्यासक्रम',
    navInstitutes: 'संस्था',
    navEmployers: 'नियोक्ते',
    navReports: 'अहवाल',
    navAssistant: 'सहाय्यक',
    navLogin: 'लॉगिन',
    hero: 'कौशल्य, प्रशिक्षण आणि उद्योग यांना जोडणे',
    assistantTitle: 'श्रम बाजार सहाय्यक',
    sourcesTitle: 'डेटा स्रोत',
    methodTitle: 'डेटा आणि पद्धत',
    aboutTitle: 'मंचाविषयी',
    faqTitle: 'वारंवार विचारले जाणारे प्रश्न',
    contactTitle: 'संपर्क',

    // Header & Brand
    govTitle: 'Government of Maharashtra',
    deptTitle: 'कौशल्य, रोजगार, उद्योजकता आणि नाविन्यता विभाग • LMI कक्ष',
    subDeptTitle: 'कौशल्य विकास व रोजगार विभाग',
    platformName: 'महाराष्ट्र कौशल्य व श्रम बाजार बुद्धिमत्ता मंच',
    platformSub: 'MS-LMIP • राज्य निर्णय समर्थन प्रणाली',
    searchPlaceholder: 'निर्देशांक शोधा',
    evidenceSnapshot: 'समक्रमित पुरावा स्नॅपशॉट:',
    districtsStatus: '३६ जिल्हे • १,२३,४५६ कृत्रिम रिक्त जागा',
    prodBuild: 'आवृत्ती: PROD-REV-३.४ • मानवी पुनरावलोकन सुरक्षा सक्रिय',
    roleLabel: 'अधिकारी भूमिका',
    toggleTheme: 'थीम बदला',
    toggleLargeFont: 'मजकूर आकार बदला',
    selectLanguage: 'भाषा निवडा',

    // Sidebar Section Titles
    secOverview: 'आढावा',
    secLabour: 'श्रम बाजार बुद्धिमत्ता',
    secCurriculum: 'अभ्यासक्रम आणि प्रशिक्षण',
    secResource: 'संसाधन नियोजन',
    secStakeholders: 'भागधारक पोर्टल',
    secMonitoring: 'निरीक्षण आणि प्रशासन',
    secAdmin: 'प्रशासन',

    // Sidebar Navigation Items
    menuDashboard: 'कार्यकारी डॅशबोर्ड',
    menuStatewide: 'राज्यस्तरीय आढावा',
    menuLabourDemand: 'श्रम बाजार मागणी',
    menuJobVacancy: 'नोकरी रिक्त जागा प्रणाली',
    menuSkillDemand: 'कौशल्य मागणी निर्देशांक',
    menuDistrictIntel: 'जिल्हा बुद्धिमत्ता',
    menuSkillGap: 'कौशल्य तफावत मॅट्रिक्स',
    menuCourseAlign: 'अभ्यासक्रम जुळवणी',
    menuCurriculumReview: 'अभ्यासक्रम पुनरावलोकन',
    menuTrainingPlans: 'प्रशिक्षण योजना',
    menuTrainerMgmt: 'प्रशिक्षक व्यवस्थापन',
    menuEquipmentPlan: 'उपकरण नियोजन',
    menuBudgetPlan: 'अर्थसंकल्प नियोजन',
    menuScenarioSim: 'परिदृश्य सिम्युलेटर',
    menuEmployerPortal: 'नियोक्ता पोर्टल',
    menuStudentPortal: 'विद्यार्थी पोर्टल',
    menuResumeAnalyzer: 'बायोडेटा विश्लेषण प्रणाली',
    menuInstitutes: 'संस्थात्मक पृष्ठे',
    menuAlertCentre: 'सूचना केंद्र',
    menuDataQuality: 'डेटा गुणवत्ता',
    menuDataSources: 'डेटा स्रोत',
    menuReportsCentre: 'अहवाल आणि राजपत्रे',
    menuAuditLogs: 'ऑडिट नोंदी',
    menuSystemHealth: 'प्रणाली आरोग्य',
    menuUserMgmt: 'वापरकर्ता व्यवस्थापन',
    menuMethodology: 'कार्यपद्धती आणि मानके',
    menuAssistant: 'बुद्धिमत्ता सहाय्यक',

    // Common UI actions
    btnExport: 'निर्यात करा',
    btnDownload: 'डाउनलोड करा',
    btnFilter: 'फिल्टर करा',
    btnApply: 'लागू करा',
    btnClear: 'साफ करा',
    btnSearch: 'शोधा',
    btnSave: 'जतन करा',
    btnCancel: 'रद्द करा',
    btnBack: 'मागे',
    btnRefresh: 'ताजे करा',
    btnViewDetails: 'तपशील पहा',
    statusActive: 'सक्रिय',
    statusPending: 'प्रलंबित',
    statusApproved: 'मंजूर',
    statusCritical: 'गंभीर',
    statusHigh: 'उच्च',
    statusMedium: 'मध्यम',
    statusLow: 'कमी',
  },
  hi: {
    navHome: 'मुखपृष्ठ',
    navLabour: 'श्रम बाजार',
    navSkills: 'कौशल',
    navCourses: 'पाठ्यक्रम',
    navInstitutes: 'संस्थान',
    navEmployers: 'नियोक्ता',
    navReports: 'रिपोर्ट',
    navAssistant: 'सहायक',
    navLogin: 'लॉगिन',
    hero: 'कौशल, प्रशिक्षण और उद्योग को जोड़ना',
    assistantTitle: 'श्रम बाजार सहायक',
    sourcesTitle: 'डेटा स्रोत',
    methodTitle: 'डेटा और कार्यप्रणाली',
    aboutTitle: 'प्लेटफ़ॉर्म के बारे में',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    contactTitle: 'संपर्क',

    // Header & Brand
    govTitle: 'Government of Maharashtra',
    deptTitle: 'कौशल, रोजगार, उद्यमिता एवं नवाचार विभाग • LMI सेल',
    subDeptTitle: 'कौशल विकास व रोजगार विभाग',
    platformName: 'महाराष्ट्र कौशल एवं श्रम बाजार इंटेलिजेंस मंच',
    platformSub: 'MS-LMIP • राज्य निर्णय समर्थन प्रणाली',
    searchPlaceholder: 'सूचकांक खोजें',
    evidenceSnapshot: 'सिंक्रनाइज़्ड साक्ष्य स्नैपशॉट:',
    districtsStatus: '३६ जिले • १,२३,४५६ कृत्रिम रिक्तियां',
    prodBuild: 'संस्करण: PROD-REV-३.४ • मानवीय निगरानी सुरक्षा सक्रिय',
    roleLabel: 'अधिकारी भूमिका',
    toggleTheme: 'थीम बदलें',
    toggleLargeFont: 'टेक्स्ट आकार बदलें',
    selectLanguage: 'भाषा चुनें',

    // Sidebar Section Titles
    secOverview: 'अवलोकन',
    secLabour: 'श्रम बाजार इंटेलिजेंस',
    secCurriculum: 'पाठ्यक्रम और प्रशिक्षण',
    secResource: 'संसाधन योजना',
    secStakeholders: 'हितधारक पोर्टल',
    secMonitoring: 'निगरानी और शासन',
    secAdmin: 'प्रशासन',

    // Sidebar Navigation Items
    menuDashboard: 'कार्यकारी डैशबोर्ड',
    menuStatewide: 'राज्यव्यापी अवलोकन',
    menuLabourDemand: 'श्रम बाजार मांग',
    menuJobVacancy: 'नौकरी रिक्ति इंजन',
    menuSkillDemand: 'कौशल मांग सूचकांक',
    menuDistrictIntel: 'जिला इंटेलिजेंस',
    menuSkillGap: 'कौशल अंतर मैट्रिक्स',
    menuCourseAlign: 'पाठ्यक्रम संरेखन',
    menuCurriculumReview: 'पाठ्यक्रम समीक्षा',
    menuTrainingPlans: 'प्रशिक्षण योजनाएं',
    menuTrainerMgmt: 'प्रशिक्षक प्रबंधन',
    menuEquipmentPlan: 'उपकरण योजना',
    menuBudgetPlan: 'बजट योजना',
    menuScenarioSim: 'परिदृश्य सिम्युलेटर',
    menuEmployerPortal: 'नियोक्ता पोर्टल',
    menuStudentPortal: 'छात्र पोर्टल',
    menuResumeAnalyzer: 'बायोडाटा विश्लेषक',
    menuInstitutes: 'संस्थात्मक पृष्ठ',
    menuAlertCentre: 'सतर्कता केंद्र',
    menuDataQuality: 'डेटा गुणवत्ता',
    menuDataSources: 'डेटा स्रोत',
    menuReportsCentre: 'रिपोर्ट और राजपत्र',
    menuAuditLogs: 'ऑडिट लॉग',
    menuSystemHealth: 'सिस्टम स्वास्थ्य',
    menuUserMgmt: 'उपयोगकर्ता प्रबंधन',
    menuMethodology: 'पद्धति और मानक',
    menuAssistant: 'इंटेलिजेंस सहायक',

    // Common UI actions
    btnExport: 'निर्यात करें',
    btnDownload: 'डाउनलोड करें',
    btnFilter: 'फ़िल्टर करें',
    btnApply: 'लागू करें',
    btnClear: 'साफ़ करें',
    btnSearch: 'खोजें',
    btnSave: 'सुरक्षित करें',
    btnCancel: 'रद्द करें',
    btnBack: 'वापस',
    btnRefresh: 'ताज़ा करें',
    btnViewDetails: 'विवरण देखें',
    statusActive: 'सक्रिय',
    statusPending: 'लंबित',
    statusApproved: 'स्वीकृत',
    statusCritical: 'गंभीर',
    statusHigh: 'उच्च',
    statusMedium: 'मध्यम',
    statusLow: 'कम',
  }
};

export const ROUTE_TITLES: Record<RouteId, string> = {
  home: 'Home',
  dashboard: 'Dashboard',
  districtintel: 'District Intelligence / Pune',
  jobintel: 'Job Intelligence',
  jobdetail: 'Job Intelligence / Record Detail',
  skilldetail: 'Skill Intelligence / Skill Detail',
  skills: 'Skill Intelligence',
  skillgap: 'Skill Intelligence / Skill Gap',
  courses: 'Courses Overview',
  coursealignment: 'Training / Course Alignment',
  curriculum: 'Training / Curriculum Review',
  institutes: 'Institutes & Capacity',
  trainers: 'Training / Trainers',
  equipment: 'Training / Equipment',
  employers: 'Employers Overview',
  employerportal: 'Ecosystem / Employers',
  students: 'Students Overview',
  studentportal: 'Ecosystem / Students',
  trainingplan: 'Planning / District Plans',
  budget: 'Planning / Budget',
  scenario: 'Planning / Scenario Analysis',
  reports: 'Public Reports',
  reportscentre: 'Planning / Reports',
  alertcentre: 'Administration / Alerts',
  auditlogs: 'Administration / Audit Logs',
  dataquality: 'Administration / Data Quality',
  systemhealth: 'Administration / System Health',
  usermanagement: 'Administration / Users',
  assistant: 'Intelligence / Labour Market Assistant',
  labour: 'Labour Market Intelligence',
  datasources: 'Data Sources',
  methodology: 'Data & Methodology',
  about: 'About Platform',
  faq: 'Frequently Asked Questions',
  contact: 'Contact',
  login: 'Sign In / Demonstration Role',
  resumeanalyzer: 'Career / AI Resume Analyzer'
};

export const SEARCH_INDEX: [string, string, RouteId][] = [
  ['Go to Dashboard', 'Command', 'dashboard'],
  ['Go to Resume Analyzer', 'Command', 'resumeanalyzer'],
  ['Go to Skills', 'Command', 'skills'],
  ['Go to Jobs', 'Command', 'jobintel'],
  ['Go to Courses', 'Command', 'coursealignment'],
  ['Go to Reports', 'Command', 'reportscentre'],
  ['Open Alerts', 'Command', 'alertcentre'],
  ['Pune', 'Districts', 'districtintel'],
  ['Mumbai', 'Districts', 'labour'],
  ['Nagpur', 'Districts', 'labour'],
  ['Nashik', 'Districts', 'labour'],
  ['Frontend Application Developer', 'Jobs', 'jobintel'],
  ['EV Diagnostic Technician', 'Jobs', 'jobintel'],
  ['React', 'Skills', 'skilldetail'],
  ['Industrial IoT', 'Skills', 'skills'],
  ['COPA', 'Courses', 'skillgap'],
  ['IoT Technician', 'Courses', 'coursealignment'],
  ['Aundh ITI', 'Institutes', 'institutes'],
  ['Pimpri ITI', 'Institutes', 'institutes'],
  ['Sahyadri Digital Systems', 'Employers', 'employerportal'],
  ['Deccan Mobility Works', 'Employers', 'employerportal'],
  ['Ananya Kulkarni', 'Trainers', 'trainers'],
  ['Suresh Patil', 'Trainers', 'trainers'],
  ['State Labour Market Report', 'Reports', 'reportscentre'],
  ['Course Alignment Report', 'Reports', 'reportscentre'],
  ['Pune skill gaps', 'Reports', 'skillgap']
];
