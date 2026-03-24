'use client';

import type { ReputationTier } from '@/types/reputation';

interface ReputationBadgeProps {
  tier: ReputationTier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const TIER_STYLES: Record<ReputationTier, { bg: string; text: string; label: string; icon: string }> = {
  unverified: { bg: 'bg-gray-200', text: 'text-gray-600', label: 'Unverified', icon: '?' },
  bronze: { bg: 'bg-amber-700', text: 'text-white', label: 'Bronze', icon: 'B' },
  silver: { bg: 'bg-gray-400', text: 'text-white', label: 'Silver', icon: 'S' },
  gold: { bg: 'bg-yellow-400', text: 'text-yellow-900', label: 'Gold', icon: 'G' },
  platinum: { bg: 'bg-gradient-to-br from-indigo-500 to-purple-600', text: 'text-white', label: 'Platinum', icon: 'P' },
};

const SIZE_CLASSES = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
};

export default function ReputationBadge({ tier, size = 'md', showLabel = false, animated = false }: ReputationBadgeProps) {
  const style = TIER_STYLES[tier];
  const sizeClass = SIZE_CLASSES[size];
  const pulseClass = animated && tier === 'platinum' ? 'animate-pulse' : '';

  return (
    <div className="tier-badge inline-flex items-center gap-2">
      <div
        className={`${sizeClass} ${style.bg} ${style.text} ${pulseClass} flex items-center justify-center rounded-full font-bold select-none`}
        title={style.label}
      >
        {style.icon}
      </div>
      {showLabel && (
        <span className={`text-sm font-medium ${style.text === 'text-white' ? 'text-gray-800' : style.text}`}>
          {style.label} Provider
        </span>
      )}
    </div>
  );
}
