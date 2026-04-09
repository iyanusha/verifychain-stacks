'use client';

import { useState, useCallback } from 'react';

interface UseCompleteCommitmentResult {
  completing: boolean;
  error: string | null;
  txId: string | null;
  completeCommitment: (commitmentId: number) => Promise<void>;
}

export function useCompleteCommitment(): UseCompleteCommitmentResult {
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  const completeCommitment = useCallback(async (commitmentId: number) => {
    setCompleting(true);
    setError(null);
    setTxId(null);

    try {
      const { openContractCall } = await import('@stacks/connect');

      await openContractCall({
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'registry',
        functionName: 'complete-commitment',
        functionArgs: [
          {
            type: 'uint',
            value: commitmentId.toString(),
          },
        ],
        onFinish: (result: { txId: string }) => {
          setTxId(result.txId);
          setCompleting(false);
        },
        onCancel: () => {
          setError('Transaction cancelled by user.');
          setCompleting(false);
        },
      } as Parameters<typeof openContractCall>[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete commitment');
      setCompleting(false);
    }
  }, []);

  return { completing, error, txId, completeCommitment };
}
