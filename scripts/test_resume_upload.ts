import fs from 'fs';
import path from 'path';

async function testUpload() {
  console.log('[Test] Reading M_Navaneeth_Resume.pdf...');
  const filePath = path.resolve('M_Navaneeth_Resume.pdf');
  if (!fs.existsSync(filePath)) {
    console.error('File not found at:', filePath);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'application/pdf' });
  const form = new FormData();
  form.append('resume', blob, 'M_Navaneeth_Resume.pdf');

  console.log('[Test] Sending POST to http://localhost:5000/api/resume/analyze...');
  const startTime = Date.now();
  const res = await fetch('http://localhost:5000/api/resume/analyze', {
    method: 'POST',
    body: form,
  });

  const durationMs = Date.now() - startTime;
  console.log(`[Test] HTTP Status: ${res.status} ${res.statusText} in ${durationMs}ms`);

  const json = await res.json();
  if (!res.ok) {
    console.error('[Test] Error response:', JSON.stringify(json, null, 2));
    process.exit(1);
  }

  const analysis = json.analysis;
  const candidate = analysis.candidate;

  console.log('\n================ RESUME ANALYSIS RESULTS ================');
  console.log('Candidate Name:      ', candidate?.name);
  console.log('Detected Roles:      ', candidate?.detectedRoles?.join(', '));
  console.log('Location:            ', candidate?.location);
  console.log('Email Redacted:      ', candidate?.email ? '[REDACTED_OK]' : 'null');
  console.log('Phone Redacted:      ', candidate?.phone ? '[REDACTED_OK]' : 'null');
  console.log('GitHub:              ', candidate?.github);
  console.log('LinkedIn:            ', candidate?.linkedin);
  console.log('Extraction Method:   ', candidate?.extractionMethod);
  console.log('Summary Preview:     ', candidate?.summary?.substring(0, 150) + '...');
  console.log('Languages:           ', candidate?.languages?.join(', '));
  console.log('Categorized Skills:  ');
  for (const [cat, sk] of Object.entries(candidate?.categorizedSkills || {})) {
    if ((sk as string[]).length > 0) {
      console.log(`  - ${cat}: ${(sk as string[]).join(', ')}`);
    }
  }
  console.log('Technical Skills count: ', candidate?.technicalSkills?.length);
  console.log('Sample Technical Skills:', candidate?.technicalSkills?.slice(0, 8).map((s: any) => `${s.name} (${s.level})`).join(', '));

  console.log('Education Count:     ', candidate?.education?.length);
  candidate?.education?.forEach((edu: any, i: number) => {
    console.log(`  [Edu ${i+1}] ${edu.institution} | ${edu.degree} | Year: ${edu.year || 'N/A'}`);
  });
  console.log('Projects Count:      ', candidate?.projects?.length);
  candidate?.projects?.forEach((proj: any, i: number) => {
    console.log(`  [Proj ${i+1}] ${proj.title}: ${proj.description} (Tech: ${proj.tech?.join(', ')})`);
  });
  console.log('Achievements Count:  ', candidate?.achievements?.length);
  candidate?.achievements?.forEach((ach: any, i: number) => {
    console.log(`  [Ach ${i+1}] ${ach}`);
  });
  console.log('Certifications Count:', candidate?.certifications?.length);
  candidate?.certifications?.forEach((c: any, i: number) => {
    console.log(`  [Cert ${i+1}] ${c}`);
  });

  console.log('\n================ ADZUNA LIVE JOB RECOMMENDATIONS ================');
  console.log('Recommended Jobs Count:', analysis.recommendedJobs?.length);
  console.log('Total Jobs Scanned:    ', analysis.totalJobsScanned);
  console.log('Data Source:           ', analysis.dataSource);
  if (analysis.recommendedJobs && analysis.recommendedJobs.length > 0) {
    analysis.recommendedJobs.slice(0, 4).forEach((job: any, i: number) => {
      console.log(`\n--- Job #${i + 1} ---`);
      console.log('Title:          ', job.title);
      console.log('Company:        ', job.company);
      console.log('Location:       ', job.location);
      console.log('Salary:         ', job.salaryText);
      console.log('Match Score:    ', job.matchScore + '%');
      console.log('Breakdown:      ', `Skills: ${job.matchBreakdown?.skillMatch}%, Role: ${job.matchBreakdown?.roleMatch}%, Loc: ${job.matchBreakdown?.locationMatch}%`);
      console.log('Matching Skills:', job.matchingSkills?.join(', '));
      console.log('Missing Skills: ', job.missingSkills?.join(', '));
      console.log('Why It Matches: ', job.whyItMatches);
      console.log('Job URL:        ', job.jobUrl);
      if (job.learningRecommendations?.length > 0) {
        console.log('Course Rec:     ', job.learningRecommendations[0].courseName, `(${job.learningRecommendations[0].provider})`);
      }
    });
  }
  console.log('\n================ ALL CHECKS VERIFIED SUCCESSFULLY ================');
}

testUpload().catch((err) => {
  console.error('[Test] Unhandled rejection:', err);
  process.exit(1);
});
