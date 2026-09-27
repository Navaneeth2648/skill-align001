export interface AdzunaRawJob {
  id: string | number;
  title?: string;
  company?: {
    display_name?: string;
  };
  location?: {
    display_name?: string;
    area?: string[];
  };
  description?: string;
  salary_min?: number;
  salary_max?: number;
  created?: string;
  redirect_url?: string;
  category?: {
    label?: string;
    tag?: string;
  };
}

export interface AdzunaSearchResponse {
  results?: AdzunaRawJob[];
  count?: number;
  mean?: number;
}

export interface NormalizedJob {
  id: string;
  source: 'Adzuna' | 'State Employer Portal';
  sourceJobId: string;
  title: string;
  company: string;
  location: string;
  district: string;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryText?: string;
  employmentType?: string;
  postedDate: string;
  jobUrl: string;
  applyUrl?: string;
  sourceUrl?: string;
  skills?: string[];
  collectedAt: string;
}

export interface JobsApiResponse {
  jobs: NormalizedJob[];
  total: number;
  page: number;
  source: string;
  lastUpdated: string;
}

export interface ExtractedSkill {
  skill: string;
  evidence: string;
  confidence: number;
  level: 'Strong' | 'Moderate' | 'Basic';
}

export interface CategorizedSkills {
  programmingLanguages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud: string[];
  devops: string[];
  aiMl: string[];
  tools: string[];
  frameworks: string[];
  other: string[];
}

export interface CandidateEducation {
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  startYear?: string | null;
  endYear?: string | null;
  year?: string | null;
  cgpa?: string | null;
  gradePercentage?: string | null;
}

export interface CandidateExperience {
  title: string;
  company: string;
  duration?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  description?: string;
  responsibilities?: string[];
  skillsUsed?: string[];
  highlights?: string[];
}

export interface CandidateProject {
  title: string;
  duration?: string | null;
  tech: string[];
  description?: string;
}

export interface CandidateProfile {
  name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  summary: string | null;
  education: CandidateEducation[];
  experience: CandidateExperience[];
  totalExperienceYears: number;
  categorizedSkills: CategorizedSkills;
  technicalSkills: ExtractedSkill[];
  softSkills: string[];
  certifications: string[];
  achievements: string[];
  projects: CandidateProject[];
  languages: string[];
  detectedRoles: string[];
  extractionMethod: 'direct' | 'ocr';
}

export interface JobMatchBreakdown {
  skillMatch: number;
  roleMatch: number;
  locationMatch: number;
  experienceMatch: number;
}

export interface LearningRecommendation {
  skill: string;
  courseName: string;
  provider: string;
  level: string;
  sourceType: 'Reference Catalog' | 'Government ITI Standard';
}

export interface RecommendedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  district: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryText: string;
  postedDate: string;
  jobUrl: string;
  source: 'Adzuna';
  description: string;
  extractedJobSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
  matchScore: number;
  matchBreakdown: JobMatchBreakdown;
  whyItMatches: string;
  learningRecommendations: LearningRecommendation[];
}

export interface ResumeAnalysisResult {
  id: string;
  filename: string;
  analyzedAt: string;
  candidate: CandidateProfile;
  recommendedJobs: RecommendedJob[];
  totalJobsScanned: number;
  status: 'Connected' | 'Temporarily unavailable';
  dataSource: string;
  resumeCompleteness?: number;
  atsKeywordAnalysis?: {
    internalScore: number;
    keywordsFound: string[];
    keywordsMissing: string[];
    disclaimer: string;
  };
  improvementSuggestions?: string[];
  targetRoleGaps?: {
    role: string;
    matchScore: number;
    missingSkills: string[];
  }[];
}

// User Profile System
export interface UserProfilePersonal {
  name: string;
  email: string;
  phone: string;
  location: string;
  district: string;
  state: string;
  profilePhoto?: string;
}

export interface UserProfileProfessional {
  currentJobTitle: string;
  targetJobTitle: string;
  yearsOfExperience: number;
  employmentStatus: 'Employed' | 'Unemployed' | 'Student' | 'Apprentice';
  preferredEmploymentType: 'Full-time' | 'Part-time' | 'Apprenticeship' | 'Contract';
  preferredLocations: string[];
  expectedSalary: string;
  noticePeriod: string;
}

export interface UserProfileSkills {
  technicalSkills: string[];
  softSkills: string[];
  skillProficiency: Record<string, 'Beginner' | 'Intermediate' | 'Advanced'>;
  certifications: string[];
  languages: string[];
}

export interface UserProfileCertification {
  id: string;
  certificateName: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  fileName?: string;
}

export interface UserProfileLinks {
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  otherUrls: string[];
}

export interface UserProfile {
  id: string;
  personal: UserProfilePersonal;
  professional: UserProfileProfessional;
  skills: UserProfileSkills;
  education: CandidateEducation[];
  experience: CandidateExperience[];
  certifications: UserProfileCertification[];
  links: UserProfileLinks;
  dataSourceLabel: 'User-provided profile' | 'Imported from verified resume' | 'Official state register';
  updatedAt: string;
}

