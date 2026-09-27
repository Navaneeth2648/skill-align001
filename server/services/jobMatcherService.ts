import { 
  CandidateProfile, 
  NormalizedJob, 
  RecommendedJob, 
  JobMatchBreakdown, 
  LearningRecommendation 
} from '../types';
import { fetchAdzunaJobs } from './adzunaService';

// Reference Learning Modules Catalogue for Skill Bridging
const REFERENCE_LEARNING_CATALOG: Record<string, { courseName: string; provider: string; level: string; sourceType: 'Reference Catalog' | 'Government ITI Standard' }> = {
  'AWS': { courseName: 'AWS Cloud Fundamentals & Infrastructure', provider: 'State Vocational Digital Academy', level: 'Intermediate', sourceType: 'Reference Catalog' },
  'Azure': { courseName: 'Microsoft Azure Cloud Solutions', provider: 'National Skill Development Portal', level: 'Intermediate', sourceType: 'Reference Catalog' },
  'Docker': { courseName: 'Containerization with Docker & Kubernetes', provider: 'Maharashtra ITI Advanced Tech Lab', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'Kubernetes': { courseName: 'Production Container Orchestration (K8s)', provider: 'DVET Industry Upskilling Roster', level: 'Advanced', sourceType: 'Government ITI Standard' },
  'PostgreSQL': { courseName: 'Enterprise Relational Databases (PostgreSQL)', provider: 'COPA Advanced Database Module', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'MongoDB': { courseName: 'NoSQL & Document Stores with MongoDB', provider: 'State Skill Training Centre', level: 'Beginner', sourceType: 'Reference Catalog' },
  'Power BI': { courseName: 'Business Intelligence & Dashboarding (Power BI)', provider: 'DVET Data Analytics Specialization', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'Tableau': { courseName: 'Executive Data Visualization with Tableau', provider: 'State Vocational Digital Academy', level: 'Intermediate', sourceType: 'Reference Catalog' },
  'Machine Learning': { courseName: 'Applied Machine Learning & Predictive Modeling', provider: 'Centre for Excellence in Emerging Tech', level: 'Advanced', sourceType: 'Reference Catalog' },
  'Deep Learning': { courseName: 'Neural Networks & Deep Learning with PyTorch', provider: 'Centre for Excellence in Emerging Tech', level: 'Advanced', sourceType: 'Reference Catalog' },
  'React': { courseName: 'Modern Web Frontends with React & TypeScript', provider: 'COPA Web Developer Curriculum', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'Node.js': { courseName: 'Scalable Backend Services with Node.js & Express', provider: 'COPA Full Stack Curriculum', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'Spring Boot': { courseName: 'Enterprise Java Services with Spring Boot', provider: 'National Vocational Training Institute', level: 'Advanced', sourceType: 'Reference Catalog' },
  'Python': { courseName: 'Core Python for Scientific & Web Applications', provider: 'COPA Python Programming Module', level: 'Beginner', sourceType: 'Government ITI Standard' },
  'SQL': { courseName: 'Database Management Systems & SQL Proficiency', provider: 'COPA Core Syllabus (NSQF Level 4)', level: 'Beginner', sourceType: 'Government ITI Standard' },
  'AutoCAD': { courseName: 'Computer Aided Drafting (AutoCAD 2D & 3D)', provider: 'Draughtsman Mechanical Curriculum', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'CNC Machining': { courseName: 'CNC Milling & Lathe Programming Operations', provider: 'Turner / Machinist ITI Workshop', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'PLC / SCADA': { courseName: 'Industrial Automation (PLC / SCADA & Drives)', provider: 'Electrician Advanced Training Lab', level: 'Advanced', sourceType: 'Government ITI Standard' },
  'Electrical Wiring': { courseName: 'Industrial Electrical Systems & Switchgear', provider: 'Electrician Trade Syllabus (NSQF Level 5)', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'Solar PV Installation': { courseName: 'Solar PV Rooftop Technician Certification', provider: 'Surya Mitra Skill Development Scheme', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'Git': { courseName: 'Collaborative Version Control with Git & GitHub', provider: 'State Skill Training Centre', level: 'Beginner', sourceType: 'Reference Catalog' },
  'Linux': { courseName: 'Linux System Administration & Shell Scripting', provider: 'COPA Operating Systems Module', level: 'Intermediate', sourceType: 'Government ITI Standard' },
  'CI/CD': { courseName: 'Continuous Integration & Deployment Pipelines', provider: 'Centre for Excellence in Emerging Tech', level: 'Intermediate', sourceType: 'Reference Catalog' },
};

// Skill keywords for scanning job descriptions
const RECOGNIZED_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C# / .NET', 'PHP',
  'React', 'Node.js', 'Express.js', 'Next.js', 'HTML / CSS', 'Tailwind CSS', 'Django', 'Flask', 'Spring Boot', 'REST APIs',
  'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
  'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'Linux', 'CI/CD',
  'Data Analysis', 'Power BI', 'Tableau', 'Pandas', 'NumPy', 'Machine Learning', 'Deep Learning', 'Microsoft Excel',
  'AutoCAD', 'CNC Machining', 'PLC / SCADA', 'Electrical Wiring', 'Welding', 'Solar PV Installation'
];

/**
 * Extracts recognized technical skills from a raw job description and title.
 */
export function extractSkillsFromJobText(text: string): string[] {
  const found: string[] = [];
  for (const skill of RECOGNIZED_SKILLS) {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text)) {
      found.push(skill);
    }
  }
  return found;
}

/**
 * Calculates role similarity between candidate's detected roles and the job title.
 */
function calculateRoleSimilarity(candidateRoles: string[], jobTitle: string): number {
  const titleLower = jobTitle.toLowerCase();
  for (const role of candidateRoles) {
    const roleLower = role.toLowerCase();
    if (titleLower.includes(roleLower) || roleLower.includes(titleLower)) {
      return 95;
    }
    const words = roleLower.split(' ');
    const matchedWords = words.filter(w => w.length > 2 && titleLower.includes(w));
    if (matchedWords.length >= 2) {
      return 85;
    } else if (matchedWords.length === 1) {
      return 70;
    }
  }
  return 50;
}

/**
 * Calculates location match score.
 */
function calculateLocationCompatibility(candidateLocation: string | null, jobLocation: string, jobDistrict: string): number {
  if (!candidateLocation) return 80; // General compatibility
  const candLower = candidateLocation.toLowerCase();
  const jobLocLower = jobLocation.toLowerCase();
  const jobDistLower = jobDistrict.toLowerCase();

  if (candLower.includes(jobDistLower) || jobLocLower.includes(candLower)) {
    return 100;
  }
  if (candLower.includes('maharashtra') || jobLocLower.includes('maharashtra')) {
    return 85;
  }
  return 65;
}

/**
 * Calculates experience compatibility.
 */
function calculateExperienceCompatibility(candidateYears: number, description: string): number {
  const expMatch = description.match(/(\d+)(?:\s*-\s*(\d+))?\s*(?:\+|plus)?\s*years?(?:\s+of)?\s+exp/i);
  if (!expMatch) return 85; // Standard alignment

  const minYears = parseInt(expMatch[1], 10);
  const maxYears = expMatch[2] ? parseInt(expMatch[2], 10) : minYears + 3;

  if (candidateYears >= minYears && candidateYears <= maxYears + 2) {
    return 95;
  } else if (candidateYears < minYears) {
    const delta = minYears - candidateYears;
    return Math.max(50, 90 - delta * 15);
  } else {
    return 80;
  }
}

/**
 * Queries real Adzuna jobs for the candidate and runs the structured matching engine.
 */
export async function matchJobsForCandidate(candidate: CandidateProfile): Promise<{
  recommendedJobs: RecommendedJob[];
  totalScanned: number;
  status: 'Connected' | 'Temporarily unavailable';
}> {
  // Candidate technical skills as array of strings
  const candidateSkillNames = candidate.technicalSkills.map(s => s.skill);

  // Queries to run against Adzuna
  const queriesToRun: string[] = [];
  if (candidate.detectedRoles.length > 0) {
    queriesToRun.push(...candidate.detectedRoles.slice(0, 2));
  }
  if (candidateSkillNames.length > 0) {
    // E.g. "Python Developer" or top skills
    queriesToRun.push(candidateSkillNames.slice(0, 2).join(' '));
  }

  // Location preference
  let locationQuery = 'Maharashtra';
  if (candidate.location) {
    const locLower = candidate.location.toLowerCase();
    if (locLower.includes('pune')) locationQuery = 'Pune, Maharashtra';
    else if (locLower.includes('mumbai')) locationQuery = 'Mumbai, Maharashtra';
    else if (locLower.includes('nagpur')) locationQuery = 'Nagpur, Maharashtra';
    else if (locLower.includes('hyderabad')) locationQuery = 'Hyderabad';
    else if (locLower.includes('bengaluru') || locLower.includes('bangalore')) locationQuery = 'Bengaluru';
    else if (locLower.includes('andhra') || locLower.includes('vijayawada')) locationQuery = 'India';
  }

  console.log(`[Jobs] Searching Adzuna for candidate roles: ${queriesToRun.slice(0, 3).join(', ')} (Location: ${locationQuery})`);

  const rawJobsMap = new Map<string, NormalizedJob>();
  let apiAvailable: 'Connected' | 'Temporarily unavailable' = 'Connected';

  try {
    for (const query of queriesToRun.slice(0, 3)) {
      try {
        const response = await fetchAdzunaJobs({
          keyword: query,
          location: locationQuery,
          page: 1,
        });

        for (const job of response.jobs) {
          if (!rawJobsMap.has(job.id)) {
            rawJobsMap.set(job.id, job);
          }
        }
      } catch (err: any) {
        console.warn(`[Jobs] Query '${query}' failed:`, err.message);
      }
    }

    // If queries returned few jobs, also fetch broad regional tech vacancies
    if (rawJobsMap.size < 5) {
      try {
        const broad = await fetchAdzunaJobs({
          keyword: candidateSkillNames[0] || 'Full Stack',
          location: 'India',
          page: 1,
        });
        for (const job of broad.jobs) {
          if (!rawJobsMap.has(job.id)) {
            rawJobsMap.set(job.id, job);
          }
        }
      } catch (err: any) {
        console.warn('[Jobs] Broad query failed:', err.message);
      }
    }

    console.log(`[Jobs] Jobs returned: ${rawJobsMap.size} vacancies from Adzuna API`);
  } catch (outerErr: any) {
    console.error('[Jobs] Adzuna API error:', outerErr.message);
    apiAvailable = 'Temporarily unavailable';
  }

  const rawJobsList = Array.from(rawJobsMap.values());
  const recommendedJobs: RecommendedJob[] = [];

  for (const job of rawJobsList) {
    // Extract skills from this specific job notice
    let extractedJobSkills = extractSkillsFromJobText(`${job.title} ${job.description}`);

    // If job description is short and few skills detected, include at least relevant skills from candidate's domain
    if (extractedJobSkills.length === 0) {
      // Find overlap with candidate skills
      extractedJobSkills = candidateSkillNames.slice(0, 3);
    }

    // Matching vs Missing skills
    const matchingSkills = extractedJobSkills.filter(s => 
      candidateSkillNames.some(cs => cs.toLowerCase() === s.toLowerCase())
    );
    const missingSkills = extractedJobSkills.filter(s => 
      !candidateSkillNames.some(cs => cs.toLowerCase() === s.toLowerCase())
    );

    // Calculate structured match scores
    const skillRatio = matchingSkills.length / Math.max(extractedJobSkills.length, 1);
    const skillMatch = Math.round(skillRatio * 100);
    const roleMatch = calculateRoleSimilarity(candidate.detectedRoles, job.title);
    const locationMatch = calculateLocationCompatibility(candidate.location, job.location, job.district);
    const experienceMatch = calculateExperienceCompatibility(candidate.totalExperienceYears, job.description);

    // Transparent weighted formula: Skills (55%) + Role (25%) + Location (10%) + Experience (10%)
    const matchScore = Math.min(98, Math.max(35, Math.round(
      skillMatch * 0.55 + roleMatch * 0.25 + locationMatch * 0.10 + experienceMatch * 0.10
    )));

    const matchBreakdown: JobMatchBreakdown = {
      skillMatch,
      roleMatch,
      locationMatch,
      experienceMatch,
    };

    // Format salary display
    let salaryText = 'Not disclosed';
    if (job.salaryMin && job.salaryMax) {
      salaryText = `₹${(job.salaryMin / 100000).toFixed(1)}L – ₹${(job.salaryMax / 100000).toFixed(1)}L/yr`;
    } else if (job.salaryMin) {
      salaryText = `From ₹${(job.salaryMin / 100000).toFixed(1)}L/yr`;
    }

    // Compile learning recommendations for missing skills
    const learningRecommendations: LearningRecommendation[] = [];
    for (const missing of missingSkills) {
      const cat = REFERENCE_LEARNING_CATALOG[missing];
      if (cat) {
        learningRecommendations.push({
          skill: missing,
          courseName: cat.courseName,
          provider: cat.provider,
          level: cat.level,
          sourceType: cat.sourceType,
        });
      } else {
        learningRecommendations.push({
          skill: missing,
          courseName: `${missing} Competency & Industry Application`,
          provider: 'State Vocational Digital Academy',
          level: 'Intermediate',
          sourceType: 'Reference Catalog',
        });
      }
    }

    // Why it matches explanation
    let whyItMatches = '';
    if (matchingSkills.length > 0) {
      whyItMatches = `Verified candidate skills in ${matchingSkills.slice(0, 3).join(', ')} directly satisfy the primary requirements for this ${job.title} role.`;
      if (missingSkills.length > 0) {
        whyItMatches += ` ${missingSkills.length} skill(s) (${missingSkills.slice(0, 2).join(', ')}) were not detected in your resume.`;
      }
    } else {
      whyItMatches = `Role profile and domain alignment match candidate's background; core technical requirements require skill development.`;
    }

    recommendedJobs.push({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      district: job.district,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryText,
      postedDate: job.postedDate,
      jobUrl: job.jobUrl,
      source: 'Adzuna',
      description: job.description,
      extractedJobSkills,
      matchingSkills,
      missingSkills,
      matchScore,
      matchBreakdown,
      whyItMatches,
      learningRecommendations,
    });
  }

  // Sort by matchScore descending
  recommendedJobs.sort((a, b) => b.matchScore - a.matchScore);

  return {
    recommendedJobs,
    totalScanned: rawJobsList.length,
    status: apiAvailable,
  };
}
