'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Challenge, ChallengeStatus } from '@/types/challenge';

// Mock data — replace with contract event indexer integration
const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'ch-001',
    commitmentId: 3,
    challenger: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    providerId: 7,
    challengeBlock: 144800,
    responseDeadlineBlock: 144944,
    status: 'pending',
    createdAt: Date.now() - 1000 * 60 * 90,
  },
  {
    id: 'ch-002',
    commitmentId: 7,
    challenger: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
    providerId: 3,
    challengeBlock: 144600,
    responseDeadlineBlock: 144744,
    status: 'responded',
    responseHash: 'a1b2c3d4e5f6' + '0'.repeat(52),
    createdAt: Date.now() - 1000 * 60 * 180,
  },
  {
    id: 'ch-003',
    commitmentId: 1,
    challenger: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB',
    providerId: 5,
    challengeBlock: 144200,
    responseDeadlineBlock: 144344,
    status: 'slashed',
    slashAmount: 5_000_000,
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
];

interface ChallengeStats {
  total: number;
  pending: number;
  responded: number;
  validated: number;
  slashed: number;
  expired: number;
  totalSlashAmountMicroStx: number;
  responseRate: number;
}

interface UseFetchChallengesResult {
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getActiveChallengesForProvider: (providerId: number) => Challenge[];
  filterByStatus: (status: ChallengeStatus) => Challenge[];
  getStats: () => ChallengeStats;
}

export function useFetchChallenges(): UseFetchChallengesResult {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: replace with contract event indexer API call
      await new Promise((r) => setTimeout(r, 100));
      setChallenges(MOCK_CHALLENGES);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch challenges');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const getActiveChallengesForProvider = useCallback(
    (providerId: number) =>
      challenges.filter(
        (c) => c.providerId === providerId && (c.status === 'pending' || c.status === 'responded')
      ),
    [challenges]
  );

  const filterByStatus = useCallback(
    (status: ChallengeStatus) => challenges.filter((c) => c.status === status),
    [challenges]
  );

  const getStats = useCallback((): ChallengeStats => {
    const byStatus = (s: ChallengeStatus) => challenges.filter((c) => c.status === s).length;
    const responded = challenges.filter((c) => c.responseHash != null).length;
    const totalSlash = challenges.reduce((sum, c) => sum + (c.slashAmount ?? 0), 0);
    return {
      total: challenges.length,
      pending: byStatus('pending'),
      responded: byStatus('responded'),
      validated: byStatus('validated'),
      slashed: byStatus('slashed'),
      expired: byStatus('expired'),
      totalSlashAmountMicroStx: totalSlash,
      responseRate: challenges.length > 0 ? Math.round((responded / challenges.length) * 100) : 0,
    };
  }, [challenges]);

  return { challenges, loading, error, refetch: load, getActiveChallengesForProvider, filterByStatus, getStats };
}
