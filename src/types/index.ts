export type Role = 
  | 'State Admin' 
  | 'District Officer' 
  | 'ITI Principal' 
  | 'Trainer' 
  | 'Employer' 
  | 'Student' 
  | 'Super Admin';

export type RouteId =
  | 'home'
  | 'dashboard'
  | 'labour'
  | 'jobintel'
  | 'jobdetail'
  | 'skills'
  | 'skilldetail'
  | 'skillgap'
  | 'courses'
  | 'coursealignment'
  | 'curriculum'
  | 'institutes'
  | 'trainers'
  | 'equipment'
  | 'employers'
  | 'employerportal'
  | 'students'
  | 'studentportal'
  | 'trainingplan'
  | 'budget'
  | 'scenario'
  | 'reports'
  | 'reportscentre'
  | 'alertcentre'
  | 'auditlogs'
  | 'dataquality'
  | 'systemhealth'
  | 'usermanagement'
  | 'assistant'
  | 'datasources'
  | 'methodology'
  | 'about'
  | 'faq'
  | 'contact'
  | 'login'
  | 'districtintel'
  | 'resumeanalyzer';

export * from './resume';

export interface JobExtract {
  skill: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  confidence: number;
  snippet: string;
  validated?: boolean;
}

export interface JobRecord {
  id: number;
  title: string;
  employer: string;
  industry: string;
  district: string;
  skills: string[];
  experience: string;
  salary: number;
  salaryText: string;
  posted: string;
  source: string;
  status: 'Review' | 'Validated' | 'Published';
  description: string;
  extracts: [string, string, number, string][];
}

export interface AdzunaJob {
  id: string;
  source: string;
  sourceJobId: string;
  title: string;
  company: string;
  location: string;
  district: string;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  postedDate: string;
  jobUrl: string;
  collectedAt: string;
}

export interface AdzunaJobsResponse {
  jobs: AdzunaJob[];
  total: number;
  page: number;
  source: string;
  lastUpdated: string;
}

export interface CourseData {
  name: string;
  market: string[];
  covered: string[];
  institutes: number;
  students: number;
  placement: string;
  review: string;
}

export interface SkillGapRow {
  skill: string;
  demand: string;
  coverage: string;
  requiredProficiency: string;
  gap: string;
  learningTime: string;
  estimatedCost: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AlertRecord {
  id: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Information';
  title: string;
  district: string;
  skill: string;
  period: string;
  evidence: string;
  action: string;
  status: 'New' | 'Under Review' | 'Action Required' | 'Resolved' | 'Dismissed';
}

export interface ApprovalStage {
  name: string;
  owner: string;
  date: string;
  status: 'Complete' | 'In review' | 'Pending';
  comments: string;
}

export interface TrainerRecord {
  id: number;
  name: string;
  institute: string;
  skills: string[];
  experience: number;
  cert: 'Current' | 'Renewal due' | 'Development needed';
  last: string;
  qualification: string;
  levels: [string, number][];
}

export interface EquipmentRecord {
  name: string;
  required: number;
  available: number;
  shortage: number;
  utilization: number;
  unitCost: number;
  totalCost: number;
}

export interface CandidateRecord {
  name: string;
  education: string;
  district: string;
  skills: string[];
  projects: string;
  availability: string;
}

export interface ScholarshipRecord {
  name: string;
  district: string;
  education: string;
  course: string;
  eligibility: string;
  benefit: string;
  deadline: string;
}

export interface AuditRecord {
  timestamp: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  previousState: string;
  newState: string;
  status: 'Completed' | 'Pending Review' | 'Failed';
}

export interface QualityIssue {
  issue: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  count: string;
  description: string;
  recommendedAction: string;
}

export interface DemoUser {
  name: string;
  role: string;
  permissions: string;
  status: 'Active' | 'Invited' | 'Suspended';
  lastLogin: string;
  mfa: 'Enabled' | 'Pending';
}

export interface NotificationItem {
  id: number;
  type: 'Alerts' | 'Approvals' | 'Reports' | 'Deadlines' | 'Training' | 'Curriculum Reviews';
  title: string;
  body: string;
  read: boolean;
}

export interface EvidenceInfo {
  why: string;
  data: string;
  period: string;
  source: string;
  confidence: string;
  assumptions: string;
  limitations: string;
  evidence: string;
  action: string;
  route?: RouteId;
}

export interface AssistantResponse extends EvidenceInfo {
  answer: string;
  headers: string[];
  rows: string[][];
}
