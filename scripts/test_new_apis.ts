async function testAllApis() {
  console.log('--- Testing /api/system/health ---');
  const hRes = await fetch('http://localhost:5000/api/system/health');
  const health = await hRes.json();
  console.log('Health components count:', health.components?.length);

  console.log('\n--- Testing /api/assistant/chat ---');
  const cRes = await fetch('http://localhost:5000/api/assistant/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'What skills are currently in demand?' }),
  });
  const chat = await cRes.json();
  console.log('Chat status:', cRes.status);
  console.log('Chat answer snippet:', chat.answer?.substring(0, 100) + '...');
  console.log('Provenance:', chat.provenance);
  console.log('Route:', chat.suggestedRoute);

  console.log('\n--- Testing /api/profile ---');
  const pRes = await fetch('http://localhost:5000/api/profile');
  const profile = await pRes.json();
  console.log('Candidate Name:', profile.profile?.personal?.name);
  console.log('Target Job:', profile.profile?.professional?.targetJobTitle);
  console.log('Skills count:', profile.profile?.skills?.technicalSkills?.length);

  console.log('\n--- Testing /api/curriculum ---');
  const currRes = await fetch('http://localhost:5000/api/curriculum');
  const curr = await currRes.json();
  console.log('Curriculum count:', curr.curriculumRecords?.length);
  console.log('First Course:', curr.curriculumRecords[0]?.name, 'Alignment:', curr.curriculumRecords[0]?.alignmentPercentage + '%');

  console.log('\n--- Testing /api/scenario/simulate ---');
  const sRes = await fetch('http://localhost:5000/api/scenario/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      trainingCapacityDelta: 20,
      newInstitutesCount: 5,
      skillDemandGrowth: 15,
      vacancyDemandDelta: 10,
      budgetDelta: 10,
      district: 'Pune',
      courseCapacityDelta: 25,
    }),
  });
  const sim = await sRes.json();
  console.log('Sim Trainees Change:', sim.difference?.enrolledTraineesChange);
  console.log('Sim Placement Change %:', sim.difference?.placementRateChangePercent);
  console.log('Sim Deficit Reduction %:', sim.difference?.skillDeficitReductionPercent);

  console.log('\n--- Testing /api/search?q=React ---');
  const searchRes = await fetch('http://localhost:5000/api/search?q=React');
  const search = await searchRes.json();
  console.log('Search matches:', search.results?.length);
  if (search.results?.length > 0) {
    console.log('First match:', search.results[0].title, `(${search.results[0].category})`);
  }

  console.log('\n--- ALL BACKEND TEST CALLS SUCCEEDED! ---');
}

testAllApis().catch(console.error);
