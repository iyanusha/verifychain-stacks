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
          <p className="font-semibold text-gray-800">{stakeInStx} STX</p>
        </div>
      </div>

      <CommitmentProgressBar percentComplete={percentComplete} status={status} />

      {isOwner && (status === 'completed' || status === 'expired') && onComplete && (
        <button
          onClick={(e) => { e.stopPropagation(); onComplete(commitment.id); }}
          className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
        >
          Complete Commitment
        </button>
      )}

      {status === 'active' && (
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/commitments/${commitment.id}`); }}
          className="mt-3 text-xs text-primary-600 hover:underline"
          title="View Merkle proof for this commitment"
        >
          View Proof →
        </button>
      )}
    </div>
  );
}
