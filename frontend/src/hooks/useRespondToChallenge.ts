'use client';

import { useState, useCallback } from 'react';

interface UseRespondToChallengeResult {
  responding: boolean;
  error: string | null;
  txId: string | null;
  respond: (challengeId: string, responseHash: string, merkleProof: string[]) => Promise<void>;
}

export function useRespondToChallenge(): UseRespondToChallengeResult {
  const [responding, setResponding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  const respond = useCallback(
    async (challengeId: string, responseHash: string, merkleProof: string[]) => {
      setResponding(true);
      setError(null);
      setTxId(null);

      try {
        const { openContractCall } = await import('@stacks/connect');

        const contractCallOptions = {
          contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
          contractName: 'registry',
          functionName: 'respond-to-challenge',
          functionArgs: [
            // challenge-id (uint)
            { type: 'uint', value: challengeId.replace('ch-', '') },
            // response-hash (buff 32)
            { type: 'buff', value: responseHash },
            // merkle-proof (list of buff 32)
            {
              type: 'list',
              value: merkleProof.map((p) => ({ type: 'buff', value: p })),
            },
          ],
          onFinish: (result: { txId: string }) => {
            setTxId(result.txId);
            setResponding(false);
          },
          onCancel: () => {
            setError('Transaction cancelled.');
            setResponding(false);
          },
        };

        await openContractCall(contractCallOptions as Parameters<typeof openContractCall>[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit response');
        setResponding(false);
      }
    },
    []
  );

  return { responding, error, txId, respond };
}
