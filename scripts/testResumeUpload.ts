import fs from 'fs';
import path from 'path';

async function testUpload() {
  const filePath = path.resolve(process.cwd(), 'sample_resume_rahul_sharma.pdf');
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'application/pdf' });
  const formData = new FormData();
  formData.append('resume', blob, 'sample_resume_rahul_sharma.pdf');

  console.log('Sending resume upload to http://localhost:5000/api/resume/analyze...');
  const res = await fetch('http://localhost:5000/api/resume/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('API Error:', res.status, errorText);
    process.exit(1);
  }

  const json = await res.json();
  console.log('--- RESUME ANALYSIS RESULT ---');
  console.log('Success:', json.success);
  console.log('Filename:', json.analysis.filename);
  console.log('Analyzed At:', json.analysis.analyzedAt);
  console.log('Candidate Name:', json.analysis.candidate.name);
  console.log('Email:', json.analysis.candidate.email);
  console.log('Phone:', json.analysis.candidate.phone);
  console.log('Location:', json.analysis.candidate.location);
  console.log('Education:', JSON.stringify(json.analysis.candidate.education));
  console.log('Total Exp Years:', json.analysis.candidate.totalExperienceYears);
  console.log('Detected Roles:', json.analysis.candidate.detectedRoles);
  console.log('Technical Skills count:', json.analysis.candidate.technicalSkills.length);
  console.log('Technical Skills:', json.analysis.candidate.technicalSkills.map((s: any) => `${s.skill} (${s.level}, ${(s.confidence*100).toFixed(0)}%)`));
  console.log('Total Jobs Scanned:', json.analysis.totalJobsScanned);
  console.log('Recommended Jobs count:', json.analysis.recommendedJobs.length);
  if (json.analysis.recommendedJobs.length > 0) {
    const firstJob = json.analysis.recommendedJobs[0];
    console.log('\n--- TOP RECOMMENDED JOB ---');
    console.log('Title:', firstJob.title);
    console.log('Company:', firstJob.company);
    console.log('Location:', firstJob.location);
    console.log('Match Score:', firstJob.matchScore + '%');
    console.log('Match Breakdown:', JSON.stringify(firstJob.matchBreakdown));
    console.log('Matching Skills:', firstJob.matchingSkills);
    console.log('Missing Skills:', firstJob.missingSkills);
    console.log('Why It Matches:', firstJob.whyItMatches);
    console.log('Adzuna URL:', firstJob.jobUrl);
    console.log('Learning Recommendations:', firstJob.learningRecommendations.length);
  }
}

testUpload().catch(console.error);