// Curriculum Review & Sign-Off
export interface CurriculumRecord {
  id: string;
  code: string;
  name: string;
  industry: string;
  totalHours: number;
  institutesCount: number;
  studentsCount: number;
  currentPlacementRate: string;
  lastReviewDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Revision Required';
  marketDemandSkills: string[];
  coveredSkills: string[];
  alignmentPercentage: number;
  skillGaps: {
    skill: string;
    demand: 'High' | 'Moderate' | 'Low';
    coverage: 'Not covered' | 'Foundation only' | 'Introductory' | 'Adequate';
    requiredProficiency: string;
    gap: string;
    learningTime: string;
    estimatedCost: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
}

export interface CurriculumReviewItem {
  id: string;
  courseId: string;
  courseName: string;
  reviewerName: string;
  reviewerRole: string;
  timestamp: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Revision Required';
  comments: string;
}

export interface CurriculumSignOffRecord {
  id: string;
  stageName: string;
  courseId: string;
  owner: string;
  date: string;
  status: 'Complete' | 'In review' | 'Pending' | 'Revision Required' | 'Rejected';
  comments: string;
  officerRole: string;
  auditId: string;
}

// Training Plans & Trainer Management
export interface TrainingPlan {
  id: string;
  title: string;
  district: string;
  institution: string;
  courses: string[];
  skills: string[];
  targetAudience: string;
  duration: string;
  trainer: string;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Scheduled' | 'In Progress' | 'Completed' | 'Deferred';
  progress: number;
  budgetAllocated: number;
}

export interface TrainerRecord {
  id: number;
  name: string;
  institute: string;
  district?: string;
  skills: string[];
  experience: number;
  cert: 'Current' | 'Renewal due' | 'Development needed';
  last: string;
  qualification: string;
  levels: [string, number][];
  availability: 'Available' | 'On Assignment' | 'On Leave';
}

// Resource Planning
export interface EquipmentRecord {
  id: number;
  name: string;
  category: string;
  required: number;
  available: number;
  shortage: number;
  utilization: number;
  unitCost: number;
  totalCost: number;
  institution: string;
  district: string;
  maintenanceStatus: 'Operational' | 'Maintenance Due' | 'Under Repair';
}

export interface BudgetRecord {
  id: string;
  category: string;
  institution: string;
  district: string;
  financialYear: string;
  allocated: number;
  spent: number;
  remaining: number;
  status: 'Healthy' | 'Threshold Warning' | 'Exceeded';
}

// Scenario Simulator
export interface ScenarioSimulationInput {
  trainingCapacityDelta: number; // e.g. +20%
  newInstitutesCount: number;    // e.g. +5
  skillDemandGrowth: number;     // e.g. +15%
  vacancyDemandDelta: number;    // e.g. +10%
  budgetDelta: number;           // e.g. +10%
  district: string;              // 'Pune' | 'All'
  courseCapacityDelta: number;   // e.g. +25%
}

export interface ScenarioSimulationResult {
  assumptionsDisclaimer: string;
  timestamp: string;
  parameters: ScenarioSimulationInput;
  before: {
    enrolledTrainees: number;
    certifiedGraduates: number;
    estimatedPlacementRate: number;
    skillDeficitIndex: number;
    budgetUtilization: number;
  };
  scenario: {
    enrolledTrainees: number;
    certifiedGraduates: number;
    estimatedPlacementRate: number;
    skillDeficitIndex: number;
    budgetUtilization: number;
  };
  difference: {
    enrolledTraineesChange: number;
    certifiedGraduatesChange: number;
    placementRateChangePercent: number;
    skillDeficitReductionPercent: number;
    budgetImpactInLakhs: number;
  };
}

// Stakeholder Portals
export interface EmployerJobPost {
  id: string;
  title: string;
  company: string;
  district: string;
  location: string;
  industry: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  salaryText: string;
  skills: string[];
  description: string;
  postedDate: string;
  status: 'Active' | 'Review' | 'Closed';
  applicantsCount: number;
}

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  district: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  skills: string[];
  matchScore: number;
  appliedAt: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
}

// Alerts & Monitoring
export interface AlertItem {
  id: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Information';
  title: string;
  district: string;
  skill: string;
  period: string;
  evidence: string;
  action: string;
  status: 'New' | 'Under Review' | 'Action Required' | 'Resolved';
  read: boolean;
  category: 'data_quality' | 'certification_expiry' | 'training_deadline' | 'budget_threshold' | 'job_status' | 'system_error';
  timestamp: string;
}

export interface DataQualityMetric {
  overallQualityScore: number;
  totalRecordsChecked: number;
  missingDistrictsCount: number;
  duplicatesDetectedCount: number;
  invalidLocationsCount: number;
  staleRecordsCount: number;
  extractionConfidenceWarnings: number;
  lastRunTimestamp: string;
  qualityIssues: {
    issue: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    count: string;
    description: string;
    recommendedAction: string;
  }[];
}

export interface DataSourceRecord {
  id: string;
  name: string;
  provider: string;
  url: string;
  apiStatus: 'Active' | 'Degraded' | 'Offline' | 'Configured';
  lastSuccessfulSync: string;
  lastFailure: string | null;
  updateFrequency: string;
  recordCount: number;
  dataType: string;
  reliabilityScore: number;
  notes: string;
}

export interface ReportItem {
  id: string;
  title: string;
  code: string;
  category: string;
  district?: string;
  description: string;
  publicationDate: string;
  source: string;
  fileSize: string;
  format: 'PDF' | 'CSV' | 'XLSX';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  entity: string;
  previousState: string;
  newState: string;
  status: 'Completed' | 'Pending Review' | 'Failed';
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'State Admin' | 'District Officer' | 'ITI Principal' | 'Trainer' | 'Employer' | 'Student';
  permissions: string;
  status: 'Active' | 'Inactive' | 'Invited';
  lastLogin: string;
  mfa: 'Enabled' | 'Pending';
}

export interface AssistantChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isAiGenerated: boolean;
  modelUsed?: string;
  sourceReferences?: string[];
  suggestedRoute?: string;
  confidence?: string;
}
