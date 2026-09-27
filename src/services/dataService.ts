import { 
  JobRecord, CourseData, SkillGapRow, AlertRecord, ApprovalStage, 
  TrainerRecord, EquipmentRecord, CandidateRecord, ScholarshipRecord, 
  AuditRecord, QualityIssue, DemoUser, NotificationItem, AssistantResponse, RouteId,
  AdzunaJob, AdzunaJobsResponse
} from '../types';
import {
  DISTRICTS_DATA, INITIAL_JOBS, COURSES_DATA, SKILL_GAPS_DATA,
  INITIAL_ALERTS, INITIAL_APPROVAL_STAGES, TRAINERS_DATA, EQUIPMENT_DATA,
  CANDIDATES_DATA, SCHOLARSHIPS_DATA, AUDIT_LOGS_DATA, QUALITY_ISSUES_DATA,
  DEMO_USERS_DATA, INITIAL_NOTIFICATIONS, REPORT_TYPES_DATA, ASSISTANT_RESPONSES
} from '../data/mockData';

export interface ServiceResponse<T> {
  data: T;
  total: number;
  source: 'demo' | 'sample' | 'api' | 'synced';
  lastSynchronized: string;
}

export interface CurriculumSignOffRecord {
  id: string;
  curriculumId: string;
  courseName?: string;
  reviewer: string;
  role: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Revision Required';
  comments: string;
  action: string;
  timestamp: string;
  auditHash?: string;
}

export interface DataQualityMetric {
  category: string;
  totalRecords: number;
  validRecords: number;
  flaggedRecords: number;
  completenessPct: number;
  issuesSummary: string[];
}

export interface ScenarioSimulationResult {
  before: {
    trainingCapacity: number;
    institutionsCount: number;
    budgetLakhs: number;
    placementRatePct: number;
  };
  scenario: {
    trainingCapacity: number;
    institutionsCount: number;
    budgetLakhs: number;
    placementRatePct: number;
    deficitReductionPct: number;
  };
  difference: {
    trainingCapacity: number;
    capacityMultiplier: number;
    budgetDifferenceLakhs: number;
    placementImpactPct: number;
  };
  chartData: Array<{ metric: string; before: number; scenario: number }>;
  assumptions: string[];
  disclaimer: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Government Officer' | 'Institution' | 'Employer' | 'Trainer' | 'Student' | 'State Admin' | 'Super Admin';
  permissions: string[];
  status: 'Active' | 'Suspended' | 'Invited';
  lastLogin: string;
  mfaEnabled: boolean;
}

const SYNC_TIMESTAMP = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', 18:30 IST';

export const JobService = {
  async getApiJobs(params?: { keyword?: string; location?: string; page?: number }): Promise<AdzunaJobsResponse> {
    const url = new URL('/api/jobs', window.location.origin);
    if (params?.keyword) url.searchParams.set('keyword', params.keyword);
    if (params?.location) url.searchParams.set('location', params.location);
    if (params?.page) url.searchParams.set('page', String(params.page));

    const response = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => null);
      throw new Error(errorJson?.error || 'Unable to load job-market data. Please try again.');
    }

    return response.json();
  },

  async searchJobs(params?: { keyword?: string; district?: string; page?: number }): Promise<any> {
    const url = new URL('/api/jobs/search', window.location.origin);
    if (params?.keyword) url.searchParams.set('keyword', params.keyword);
    if (params?.district) url.searchParams.set('district', params.district);
    if (params?.page) url.searchParams.set('page', String(params.page));

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to search jobs');
    return response.json();
  },

  async getRecommendations(): Promise<any> {
    const response = await fetch('/api/jobs/recommendations');
    if (!response.ok) throw new Error('Failed to fetch job recommendations');
    return response.json();
  },

  async saveJob(jobId: string): Promise<any> {
    const response = await fetch('/api/jobs/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId }),
    });
    return response.json();
  },

  async getSavedJobs(): Promise<string[]> {
    try {
      const response = await fetch('/api/jobs/saved');
      if (!response.ok) return [];
      const json = await response.json();
      return json.savedJobIds || [];
    } catch {
      return [];
    }
  },

  async applyJob(application: { jobId: string; jobTitle: string; company: string; district?: string }): Promise<any> {
    const response = await fetch('/api/jobs/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    });
    return response.json();
  },

  async getJobs(params?: { search?: string; district?: string; industry?: string }): Promise<ServiceResponse<JobRecord[]>> {
    let list = [...INITIAL_JOBS];
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.employer.toLowerCase().includes(q) || 
        j.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (params?.district && params.district !== 'All') {
      list = list.filter(j => j.district === params.district);
    }
    if (params?.industry && params.industry !== 'All') {
      list = list.filter(j => j.industry === params.industry);
    }
    return {
      data: list,
      total: list.length,
      source: 'demo',
      lastSynchronized: SYNC_TIMESTAMP
    };
  },

  async getJobById(id: number | string): Promise<any> {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (res.ok) return await res.json();
    } catch (_) {}
    return INITIAL_JOBS.find(j => String(j.id) === String(id));
  }
};

