'use client';

import { useState } from 'react';
import type { CommitmentSummary, CommitmentStatus } from '@/types/commitment';
import { formatStorageSize } from '@/lib/commitmentUtils';
import CommitmentCard from './CommitmentCard';

interface CommitmentListProps {
  commitments: CommitmentSummary[];
  loading?: boolean;
  connectedAddress?: string;
  onComplete?: (id: number) => void;
}

type FilterKey = 'all' | CommitmentStatus;

export default function CommitmentList({ commitments, loading, connectedAddress, onComplete }: CommitmentListProps) {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = filter === 'all'
    ? commitments
    : commitments.filter((s) => s.status === filter);

  const activeCount = commitments.filter((s) => s.status === 'active' || s.status === 'expiring-soon').length;
  const totalStorage = commitments.reduce((sum, s) => sum + s.commitment.storageSizeMb, 0);
  const totalStake = commitments.reduce((sum, s) => sum + s.commitment.stakeRequired, 0);

  const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'expiring-soon', label: 'Expiring' },
    { key: 'completed', label: 'Completed' },
    { key: 'expired', label: 'Expired' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-2xl font-bold text-gray-900">{activeCount}</span>
            <p className="text-xs text-gray-500">Active</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-gray-900">{formatStorageSize(totalStorage)}</span>
            <p className="text-xs text-gray-500">Total Storage</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-gray-900">{(totalStake / 1_000_000).toFixed(0)}</span>
            <p className="text-xs text-gray-500">STX Locked</p>
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === opt.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse h-40 rounded-xl bg-gray-100" />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-400 text-sm">No commitments found</p>
          <p className="text-gray-300 text-xs mt-1">Try changing the filter above</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((summary) => (
          <CommitmentCard
            key={summary.commitment.id}
            summary={summary}
            connectedAddress={connectedAddress}
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  );
}
