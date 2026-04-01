import type { Challenge, ChallengeStatus } from '@/types/challenge';

export const CHALLENGE_RESPONSE_BLOCKS = 144; // ~24 hours at 10 min/block

export function isResponseDeadlinePassed(challenge: Challenge, currentBlock: number): boolean {
  return currentBlock > challenge.responseDeadlineBlock;
}

export function getBlocksUntilDeadline(challenge: Challenge, currentBlock: number): number {
  return Math.max(0, challenge.responseDeadlineBlock - currentBlock);
}

export function formatDeadline(blocksRemaining: number): string {
  if (blocksRemaining === 0) return 'Deadline passed';
  const totalMinutes = blocksRemaining * 10;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} minutes`;
  if (minutes === 0) return `${hours} hours`;
  return `${hours} hours ${minutes} minutes`;
}

export function getChallengeStatusColor(status: ChallengeStatus): string {
  const colors: Record<ChallengeStatus, string> = {
    pending: 'text-yellow-600',
    responded: 'text-blue-600',
    validated: 'text-green-600',
    slashed: 'text-red-600',
    expired: 'text-gray-500',
  };
  return colors[status];
}

export function canRespond(
  challenge: Challenge,
  providerOwner: string,
  connectedAddress: string,
  currentBlock: number
): boolean {
  return (
    challenge.status === 'pending' &&
    providerOwner.toLowerCase() === connectedAddress.toLowerCase() &&
    !isResponseDeadlinePassed(challenge, currentBlock)
  );
}

export function getResponseWindowProgress(challenge: Challenge, currentBlock: number): number {
  const elapsed = currentBlock - challenge.challengeBlock;
  const total = CHALLENGE_RESPONSE_BLOCKS;
  return Math.min(100, Math.round((elapsed / total) * 100));
}

export function shouldAlert(challenge: Challenge, currentBlock: number): boolean {
  const progress = getResponseWindowProgress(challenge, currentBlock);
  return challenge.status === 'pending' && progress >= 80;
}

export function estimateSlashAmount(staked: number): number {
  return Math.floor(staked * 0.1);
}

export function validateMerkleProof(proof: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const hexPattern = /^[0-9a-fA-F]{64}$/;
  proof.forEach((hash, i) => {
    if (!hexPattern.test(hash)) {
      errors.push(`Line ${i + 1}: must be exactly 64 hex characters`);
    }
  });
  return { valid: errors.length === 0, errors };
}

export function hashToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

export function bufferToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** SHA-256 via WebCrypto — available in browser and Node 18+ */
export async function sha256Hex(data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(new Uint8Array(hashBuffer));
}

/** Verify a single Merkle path by walking proof hashes from leaf to root */
export async function verifyMerklePath(
  chunkHash: string,
  proof: string[],
  root: string,
  index: number
): Promise<boolean> {
  let current = chunkHash.toLowerCase();
  let idx = index;

  for (const sibling of proof) {
    const sib = sibling.toLowerCase();
    const isLeft = idx % 2 === 0;
    const left = isLeft ? current : sib;
    const right = isLeft ? sib : current;
    const combined = hashToBuffer(left + right);
    current = await sha256Hex(combined);
    idx = Math.floor(idx / 2);
  }

  return current === root.toLowerCase();
}
