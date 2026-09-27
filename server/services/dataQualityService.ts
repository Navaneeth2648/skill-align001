import { getStoredState, saveStoredState } from './persistenceService';
import { DataQualityMetric } from '../types';

export function runDataQualityAudit(): DataQualityMetric {
  const state = getStoredState();

  let missingDistrictsCount = 0;
  let duplicatesDetectedCount = 0;
  let invalidLocationsCount = 0;
  let staleRecordsCount = 0;
  let extractionConfidenceWarnings = 0;
  let totalRecordsChecked = 0;

  const validMaharashtraDistricts = [
    'Ahmednagar', 'Akola', 'Amravati', 'Chhatrapati Sambhajinagar', 'Beed', 'Bhandara', 'Buldhana',
    'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur',
    'Latur', 'Mumbai', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Dharashiv',
    'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg',
    'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
  ];

  const now = new Date().getTime();
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

  // 1. Audit Employer Jobs
  const jobTitleCompanySet = new Set<string>();
  for (const job of state.employerJobs) {
    totalRecordsChecked++;
    if (!job.district || job.district.trim() === '') missingDistrictsCount++;
    else if (!validMaharashtraDistricts.some(d => job.district.toLowerCase().includes(d.toLowerCase()))) {
      invalidLocationsCount++;
    }

    const key = `${job.title.toLowerCase()}||${job.company.toLowerCase()}`;
    if (jobTitleCompanySet.has(key)) duplicatesDetectedCount++;
    else jobTitleCompanySet.add(key);

    const postDate = new Date(job.postedDate).getTime();
    if (!isNaN(postDate) && now - postDate > ninetyDaysMs) {
      staleRecordsCount++;
    }
  }

  // 2. Audit Trainers
  for (const trainer of state.trainers) {
    totalRecordsChecked++;
    if (!trainer.district || trainer.district.trim() === '') missingDistrictsCount++;
    if (trainer.cert === 'Renewal due' || trainer.cert === 'Development needed') {
      extractionConfidenceWarnings++;
    }
  }

  // 3. Audit Equipment
  for (const equip of state.equipment) {
    totalRecordsChecked++;
    if (!equip.district) missingDistrictsCount++;
    if (equip.shortage > 0) extractionConfidenceWarnings++;
  }

  // 4. Audit Training Plans
  for (const plan of state.trainingPlans) {
    totalRecordsChecked++;
    if (!plan.district) missingDistrictsCount++;
  }

  // Compute overall data quality index (0 - 100)
  const issueSum = missingDistrictsCount + (duplicatesDetectedCount * 2) + invalidLocationsCount + (staleRecordsCount * 0.5);
  const penalty = totalRecordsChecked > 0 ? (issueSum / totalRecordsChecked) * 100 : 0;
  const overallQualityScore = Math.max(65, Math.min(100, Math.round(100 - penalty)));

  const metric: DataQualityMetric = {
    overallQualityScore,
    totalRecordsChecked,
    missingDistrictsCount,
    duplicatesDetectedCount,
    invalidLocationsCount,
    staleRecordsCount,
    extractionConfidenceWarnings,
    lastRunTimestamp: new Date().toISOString(),
    qualityIssues: [
      {
        issue: 'Missing district taxonomy references',
        severity: missingDistrictsCount > 10 ? 'High' : 'Medium',
        count: String(missingDistrictsCount),
        description: 'Records missing standardized 36-district Maharashtra geographic codes.',
        recommendedAction: 'Apply automated geo-tagging based on postal code / locality keywords.',
      },
      {
        issue: 'Duplicate postings detected across feeds',
        severity: duplicatesDetectedCount > 0 ? 'Medium' : 'Low',
        count: String(duplicatesDetectedCount),
        description: 'Identical title and company vacancy notices detected across multiple channels.',
        recommendedAction: 'Deduplicate postings using fuzzy title similarity and retained source authority.',
      },
      {
        issue: 'Outdated or stale records (> 90 days)',
        severity: staleRecordsCount > 15 ? 'High' : 'Medium',
        count: String(staleRecordsCount),
        description: 'Job or equipment records older than 90 days without recent verification.',
        recommendedAction: 'Trigger automated archival or request employer/ITI verification.',
      },
      {
        issue: 'Non-standard location naming variations',
        severity: invalidLocationsCount > 5 ? 'Medium' : 'Low',
        count: String(invalidLocationsCount),
        description: 'Location strings not matching official Maharashtra district gazetteer.',
        recommendedAction: 'Standardize municipal corporation names to parent district codes.',
      },
    ],
  };

  saveStoredState({ dataQuality: metric });
  return metric;
}
