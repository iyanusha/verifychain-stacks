'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useFetchCommitments } from '@/hooks/useFetchCommitments';
import CommitmentList from '@/components/CommitmentList';
import { formatStorageSize } from '@/lib/commitmentUtils';

function CommitmentsContent() {
  const searchParams = useSearchParams();
  const providerParam = searchParams.get('provider');
  const providerId = providerParam ? parseInt(providerParam, 10) : undefined;

  const { commitments, loading, error } = useFetchCommitments({ providerId });

  const activeCount = commitments.filter((s) => s.status === 'active' || s.status === 'expiring-soon').length;
  const totalStorage = commitments.reduce((sum, s) => sum + s.commitment.storageSizeMb, 0);
  const totalStake = commitments.reduce((sum, s) => sum + s.commitment.stakeRequired, 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Commitments</h1>
        <p className="text-sm text-gray-500 mt-1">
          Storage commitments registered on VerifyChain.
          {providerId && <span className="ml-1 font-medium">Filtered by Provider #{providerId}</span>}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-gray-500 mt-1">Active Commitments</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{formatStorageSize(totalStorage)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Storage Verified</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{(totalStake / 1_000_000).toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">STX Stake Locked</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <CommitmentList commitments={commitments} loading={loading} />
    </main>
  );
}

export default function CommitmentsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10 animate-pulse h-64 bg-gray-100 rounded-xl" />}>
      <CommitmentsContent />
    </Suspense>
  );
}
