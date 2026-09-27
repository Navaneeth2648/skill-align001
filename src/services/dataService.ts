import { 
  JobRecord, CourseData, SkillGapRow, AlertRecord, ApprovalStage, 
  TrainerRecord, EquipmentRecord, CandidateRecord, ScholarshipRecord, 
  AuditRecord, QualityIssue, DemoUser, NotificationItem, AssistantResponse, RouteId
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

const SYNC_TIMESTAMP = '26 Sep 2026, 18:30 IST';

export const JobService = {
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

  async getJobById(id: number): Promise<JobRecord | undefined> {
    return INITIAL_JOBS.find(j => j.id === id);
  }
};

export const TrainerService = {
  async getTrainers(params?: { search?: string; institute?: string; skill?: string }): Promise<ServiceResponse<TrainerRecord[]>> {
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
  }
};

export const EquipmentService = {
  async getEquipment(): Promise<ServiceResponse<EquipmentRecord[]>> {
    return {
      data: EQUIPMENT_DATA,
      total: EQUIPMENT_DATA.length,
      source: 'demo',
      lastSynchronized: SYNC_TIMESTAMP
    };
  }
};

export const AlertService = {
  async getAlerts(severity?: string): Promise<ServiceResponse<AlertRecord[]>> {
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

export const DataQualityService = {
  async getQualityIssues(): Promise<ServiceResponse<QualityIssue[]>> {
    return {
      data: QUALITY_ISSUES_DATA,
      total: QUALITY_ISSUES_DATA.length,
      source: 'demo',
      lastSynchronized: SYNC_TIMESTAMP
    };
  }
};
