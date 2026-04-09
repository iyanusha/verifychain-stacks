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

export function getReputationTierProgress(score: number): { current: number; next: number; progress: number } {
  if (score === 0) return { current: 0, next: 1, progress: 0 };
  if (score <= 100) return { current: 1, next: 100, progress: Math.round((score / 100) * 100) };
  if (score <= 300) return { current: 101, next: 300, progress: Math.round(((score - 101) / 199) * 100) };
  if (score <= 600) return { current: 301, next: 600, progress: Math.round(((score - 301) / 299) * 100) };
  return { current: 601, next: 1000, progress: Math.round(((score - 601) / 399) * 100) };
}

export function getTierIcon(tier: ReputationTier): string {
  const icons: Record<ReputationTier, string> = {
    unverified: '⚫',
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
  };
  return icons[tier];
}

export function compareProviders(
  a: { score: ReputationScore },
  b: { score: ReputationScore }
): number {
  return b.score.raw - a.score.raw;
}

export function getScoreDelta(before: ReputationData, after: ReputationData): number {
  return calculateReputationScore(after) - calculateReputationScore(before);
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
