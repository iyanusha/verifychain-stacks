'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CommitmentSummary } from '@/types/commitment';
import { buildCommitmentSummary } from '@/lib/commitmentUtils';

const CURRENT_BLOCK = 145100;

// Mock commitment data — replace with contract indexer integration
function generateMockCommitments(count: number, filterProviderId?: number, filterOwner?: string) {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const providerId = (id % 5) + 1;
    const dataOwner = id % 3 === 0
      ? 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC'
      : 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
    return {
      id,
      providerId,
      dataRoot: Array.from({ length: 64 }, (_, j) => ((id * 7 + j) % 16).toString(16)).join(''),
      chunkCount: 8 + id * 4,
      storageSizeMb: 256 * (1 + (id % 4)),
      durationBlocks: 2016 + id * 100,
      stakeRequired: (id + 1) * 5_000_000,
      startBlock: 143000 + id * 200,
      endBlock: 145016 + id * 300,
      dataOwner,
      active: id % 7 !== 0,
    };
  })
    .filter((c) => filterProviderId === undefined || c.providerId === filterProviderId)
    .filter((c) => filterOwner === undefined || c.dataOwner.toLowerCase() === filterOwner.toLowerCase());
}

interface UseFetchCommitmentsResult {
  commitments: CommitmentSummary[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseFetchCommitmentsOptions {
  providerId?: number;
  dataOwner?: string;
}

export function useFetchCommitments({ providerId, dataOwner }: UseFetchCommitmentsOptions = {}): UseFetchCommitmentsResult {
  const [commitments, setCommitments] = useState<CommitmentSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: replace with paginated contract event indexer call
      await new Promise((r) => setTimeout(r, 80));
      const raw = generateMockCommitments(5, providerId, dataOwner);
      setCommitments(raw.map((c) => buildCommitmentSummary(c, CURRENT_BLOCK)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch commitments');
    } finally {
      setLoading(false);
    }
  }, [providerId, dataOwner]);

  useEffect(() => { load(); }, [load]);

  return { commitments, loading, error, refetch: load };
}
