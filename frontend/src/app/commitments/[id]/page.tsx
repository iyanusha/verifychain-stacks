'use client';

import { use, useState } from 'react';
import { useFetchCommitment } from '@/hooks/useFetchCommitment';
import { useCompleteCommitment } from '@/hooks/useCompleteCommitment';
import DataRootDisplay from '@/components/DataRootDisplay';
import MerkleVerifier from '@/components/MerkleVerifier';
import CommitmentProgressBar from '@/components/CommitmentProgressBar';
import { formatStorageSize, formatDuration } from '@/lib/commitmentUtils';

interface PageProps {
  params: Promise<{ id: string }>;
}

const CONNECTED_ADDRESS = ''; // wire to wallet context in production

export default function CommitmentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const commitmentId = parseInt(id, 10);
  const { commitment, summary, loading } = useFetchCommitment(commitmentId);
  const { completing, error: completeError, txId, completeCommitment } = useCompleteCommitment();
  const [showVerifier, setShowVerifier] = useState(false);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-56 rounded bg-gray-200" />
          <div className="h-32 rounded-xl bg-gray-100" />
        </div>
      </main>
    );
  }

  if (!commitment || !summary) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-gray-500">Commitment #{commitmentId} not found.</p>
      </main>
    );
  }

  const isOwner = CONNECTED_ADDRESS.toLowerCase() === commitment.dataOwner.toLowerCase();
  const canComplete = isOwner && (summary.status === 'completed' || summary.status === 'expired');

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commitment #{commitmentId}</h1>
          <p className="text-xs text-gray-400 mt-0.5">Provider #{commitment.providerId}</p>
        </div>
        {canComplete && (
          <button
            onClick={() => completeCommitment(commitmentId)}
            disabled={completing || !!txId}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-blue-700"
          >
            {completing ? 'Completing...' : 'Complete Commitment'}
          </button>
        )}
      </div>

      {txId && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-xs text-green-700">
          Transaction broadcast: <span className="font-mono">{txId}</span>
        </div>
      )}
      {completeError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">{completeError}</div>
      )}

      <CommitmentProgressBar percentComplete={summary.percentComplete} status={summary.status} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Storage', value: formatStorageSize(commitment.storageSizeMb) },
          { label: 'Chunks', value: commitment.chunkCount.toString() },
          { label: 'Duration', value: formatDuration(commitment.durationBlocks) },
          { label: 'Stake Required', value: `${(commitment.stakeRequired / 1_000_000).toFixed(6)} STX` },
          { label: 'Start Block', value: `#${commitment.startBlock}` },
          { label: 'End Block', value: `#${commitment.endBlock}` },
          { label: 'Blocks Remaining', value: summary.blocksRemaining.toLocaleString() },
          { label: 'Data Owner', value: `${commitment.dataOwner.slice(0, 8)}…` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-semibold text-gray-800 text-sm mt-1 truncate" title={value}>{value}</p>
          </div>
        ))}
      </div>

      <DataRootDisplay
        dataRoot={commitment.dataRoot}
        onVerify={() => setShowVerifier((v) => !v)}
      />

      {showVerifier && (
        <MerkleVerifier dataRoot={commitment.dataRoot} chunkCount={commitment.chunkCount} />
      )}
    </main>
  );
}
