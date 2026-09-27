import { getStoredState } from './persistenceService';
import { getCachedAdzunaJobs } from './adzunaService';

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'Jobs' | 'Skills' | 'Courses' | 'Institutions' | 'Trainers' | 'Employers' | 'Reports' | 'Users';
  subtitle: string;
  route: string;
  tags?: string[];
  relevance: number;
}

export function performGlobalSearch(query: string, categoryFilter?: string): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const state = getStoredState();
  const results: SearchResultItem[] = [];

  // 1. Search Jobs (Adzuna + Employer jobs)
  if (!categoryFilter || categoryFilter === 'Jobs' || categoryFilter === 'All') {
    // Adzuna cache
    const adzunaJobs = getCachedAdzunaJobs();
    for (const job of adzunaJobs) {
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchComp = job.company.toLowerCase().includes(q);
      const matchLoc = job.location.toLowerCase().includes(q);
      if (matchTitle || matchComp || matchLoc) {
        results.push({
          id: `job-adzuna-${job.id}`,
          title: job.title,
          category: 'Jobs',
          subtitle: `${job.company} · ${job.location} (Adzuna Vacancy)`,
          route: 'jobintel',
          tags: ['Adzuna', job.district || 'Maharashtra'],
          relevance: matchTitle ? 100 : 80,
        });
      }
    }

    // Employer portal jobs
    for (const empJob of state.employerJobs) {
      const matchTitle = empJob.title.toLowerCase().includes(q);
      const matchComp = empJob.company.toLowerCase().includes(q);
      const matchSkill = empJob.skills.some(s => s.toLowerCase().includes(q));
      if (matchTitle || matchComp || matchSkill) {
        results.push({
          id: `job-emp-${empJob.id}`,
          title: empJob.title,
          category: 'Jobs',
          subtitle: `${empJob.company} · ${empJob.district} · ${empJob.salaryText}`,
          route: 'employerportal',
          tags: empJob.skills.slice(0, 3),
          relevance: matchTitle ? 95 : 75,
        });
      }
    }
  }

  // 2. Search Skills
  if (!categoryFilter || categoryFilter === 'Skills' || categoryFilter === 'All') {
    const knownSkills = [
      { name: 'EV Diagnostics & Battery Tech', demand: 'Surging (+28%)', cluster: 'Pune / Nashik' },
      { name: 'React.js & Modern Web Stack', demand: 'High (+24%)', cluster: 'Mumbai / Pune' },
      { name: 'Industrial IoT & PLC/SCADA', demand: 'High (+22%)', cluster: 'Kolhapur / Aurangabad' },
      { name: 'Python & Data Analytics', demand: 'High (+19%)', cluster: 'Corporate Hubs' },
      { name: 'Solar PV Installation', demand: 'Moderate (+16%)', cluster: 'Nagpur / Vidarbha' },
      { name: 'CNC Turning & Precision Machining', demand: 'Stable (+14%)', cluster: 'Industrial MIDC' },
    ];
    for (const sk of knownSkills) {
      if (sk.name.toLowerCase().includes(q) || sk.cluster.toLowerCase().includes(q)) {
        results.push({
          id: `skill-${sk.name}`,
          title: sk.name,
          category: 'Skills',
          subtitle: `Demand: ${sk.demand} · Key Corridor: ${sk.cluster}`,
          route: 'skills',
          tags: ['Skill Intelligence', sk.demand],
          relevance: 90,
        });
      }
    }
  }

  // 3. Search Courses & Curriculum
  if (!categoryFilter || categoryFilter === 'Courses' || categoryFilter === 'All') {
    for (const curr of state.curriculumRecords) {
      if (curr.name.toLowerCase().includes(q) || curr.code.toLowerCase().includes(q) || curr.industry.toLowerCase().includes(q)) {
        results.push({
          id: `curr-${curr.id}`,
          title: `${curr.name} (${curr.code})`,
          category: 'Courses',
          subtitle: `Alignment: ${curr.alignmentPercentage}% · Status: ${curr.status} · Enrolled: ${curr.studentsCount}`,
          route: 'curriculum',
          tags: ['Vocational ITI', curr.industry],
          relevance: 95,
        });
      }
    }
  }

  // 4. Search Trainers
  if (!categoryFilter || categoryFilter === 'Trainers' || categoryFilter === 'All') {
    for (const trainer of state.trainers) {
      if (trainer.name.toLowerCase().includes(q) || trainer.skills.some(s => s.toLowerCase().includes(q)) || trainer.institute.toLowerCase().includes(q)) {
        results.push({
          id: `trainer-${trainer.id}`,
          title: trainer.name,
          category: 'Trainers',
          subtitle: `${trainer.qualification} · ${trainer.institute} (${trainer.cert})`,
          route: 'trainers',
          tags: trainer.skills.slice(0, 3),
          relevance: 85,
        });
      }
    }
  }

  // 5. Search Reports
  if (!categoryFilter || categoryFilter === 'Reports' || categoryFilter === 'All') {
    for (const rep of state.reports) {
      if (rep.title.toLowerCase().includes(q) || rep.category.toLowerCase().includes(q) || rep.code.toLowerCase().includes(q)) {
        results.push({
          id: `rep-${rep.id}`,
          title: rep.title,
          category: 'Reports',
          subtitle: `${rep.code} · Published: ${rep.publicationDate} · ${rep.fileSize}`,
          route: 'reportscentre',
          tags: [rep.category, rep.format],
          relevance: 80,
        });
      }
    }
  }

  // 6. Search Users (Admin / Staff directory)
  if (!categoryFilter || categoryFilter === 'Users' || categoryFilter === 'All') {
    for (const u of state.users) {
      if (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)) {
        results.push({
          id: `user-${u.id}`,
          title: u.name,
          category: 'Users',
          subtitle: `${u.role} · ${u.email} (${u.status})`,
          route: 'usermanagement',
          tags: [u.role],
          relevance: 70,
        });
      }
    }
  }

  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 20);
}
