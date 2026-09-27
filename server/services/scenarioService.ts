import { ScenarioSimulationInput, ScenarioSimulationResult } from '../types';

export function calculateScenarioSimulation(input: ScenarioSimulationInput): ScenarioSimulationResult {
  // Baseline Maharashtra vocational training metrics (Annual state aggregate)
  const baseline = {
    enrolledTrainees: 84500,
    certifiedGraduates: 71825,      // 85% pass rate
    estimatedPlacementRate: 64.2,   // 64.2% placement rate
    skillDeficitIndex: 32.5,        // 32.5% gap index between market demand and curriculum coverage
    budgetUtilization: 88.4,        // 88.4% fiscal utilization
  };

  // Extract deltas from input
  const capDelta = Number(input.trainingCapacityDelta) || 0;
  const newInst = Number(input.newInstitutesCount) || 0;
  const demandGrowth = Number(input.skillDemandGrowth) || 0;
  const vacDelta = Number(input.vacancyDemandDelta) || 0;
  const budgetDelta = Number(input.budgetDelta) || 0;
  const courseCapDelta = Number(input.courseCapacityDelta) || 0;

  // Combined capacity expansion multiplier
  const capacityMultiplier = 1 + (capDelta / 100) + (newInst * 0.02) + (courseCapDelta * 0.005);
  
  // Projected Enrolled Trainees
  const projectedEnrolled = Math.round(baseline.enrolledTrainees * Math.max(0.5, capacityMultiplier));
  
  // Projected Certified Graduates (with slight efficiency drop if expansion is aggressive)
  const graduationEfficiency = capacityMultiplier > 1.3 ? 0.82 : 0.85;
  const projectedGraduates = Math.round(projectedEnrolled * graduationEfficiency);

  // Projected Placement Rate
  // Increases with vacancy demand and course modernization, constrained by general absorptive capacity
  const placementRateDelta = (vacDelta * 0.35) + (budgetDelta * 0.15) - (demandGrowth * 0.08);
  const projectedPlacementRate = Math.min(94.0, Math.max(45.0, Number((baseline.estimatedPlacementRate + placementRateDelta).toFixed(1))));

  // Projected Skill Deficit Index
  // Reduced by curriculum capacity expansion and training investment, exacerbated by rapid skill demand shifts
  const deficitReduction = (capDelta * 0.28) + (budgetDelta * 0.22) + (courseCapDelta * 0.15) - (demandGrowth * 0.40);
  const projectedDeficitIndex = Math.max(10.0, Number((baseline.skillDeficitIndex - deficitReduction).toFixed(1)));

  // Projected Budget Utilization
  const projectedBudgetUtil = Math.min(99.5, Math.max(60.0, Number((baseline.budgetUtilization + (budgetDelta * 0.2) + (newInst * 0.5)).toFixed(1))));

  // Budget impact in lakhs (approx ₹120L baseline operational scale)
  const budgetImpactInLakhs = Math.round(120 * (budgetDelta / 100) + (newInst * 18.5));

  return {
    assumptionsDisclaimer: 'MATHEMATICAL SCENARIO SIMULATION ONLY: This deterministic projection is computed from state baseline enrollments and adjustable parameter deltas. It does not constitute an official economic forecast.',
    timestamp: new Date().toISOString(),
    parameters: input,
    before: baseline,
    scenario: {
      enrolledTrainees: projectedEnrolled,
      certifiedGraduates: projectedGraduates,
      estimatedPlacementRate: projectedPlacementRate,
      skillDeficitIndex: projectedDeficitIndex,
      budgetUtilization: projectedBudgetUtil,
    },
    difference: {
      enrolledTraineesChange: projectedEnrolled - baseline.enrolledTrainees,
      certifiedGraduatesChange: projectedGraduates - baseline.certifiedGraduates,
      placementRateChangePercent: Number((projectedPlacementRate - baseline.estimatedPlacementRate).toFixed(1)),
      skillDeficitReductionPercent: Number((baseline.skillDeficitIndex - projectedDeficitIndex).toFixed(1)),
      budgetImpactInLakhs,
    },
  };
}