export const ProfileService = {
  async getProfile(): Promise<any> {
    try {
      const res = await fetch('/api/profile');
      if (!res.ok) throw new Error('Failed to fetch user profile');
      const data = await res.json();
      return data.profile;
    } catch (err) {
      console.warn('[ProfileService] Fetch failed:', err);
      return null;
    }
  },

  async updateProfile(updates: any): Promise<any> {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  async importResumeToProfile(): Promise<any> {
    const res = await fetch('/api/profile/import-resume', { method: 'POST' });
    if (!res.ok) {
      const json = await res.json().catch(() => null);
      throw new Error(json?.message || 'Failed to import resume into profile');
    }
    return res.json();
  },

  async saveManualLinkedIn(details: { profileUrl: string; headline?: string; skills?: string[] }): Promise<any> {
    const res = await fetch('/api/linkedin/manual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details),
    });
    return res.json();
  }
};

export const CurriculumService = {
  async getCurriculum(): Promise<any> {
    try {
      const res = await fetch('/api/curriculum');
      if (res.ok) return await res.json();
    } catch (_) {}
    return { curriculumRecords: [], reviews: [], signOffs: {} };
  },

  async getSignOffs(): Promise<CurriculumSignOffRecord[]> {
    try {
      const res = await fetch('/api/curriculum');
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data.signOffs) ? data.signOffs : [];
      }
    } catch (_) {}
    return [];
  },

  async submitReview(review: { courseId: string; reviewerName: string; reviewerRole: string; status: string; comments: string }): Promise<any> {
    const res = await fetch('/api/curriculum/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    return res.json();
  },

  async submitSignOff(signoff: Partial<CurriculumSignOffRecord> | { courseId: string; stageName: string; owner: string; status: string; comments: string; officerRole?: string }): Promise<any> {
    const res = await fetch('/api/curriculum/signoff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signoff),
    });
    return res.json();
  }
};

export const TrainingPlanService = {
  async getPlans(): Promise<any[]> {
    try {
      const res = await fetch('/api/training-plans');
      if (res.ok) return await res.json();
    } catch (_) {}
    return [];
  },

  async createPlan(plan: any): Promise<any> {
    const res = await fetch('/api/training-plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan),
    });
    return res.json();
  }
};

