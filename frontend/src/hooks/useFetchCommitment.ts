'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Commitment, CommitmentSummary } from '@/types/commitment';
import { buildCommitmentSummary } from '@/lib/commitmentUtils';

const STACKS_API = 'https://api.testnet.hiro.so';
const REGISTRY_CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const REGISTRY_CONTRACT_NAME = 'registry';
const CURRENT_BLOCK = 145100; // TODO: fetch from chain-info endpoint

function mockCommitment(id: number): Commitment {
  return {
    id,
    providerId: (id % 5) + 1,
    dataRoot: '0'.repeat(64 - id.toString(16).length) + id.toString(16).padStart(2, '0').repeat(32).slice(0, 64),
    chunkCount: 8 + id * 4,
    storageSizeMb: 256 * (1 + (id % 4)),
    durationBlocks: 2016 + id * 100,
    stakeRequired: (id + 1) * 5_000_000,
    startBlock: 143000 + id * 200,
    endBlock: 145016 + id * 300,
    dataOwner: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    active: id % 7 !== 0,
  };
}

async function fetchCommitmentFromContract(commitmentId: number): Promise<Commitment> {
  const url = `${STACKS_API}/v2/contracts/call-read/${REGISTRY_CONTRACT_ADDRESS}/${REGISTRY_CONTRACT_NAME}/get-commitment`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: REGISTRY_CONTRACT_ADDRESS,
        arguments: [`0x${commitmentId.toString(16).padStart(8, '0')}`],
      }),
    });
    if (res.ok) {
      void await res.json();
      // TODO: parse Clarity response
    }
  } catch {
    // fall through to mock
  }
  return mockCommitment(commitmentId);
}

interface UseFetchCommitmentResult {
  commitment: Commitment | null;
  summary: CommitmentSummary | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchCommitment(commitmentId: number): UseFetchCommitmentResult {
  const [commitment, setCommitment] = useState<Commitment | null>(null);
  const [summary, setSummary] = useState<CommitmentSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!commitmentId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCommitmentFromContract(commitmentId);
      setCommitment(data);
      setSummary(buildCommitmentSummary(data, CURRENT_BLOCK));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch commitment');
    } finally {
      setLoading(false);
    }
  }, [commitmentId]);

  useEffect(() => { load(); }, [load]);

  return { commitment, summary, loading, error, refetch: load };
}
