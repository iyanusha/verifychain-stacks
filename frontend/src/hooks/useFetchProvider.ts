'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ProviderInfo } from '@/components/ProviderCard';

interface ProviderStakes {
  totalStaked: number;
  activeStake: number;
  pendingWithdrawal: number;
}

interface UseFetchProviderResult {
  provider: ProviderInfo | null;
  stakes: ProviderStakes | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const STACKS_API = 'https://api.testnet.hiro.so';
const REGISTRY_CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const REGISTRY_CONTRACT_NAME = 'registry';

async function fetchProvider(providerId: number): Promise<ProviderInfo> {
  const url = `${STACKS_API}/v2/contracts/call-read/${REGISTRY_CONTRACT_ADDRESS}/${REGISTRY_CONTRACT_NAME}/get-provider`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: REGISTRY_CONTRACT_ADDRESS,
        arguments: [`0x${providerId.toString(16).padStart(8, '0')}`],
      }),
    });
    if (res.ok) {
      // In production parse the Clarity response
      void await res.json();
    }
  } catch {
    // fall through to mock
  }

  // Mock data until full indexer integration
  return {
    id: providerId,
    storageCapacityGb: 512 + providerId * 128,
    active: providerId % 5 !== 0,
    stakedAmount: (50 + providerId * 10) * 1_000_000,
    registrationBlock: 140000 + providerId * 500,
  };
}

async function fetchStakes(providerId: number): Promise<ProviderStakes> {
  const url = `${STACKS_API}/v2/contracts/call-read/${REGISTRY_CONTRACT_ADDRESS}/${REGISTRY_CONTRACT_NAME}/get-provider-stakes`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: REGISTRY_CONTRACT_ADDRESS,
        arguments: [`0x${providerId.toString(16).padStart(8, '0')}`],
      }),
    });
    if (res.ok) {
      void await res.json();
    }
  } catch {
    // fall through to mock
  }

  const base = (50 + providerId * 10) * 1_000_000;
  return {
    totalStaked: base,
    activeStake: Math.floor(base * 0.85),
    pendingWithdrawal: Math.floor(base * 0.15),
  };
}

export function useFetchProvider(providerId: number): UseFetchProviderResult {
  const [provider, setProvider] = useState<ProviderInfo | null>(null);
  const [stakes, setStakes] = useState<ProviderStakes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!providerId) return;
    setLoading(true);
    setError(null);
    try {
      const [p, s] = await Promise.all([fetchProvider(providerId), fetchStakes(providerId)]);
      setProvider(p);
      setStakes(s);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch provider');
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => { load(); }, [load]);

  return { provider, stakes, loading, error, refetch: load };
}
