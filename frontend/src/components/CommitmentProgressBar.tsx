'use client';

import type { CommitmentStatus } from '@/types/commitment';

interface CommitmentProgressBarProps {
  percentComplete: number;
  status: CommitmentStatus;
}

function getFillColor(pct: number, status: CommitmentStatus): string {
  if (status === 'expired' || status === 'completed') return 'bg-blue-500';
  if (pct <= 50) return 'bg-blue-500';
  if (pct <= 85) return 'bg-green-500';
  if (pct <= 95) return 'bg-yellow-400';
  return 'bg-purple-500';
}

function getLabelColor(pct: number, status: CommitmentStatus): string {
  if (status === 'expired' || status === 'completed') return 'text-blue-600';
  if (pct <= 50) return 'text-blue-600';
  if (pct <= 85) return 'text-green-600';
  if (pct <= 95) return 'text-yellow-600';
  return 'text-purple-600';
}

export default function CommitmentProgressBar({ percentComplete, status }: CommitmentProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentComplete));
  const fillColor = getFillColor(clamped, status);
  const labelColor = getLabelColor(clamped, status);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">Progress</span>
        <span className={`text-xs font-semibold ${labelColor}`}>{clamped}%</span>
      </div>
      <div className="commitment-progress">
        <div
          className={`h-full ${fillColor} transition-all duration-700`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
