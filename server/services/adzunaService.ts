import { AdzunaRawJob, AdzunaSearchResponse, JobsApiResponse, NormalizedJob } from '../types';

function cleanText(text?: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDistrict(locationObj?: { display_name?: string; area?: string[] }, defaultLocation: string = 'Maharashtra'): string {
  if (locationObj?.area && Array.isArray(locationObj.area)) {
    const specificArea = locationObj.area.find(
      (a) => a && a.toLowerCase() !== 'india' && a.toLowerCase() !== 'maharashtra'
    );
    if (specificArea) {
      return specificArea.trim();
    }
  }

  if (locationObj?.display_name) {
    const parts = locationObj.display_name.split(',').map((p) => p.trim());
    if (parts.length > 0 && parts[0].toLowerCase() !== 'india') {
      return parts[0];
    }
  }

  return defaultLocation;
}

// In-memory cache for recent Adzuna results to serve Assistant and single-job lookups
let cachedJobs: NormalizedJob[] = [];
let lastCacheSync: string = '';

export function getCachedAdzunaJobs(): NormalizedJob[] {
  return cachedJobs;
}

export function getLastCacheSyncTime(): string {
  return lastCacheSync;
}

export async function fetchAdzunaJobs(params: {
  keyword?: string;
  location?: string;
  page?: number;
}): Promise<JobsApiResponse> {
  const appId = process.env.ADZUNA_APP_ID?.trim();
  const appKey = process.env.ADZUNA_APP_KEY?.trim();

  if (!appId || !appKey) {
    throw new Error('ADZUNA_CREDENTIALS_MISSING: ADZUNA_APP_ID or ADZUNA_APP_KEY is not configured in backend environment.');
  }

  const country = 'in'; // India
  const page = Math.max(1, Number(params.page) || 1);
  const location = params.location?.trim() || 'Maharashtra';
  const keyword = params.keyword?.trim() || '';

  const url = new URL(`https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`);
  url.searchParams.set('app_id', appId);
  url.searchParams.set('app_key', appKey);
  url.searchParams.set('results_per_page', '20');
  url.searchParams.set('content-type', 'application/json');

  if (keyword) {
    url.searchParams.set('what', keyword);
  }

  if (location) {
    url.searchParams.set('where', location);
  }

  // Network call with 1 retry on transient network errors
  let lastError: any = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'SkillAlign-SIH26134/1.0',
        },
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Adzuna API rate limit reached (HTTP 429). Please wait a moment before retrying.');
        }
        if (response.status === 401 || response.status === 403) {
          throw new Error(`Adzuna authentication failed (HTTP ${response.status}). Please verify ADZUNA_APP_ID and ADZUNA_APP_KEY.`);
        }
        const errText = await response.text().catch(() => '');
        throw new Error(`Adzuna API error (${response.status}): ${errText}`);
      }

      const data = (await response.json()) as AdzunaSearchResponse;
      const rawResults: AdzunaRawJob[] = Array.isArray(data.results) ? data.results : [];
      const nowIso = new Date().toISOString();

      const normalizedJobs: NormalizedJob[] = rawResults.map((job, index) => {
        const rawId = job.id ? String(job.id) : `gen_${Date.now()}_${index}`;
        const rawTitle = cleanText(job.title || 'Untitled Vacancy');
        const company = job.company?.display_name ? cleanText(job.company.display_name) : 'Confidential Employer';
        const locName = job.location?.display_name ? cleanText(job.location.display_name) : location;
        const district = extractDistrict(job.location, location);
        const description = cleanText(job.description || '');

        return {
          id: rawId,
          source: 'Adzuna',
          sourceJobId: rawId,
          title: rawTitle,
          company,
          location: locName,
          district,
          description,
          salaryMin: typeof job.salary_min === 'number' ? Math.round(job.salary_min) : null,
          salaryMax: typeof job.salary_max === 'number' ? Math.round(job.salary_max) : null,
          postedDate: job.created || nowIso,
          jobUrl: job.redirect_url || '',
          collectedAt: nowIso,
        };
      });

      // Update in-memory cache
      cachedJobs = normalizedJobs;
      lastCacheSync = nowIso;

      return {
        jobs: normalizedJobs,
        total: typeof data.count === 'number' ? data.count : normalizedJobs.length,
        page,
        source: 'Adzuna',
        lastUpdated: nowIso,
      };
    } catch (err: any) {
      lastError = err;
      if (attempt === 1 && !err.message?.includes('401') && !err.message?.includes('403') && !err.message?.includes('CREDENTIALS_MISSING')) {
        await new Promise((res) => setTimeout(res, 500)); // Short backoff
        continue;
      }
      break;
    }
  }

  throw lastError || new Error('Failed to retrieve jobs from Adzuna API');
}

export function fetchAdzunaJobById(id: string): NormalizedJob | undefined {
  return cachedJobs.find((j) => j.id === id || j.sourceJobId === id);
}