export const TrainerService = {
  async getTrainers(params?: { search?: string; institute?: string; skill?: string }): Promise<ServiceResponse<TrainerRecord[]>> {
    try {
      const res = await fetch('/api/trainers');
      if (res.ok) {
        let list: TrainerRecord[] = await res.json();
        if (params?.search) {
          const q = params.search.toLowerCase();
          list = list.filter(t => t.name.toLowerCase().includes(q) || t.institute.toLowerCase().includes(q));
        }
        if (params?.institute && params.institute !== 'All institutes') {
          list = list.filter(t => t.institute === params.institute);
        }
        if (params?.skill && params.skill !== 'All skills') {
          list = list.filter(t => t.skills.includes(params.skill!));
        }
        return {
          data: list,
          total: list.length,
          source: 'synced',
          lastSynchronized: new Date().toISOString()
        };
      }
    } catch (_) {}

    // Fallback
    let list = [...TRAINERS_DATA];
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.institute.toLowerCase().includes(q));
    }
    if (params?.institute && params.institute !== 'All institutes') {
      list = list.filter(t => t.institute === params.institute);
    }
    if (params?.skill && params.skill !== 'All skills') {
      list = list.filter(t => t.skills.includes(params.skill!));
    }
    return {
      data: list,
      total: list.length,
      source: 'demo',
      lastSynchronized: SYNC_TIMESTAMP
    };
  },

  async createTrainer(trainer: any): Promise<any> {
    const res = await fetch('/api/trainers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trainer),
    });
    return res.json();
  }
};

export const ResourceService = {
  async getEquipment(): Promise<ServiceResponse<EquipmentRecord[]>> {
    try {
      const res = await fetch('/api/resources/equipment');
      if (res.ok) {
        const data = await res.json();
        return { data, total: data.length, source: 'synced', lastSynchronized: new Date().toISOString() };
      }
    } catch (_) {}

    return {
      data: EQUIPMENT_DATA,
      total: EQUIPMENT_DATA.length,
      source: 'demo',
      lastSynchronized: SYNC_TIMESTAMP
    };
  },

  async addEquipment(equip: any): Promise<any> {
    const res = await fetch('/api/resources/equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equip),
    });
    return res.json();
  },

  async getBudgets(): Promise<any[]> {
    try {
      const res = await fetch('/api/resources/budget');
      if (res.ok) return await res.json();
    } catch (_) {}
    return [];
  },

  async addBudget(budget: any): Promise<any> {
    const res = await fetch('/api/resources/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget),
    });
    return res.json();
  }
};

export const ScenarioService = {
  async simulate(parameters: any): Promise<any> {
    const res = await fetch('/api/scenario/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parameters),
    });
    if (!res.ok) throw new Error('Failed to run scenario simulation');
    return res.json();
  }
};

export const EmployerService = {
  async getJobs(): Promise<any[]> {
    try {
      const res = await fetch('/api/employer/jobs');
      if (res.ok) return await res.json();
    } catch (_) {}
    return [];
  },

  async postJob(job: any): Promise<any> {
    const res = await fetch('/api/employer/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    return res.json();
  },

  async getCandidates(): Promise<any[]> {
    try {
      const res = await fetch('/api/employer/candidates');
      if (res.ok) return await res.json();
    } catch (_) {}
    return [];
  },

  async shortlistCandidate(candidateId: string): Promise<any> {
    const res = await fetch('/api/employer/shortlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId }),
    });
    return res.json();
  }
};

export const StudentService = {
  async getDashboard(): Promise<any> {
    try {
      const res = await fetch('/api/student/dashboard');
      if (res.ok) return await res.json();
    } catch (_) {}
    return null;
  }
};

