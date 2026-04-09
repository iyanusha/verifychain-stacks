'use client';

import { useRouter } from 'next/navigation';
import type { CommitmentSummary, CommitmentStatus } from '@/types/commitment';
import { formatStorageSize } from '@/lib/commitmentUtils';
import CommitmentProgressBar from './CommitmentProgressBar';

interface CommitmentCardProps {
  summary: CommitmentSummary;
  connectedAddress?: string;
  onComplete?: (id: number) => void;
}

const STATUS_BADGE: Record<CommitmentStatus, { label: string; bg: string; text: string }> = {
  active: { label: 'Active', bg: 'bg-green-100', text: 'text-green-700' },
  'expiring-soon': { label: 'Expiring Soon', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  expired: { label: 'Expired', bg: 'bg-gray-100', text: 'text-gray-500' },
  completed: { label: 'Completed', bg: 'bg-blue-100', text: 'text-blue-700' },
};

function truncateHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
}

export default function CommitmentCard({ summary, connectedAddress, onComplete }: CommitmentCardProps) {
  const router = useRouter();
  const { commitment, status, blocksRemaining, percentComplete } = summary;
  const badge = STATUS_BADGE[status];
  const isOwner = connectedAddress?.toLowerCase() === commitment.dataOwner.toLowerCase();
  const stakeInStx = (commitment.stakeRequired / 1_000_000).toFixed(6);

  return (
    <div className="commitment-card bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/commitments/${commitment.id}`)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">Commitment #{commitment.id}</p>
          <p className="text-xs text-gray-400 font-mono mt-0.5">{truncateHash(commitment.dataRoot)}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <p className="text-xs text-gray-500">Storage</p>
          <p className="font-semibold text-gray-800">{formatStorageSize(commitment.storageSizeMb)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Chunks</p>
          <p className="font-semibold text-gray-800">{commitment.chunkCount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Blocks Left</p>
          <p className="font-semibold text-gray-800">{blocksRemaining.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Stake Locked</p>
          <p className="font-semibold text-gray-800" title={`${commitment.stakeRequired} microSTX`}>
            {stakeInStx} STX
          </p>
          <p className="text-xs text-gray-400">{commitment.stakeRequired.toLocaleString()} µSTX</p>
        </div>
      </div>

      <CommitmentProgressBar percentComplete={percentComplete} status={status} />

      <div className="mt-3 flex items-center gap-2">
        {isOwner && (status === 'completed' || status === 'expired') && onComplete && (
          <button
            onClick={(e) => { e.stopPropagation(); onComplete(commitment.id); }}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            title="Call complete-commitment on the registry contract to release stake"
          >
            Complete Commitment
          </button>
        )}
        {status === 'active' && (
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/commitments/${commitment.id}`); }}
            className="rounded-lg border border-primary-300 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100"
            title="Open Merkle proof verifier for this commitment"
          >
            View Proof
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/commitments/${commitment.id}`); }}
          className="ml-auto text-xs text-gray-400 hover:text-gray-600"
          title="Open commitment detail page"
        >
          Details →
        </button>
      </div>
    </div>
  );
}
