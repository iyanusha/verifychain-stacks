'use client';

import { use } from 'react';
import { useFetchProvider } from '@/hooks/useFetchProvider';
import { useFetchReputation } from '@/hooks/useFetchReputation';
import ReputationScore from '@/components/ReputationScore';
import ReputationProgressBar from '@/components/ReputationProgressBar';
import ReputationHistory from '@/components/ReputationHistory';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProviderDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const providerId = parseInt(id, 10);

  const { provider, stakes, loading: pLoading } = useFetchProvider(providerId);
  const { reputation, score, loading: rLoading, lastUpdated } = useFetchReputation(providerId);

  if (pLoading || rLoading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-100" />
          <div className="h-24 rounded-xl bg-gray-100" />
        </div>
      </main>
    );
  }

  if (!provider) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-gray-500">Provider #{providerId} not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider #{providerId}</h1>
          <p className="text-sm text-gray-400">
            Registered at block #{provider.registrationBlock}
            {lastUpdated && (
              <span className="ml-2">· Updated {lastUpdated.toLocaleTimeString()}</span>
            )}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
          provider.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${provider.active ? 'bg-green-500' : 'bg-gray-400'}`} />
          {provider.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Storage Capacity</p>
          <p className="text-xl font-bold text-gray-800 mt-1">{provider.storageCapacityGb} GB</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Total Staked</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            {stakes ? (stakes.totalStaked / 1_000_000).toFixed(2) : '—'} STX
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Active Stake</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            {stakes ? (stakes.activeStake / 1_000_000).toFixed(2) : '—'} STX
          </p>
        </div>
      </div>

      {score && reputation && (
        <>
          <ReputationScore score={score} reputation={reputation} />
          <ReputationProgressBar score={score} />
        </>
      )}

      <ReputationHistory providerId={providerId} />
    </main>
  );
}