export const AlertService = {
  async getAlerts(severity?: string): Promise<ServiceResponse<AlertRecord[]>> {
    try {
      const res = await fetch('/api/alerts');
      if (res.ok) {
        let list = await res.json();
        if (severity && severity !== 'All') {
          list = list.filter((a: any) => a.severity === severity);
        }
        return { data: list, total: list.length, source: 'synced', lastSynchronized: new Date().toISOString() };
      }
    } catch (_) {}

    let list = [...INITIAL_ALERTS];
    if (severity && severity !== 'All') {
      list = list.filter(a => a.severity === severity);
    }
    return {
      data: list,
      total: list.length,
      source: 'demo',
      lastSynchronized: SYNC_TIMESTAMP
    };
  },

  async updateStatus(id: number, status: string, read?: boolean): Promise<any> {
    const res = await fetch(`/api/alerts/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, read }),
    });
    return res.json();
  },

  async markAllRead(): Promise<any> {
    const res = await fetch('/api/alerts/mark-all-read', { method: 'POST' });
    return res.json();
  }
};

export const DataQualityService = {
  async getMetrics(): Promise<any> {
    try {
      const res = await fetch('/api/data-quality/metrics');
      if (res.ok) return await res.json();
    } catch (_) {}
    return null;
  },

  async runAudit(): Promise<any> {
    const res = await fetch('/api/data-quality/run-checks', { method: 'POST' });
    return res.json();
  }
};

export const DataSourceService = {
  async getDataSources(): Promise<any[]> {
    try {
      const res = await fetch('/api/data-sources');
      if (res.ok) return await res.json();
    } catch (_) {}
    return [];
  },

  async syncSource(sourceId: string): Promise<any> {
    const res = await fetch('/api/data-sources/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceId }),
    });
    return res.json();
  }
};

export const ReportService = {
  async getReports(): Promise<any[]> {
    try {
      const res = await fetch('/api/reports');
      if (res.ok) return await res.json();
    } catch (_) {}
    return [];
  }
};

export const AuditLogService = {
  async getLogs(): Promise<any[]> {
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) return await res.json();
    } catch (_) {}
    return AUDIT_LOGS_DATA;
  },

  async logEvent(entry: any): Promise<any> {
    try {
      await fetch('/api/audit-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (_) {}
  }
};

export const SystemHealthService = {
  async getHealth(): Promise<any> {
    try {
      const res = await fetch('/api/system/health');
      if (res.ok) return await res.json();
    } catch (_) {}
    return null;
  }
};

export const UserService = {
  async getUsers(): Promise<any[]> {
    try {
      const res = await fetch('/api/users');
      if (res.ok) return await res.json();
    } catch (_) {}
    return DEMO_USERS_DATA;
  },

  async createUser(user: any): Promise<any> {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return res.json();
  },

  async toggleUserStatus(id: string): Promise<any> {
    const res = await fetch(`/api/users/${id}/toggle`, { method: 'POST' });
    return res.json();
  }
};

export const SearchService = {
  async searchGlobal(query: string, category?: string): Promise<any[]> {
    try {
      const url = new URL('/api/search', window.location.origin);
      url.searchParams.set('q', query);
      if (category) url.searchParams.set('category', category);
      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        return json.results || [];
      }
    } catch (_) {}
    return [];
  }
};

export const CourseService = {
  async getCourses(): Promise<ServiceResponse<Record<string, CourseData>>> {
    return {
      data: COURSES_DATA,
      total: Object.keys(COURSES_DATA).length,
      source: 'demo',
      lastSynchronized: SYNC_TIMESTAMP
    };
  }
};

export interface LinkedInStatusResponse {
  configured: boolean;
  connected: boolean;
  connectedAt: string | null;
  clientIdConfigured: boolean;
  clientSecretConfigured: boolean;
  profile: {
    name: string;
    headline: string;
    email: string;
    organization: string;
  } | null;
  permissions: {
    scope: string;
    name: string;
    status: 'Active' | 'Pending Authorization' | 'Requires Enterprise Approval';
    description: string;
  }[];
  requiresApproval: string[];
  notice: string;
}

export const LinkedInService = {
  async getStatus(): Promise<LinkedInStatusResponse> {
    try {
      const res = await fetch('/api/linkedin/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return {
        configured: false,
        connected: false,
        connectedAt: null,
        clientIdConfigured: false,
        clientSecretConfigured: false,
        profile: null,
        permissions: [],
        requiresApproval: ['Enterprise Partner Authorization Required'],
        notice: 'Unable to reach backend LinkedIn gateway.',
      };
    }
  },

  async getAuthUrl(): Promise<{ url: string; error?: string }> {
    const res = await fetch('/api/linkedin/auth-url');
    return res.json();
  },

  async disconnect(): Promise<LinkedInStatusResponse> {
    const res = await fetch('/api/linkedin/disconnect', { method: 'POST' });
    return res.json();
  }
};

export const StatePersistenceService = {
  async getState(): Promise<any> {
    try {
      const res = await fetch('/api/state');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async saveState(updates: any): Promise<boolean> {
    try {
      const res = await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
};
