'use client';

import { useState } from 'react';
import ReputationLeaderboard from '@/components/ReputationLeaderboard';
import ProviderCard, { type ProviderInfo } from '@/components/ProviderCard';
import { buildReputationScore } from '@/lib/reputationUtils';
import type { ReputationData } from '@/types/reputation';
import type { ReputationTier } from '@/types/reputation';

interface ProviderWithReputation {
  provider: ProviderInfo;
  reputation: ReputationData;
}

// Mock data — replace with contract indexer integration
const MOCK_PROVIDERS: ProviderWithReputation[] = [
  {
    provider: { id: 7, storageCapacityGb: 1024, active: true, stakedAmount: 120_000_000, registrationBlock: 143500 },
    reputation: { successCount: 80, failureCount: 2, totalCommitments: 41, lastActivityBlock: 145010 },
  },
  {
    provider: { id: 3, storageCapacityGb: 512, active: true, stakedAmount: 80_000_000, registrationBlock: 142000 },
    reputation: { successCount: 55, failureCount: 3, totalCommitments: 29, lastActivityBlock: 144800 },
  },
  {
    provider: { id: 12, storageCapacityGb: 2048, active: true, stakedAmount: 200_000_000, registrationBlock: 141000 },
    reputation: { successCount: 36, failureCount: 2, totalCommitments: 19, lastActivityBlock: 144600 },
  },
  {
    provider: { id: 5, storageCapacityGb: 256, active: false, stakedAmount: 40_000_000, registrationBlock: 140000 },
    reputation: { successCount: 22, failureCount: 3, totalCommitments: 12, lastActivityBlock: 144200 },
  },
  {
    provider: { id: 1, storageCapacityGb: 128, active: true, stakedAmount: 20_000_000, registrationBlock: 139000 },
    reputation: { successCount: 7, failureCount: 1, totalCommitments: 7, lastActivityBlock: 144000 },
  },
];

type SortKey = 'reputation' | 'stake' | 'commitments';
type TierFilter = 'all' | ReputationTier;

export default function ProvidersPage() {
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('reputation');

  const withScores = MOCK_PROVIDERS.map((p) => ({
    ...p,
    score: buildReputationScore(p.reputation),
  }));

  const filtered = withScores.filter((p) =>
    tierFilter === 'all' ? true : p.score.tier === tierFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'reputation') return b.score.raw - a.score.raw;
    if (sortKey === 'stake') return b.provider.stakedAmount - a.provider.stakedAmount;
    return b.reputation.totalCommitments - a.reputation.totalCommitments;
  });

  const TIER_OPTIONS: TierFilter[] = ['all', 'platinum', 'gold', 'silver', 'bronze', 'unverified'];
  const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'reputation', label: 'Reputation' },
    { key: 'stake', label: 'Stake' },
    { key: 'commitments', label: 'Commitments' },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Providers</h1>
        <p className="text-sm text-gray-500 mt-1">All registered storage providers on VerifyChain.</p>
      </div>

      <ReputationLeaderboard />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Filter by tier:</span>
          {TIER_OPTIONS.map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                tierFilter === tier
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Sort by:</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                sortKey === opt.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">No providers match the selected filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map(({ provider, score }) => (
            <ProviderCard key={provider.id} provider={provider} score={score} />
          ))}
        </div>
      )}
    </main>
  );
}
