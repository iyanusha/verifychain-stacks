import type { ReputationData, ReputationScore, ReputationTier } from '@/types/reputation';

export function calculateReputationScore(rep: ReputationData): number {
  const raw = rep.successCount * 10 - rep.failureCount * 25 + rep.totalCommitments * 2;
  return Math.max(0, Math.min(1000, raw));
}

export function getReputationTier(score: number): ReputationTier {
  if (score === 0) return 'unverified';
  if (score <= 100) return 'bronze';
  if (score <= 300) return 'silver';
  if (score <= 600) return 'gold';
  return 'platinum';
}

export function getSuccessRate(rep: ReputationData): number {
  const total = rep.successCount + rep.failureCount;
  if (total === 0) return 0;
  return Math.round((rep.successCount / total) * 100);
}

export function formatScore(score: number): string {
  return `${score} pts`;
}

export function getTierColor(tier: ReputationTier): string {
  const colors: Record<ReputationTier, string> = {
    unverified: 'text-gray-500',
    bronze: 'text-amber-700',
    silver: 'text-gray-400',
    gold: 'text-yellow-500',
    platinum: 'text-indigo-500',
  };
  return colors[tier];
}

export function buildReputationScore(rep: ReputationData): ReputationScore {
  const raw = calculateReputationScore(rep);
  const tier = getReputationTier(raw);
  const tierLabels: Record<ReputationTier, string> = {
    unverified: 'Unverified',
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
  };
  return {
    raw,
    tier,
    label: tierLabels[tier],
    color: getTierColor(tier),
  };
}
