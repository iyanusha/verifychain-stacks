import type { Commitment, CommitmentStatus, CommitmentSummary } from '@/types/commitment';

/** Blocks within this threshold are "expiring soon" (~24h) */
const EXPIRING_SOON_THRESHOLD = 144;

/** Average seconds per Stacks block */
const SECONDS_PER_BLOCK = 600;

export function getCommitmentStatus(commitment: Commitment, currentBlock: number): CommitmentStatus {
  if (!commitment.active) return 'completed';
  const remaining = commitment.endBlock - currentBlock;
  if (remaining <= 0) return 'expired';
  if (remaining <= EXPIRING_SOON_THRESHOLD) return 'expiring-soon';
  return 'active';
}

export function getBlocksRemaining(commitment: Commitment, currentBlock: number): number {
  return Math.max(0, commitment.endBlock - currentBlock);
}

export function getPercentComplete(commitment: Commitment, currentBlock: number): number {
  const elapsed = currentBlock - commitment.startBlock;
  const total = commitment.durationBlocks;
  if (total === 0) return 100;
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}

export function formatStorageSize(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb} MB`;
}

export function estimateCompletionDate(endBlock: number, currentBlock: number): number {
  const blocksLeft = Math.max(0, endBlock - currentBlock);
  return Date.now() + blocksLeft * SECONDS_PER_BLOCK * 1000;
}

export function formatDuration(blocks: number): string {
  const totalSeconds = blocks * SECONDS_PER_BLOCK;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  if (days > 0 && hours > 0) return `${days}d ${hours}h`;
  if (days > 0) return `${days} days`;
  if (hours > 0) return `${hours} hours`;
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes} minutes`;
}

export function calculateStakeRequirement(
  storageMb: number,
  durationBlocks: number,
  baseRate = 1000
): number {
  return storageMb * durationBlocks * baseRate;
}

export function buildCommitmentSummary(commitment: Commitment, currentBlock: number): CommitmentSummary {
  return {
    commitment,
    status: getCommitmentStatus(commitment, currentBlock),
    blocksRemaining: getBlocksRemaining(commitment, currentBlock),
    percentComplete: getPercentComplete(commitment, currentBlock),
    estimatedEndDate: estimateCompletionDate(commitment.endBlock, currentBlock),
  };
}
