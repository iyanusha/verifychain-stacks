export type ChallengeStatus = 'pending' | 'responded' | 'validated' | 'slashed' | 'expired';

export interface Challenge {
  id: string;
  commitmentId: number;
  challenger: string;
  providerId: number;
  challengeBlock: number;
  responseDeadlineBlock: number;
  status: ChallengeStatus;
  slashAmount?: number;
  responseHash?: string;
  createdAt: number; // ms timestamp
}

export interface ChallengeResponse {
  challengeId: string;
  responseHash: string;
  merkleProof: string[];
  respondedAt: number; // ms timestamp
  txHash: string;
}

export interface SlashEvent {
  challengeId: string;
  providerId: number;
  slashAmount: number; // microSTX
  reason: 'failed-challenge' | 'late-response';
  block: number;
  timestamp: number;
}
