'use client';

import type { ReputationScore } from '@/types/reputation';
import { getReputationTierProgress, getTierColor } from '@/lib/reputationUtils';

interface ReputationProgressBarProps {
  score: ReputationScore;
}

const TIER_FILL: Record<string, string> = {
  unverified: 'bg-gray-400',
  bronze: 'bg-amber-600',
  silver: 'bg-gray-400',
  gold: 'bg-yellow-400',
  platinum: 'bg-indigo-500',
};

const NEXT_TIER_LABEL: Record<string, string> = {
  unverified: 'Bronze',
  bronze: 'Silver',
  silver: 'Gold',
  gold: 'Platinum',
  platinum: 'Max',
};

export default function ReputationProgressBar({ score }: ReputationProgressBarProps) {
  const { next, progress } = getReputationTierProgress(score.raw);
  const fillClass = TIER_FILL[score.tier] ?? 'bg-gray-400';
  const nextLabel = NEXT_TIER_LABEL[score.tier] ?? 'Max';
  const pointsRemaining = score.tier === 'platinum' ? 0 : Math.max(0, next - score.raw);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-600">
        <span className={getTierColor(score.tier)}>{score.label}</span>
        <span className="text-gray-400">{nextLabel}</span>
      </div>
      <div className="reputation-bar w-full bg-gray-100">
        <div
          className={`h-full ${fillClass} transition-all duration-500`}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      {score.tier !== 'platinum' && (
        <p className="mt-2 text-center text-xs text-gray-500">
          {pointsRemaining} pts to {nextLabel}
        </p>
      )}
      {score.tier === 'platinum' && (
        <p className="mt-2 text-center text-xs text-indigo-600 font-medium">Maximum tier reached 💎</p>
      )}
    </div>
  );
}
