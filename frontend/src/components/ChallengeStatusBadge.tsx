'use client';

import type { ChallengeStatus } from '@/types/challenge';

interface ChallengeStatusBadgeProps {
  status: ChallengeStatus;
}

const STATUS_CONFIG: Record<
  ChallengeStatus,
  { label: string; bg: string; text: string; dot?: string; pulse?: boolean }
> = {
  pending: {
    label: 'Pending',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
    pulse: true,
  },
  responded: {
    label: 'Responded',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  validated: {
    label: 'Validated',
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  slashed: {
    label: 'Slashed',
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  expired: {
    label: 'Expired',
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    dot: 'bg-gray-400',
  },
};

export default function ChallengeStatusBadge({ status }: ChallengeStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
      {config.dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`} />
      )}
      {config.label}
    </span>
  );
}
