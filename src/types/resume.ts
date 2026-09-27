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
  year: string | null;
  cgpa?: string | null;
}

export interface CandidateExperience {
  title: string;
  company: string;
  duration: string | null;
  location?: string | null;
  description?: string;
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
