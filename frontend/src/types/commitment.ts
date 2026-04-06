export interface Commitment {
  id: number;
  providerId: number;
  dataRoot: string; // 32-byte hex
  chunkCount: number;
  storageSizeMb: number;
  durationBlocks: number;
  stakeRequired: number; // microSTX
  startBlock: number;
  endBlock: number;
  dataOwner: string;
  active: boolean;
}

export type CommitmentStatus = 'active' | 'expiring-soon' | 'expired' | 'completed';

export interface CommitmentSummary {
  commitment: Commitment;
  status: CommitmentStatus;
  blocksRemaining: number;
  percentComplete: number;
  estimatedEndDate: number; // ms timestamp
}
