export type ReputationTier = 'unverified' | 'bronze' | 'silver' | 'gold' | 'platinum';

export interface ReputationData {
  successCount: number;
  failureCount: number;
  totalCommitments: number;
  lastActivityBlock: number;
}

export interface ReputationScore {
  raw: number;
  tier: ReputationTier;
  label: string;
  color: string;
}

export interface TierThreshold {
  tier: ReputationTier;
  min: number;
  max: number;
  label: string;
}

export const TIER_THRESHOLDS: TierThreshold[] = [
  { tier: 'unverified', min: 0, max: 0, label: 'Unverified' },
  { tier: 'bronze', min: 1, max: 100, label: 'Bronze' },
  { tier: 'silver', min: 101, max: 300, label: 'Silver' },
  { tier: 'gold', min: 301, max: 600, label: 'Gold' },
  { tier: 'platinum', min: 601, max: 1000, label: 'Platinum' },
];
