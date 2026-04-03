'use client';

import { useState, useEffect } from 'react';
import MerkleProofInput from './MerkleProofInput';
import { validateMerkleProof } from '@/lib/challengeUtils';

interface ChallengeResponseFormProps {
  challengeId: string;
  onSubmit: (responseHash: string, merkleProof: string[]) => Promise<void>;
  responding?: boolean;
  error?: string | null;
  txId?: string | null;
}

const HEX64_PATTERN = /^[0-9a-fA-F]{64}$/;
const DRAFT_KEY = (id: string) => `challenge_draft_${id}`;

export default function ChallengeResponseForm({
  challengeId,
  onSubmit,
  responding = false,
  error = null,
  txId = null,
}: ChallengeResponseFormProps) {
  const [responseHash, setResponseHash] = useState('');
  const [proofLines, setProofLines] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY(challengeId));
    if (saved) {
      try {
        const { hash, proof } = JSON.parse(saved);
        setResponseHash(hash ?? '');
        setProofLines(proof ?? '');
        setDraftRestored(true);
        setTimeout(() => setDraftRestored(false), 3000);
      } catch {
        // ignore
      }
    }
  }, [challengeId]);

  useEffect(() => {
    if (responseHash || proofLines) {
      const savedAt = new Date().toLocaleTimeString();
      localStorage.setItem(DRAFT_KEY(challengeId), JSON.stringify({ hash: responseHash, proof: proofLines, savedAt }));
      setDraftSavedAt(savedAt);
    }
  }, [challengeId, responseHash, proofLines]);

  useEffect(() => {
    if (txId) {
      setSuccessToast(true);
      localStorage.removeItem(DRAFT_KEY(challengeId));
    }
  }, [txId, challengeId]);

  const merkleProof = proofLines
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const { valid: proofValid, errors: proofErrors } = validateMerkleProof(merkleProof);
  const hashValid = HEX64_PATTERN.test(responseHash);
  const canSubmit = hashValid && proofValid && !responding && !txId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit(responseHash, merkleProof);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Submit Challenge Response</h3>
        {draftRestored && (
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Draft restored</span>
        )}
        {draftSavedAt && !draftRestored && (
          <span className="text-xs text-gray-400">Draft saved {draftSavedAt}</span>
        )}
        {successToast && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Response submitted!</span>
        )}
      </div>

      {txId && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-xs font-semibold text-green-700">Transaction pending confirmation...</p>
          </div>
          <p className="text-xs text-green-600 font-mono break-all">{txId}</p>
          <p className="text-xs text-green-500">Your response has been broadcast to the Stacks network. This may take a few minutes.</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
          <p className="font-medium mb-1">Submission failed</p>
          <p>{error}</p>
          <button onClick={() => {}} className="mt-2 underline">Retry</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Response Hash <span className="text-gray-400">(64 hex characters)</span>
          </label>
          <input
            type="text"
            value={responseHash}
            onChange={(e) => setResponseHash(e.target.value)}
            disabled={!!txId}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 ${
              responseHash && !hashValid
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-primary-200'
            }`}
            placeholder="0000000000000000000000000000000000000000000000000000000000000000"
          />
          {responseHash && !hashValid && (
            <p className="text-xs text-red-500 mt-1">Must be exactly 64 hex characters</p>
          )}
        </div>

        <MerkleProofInput value={proofLines} onChange={setProofLines} disabled={!!txId} />

        <button
          onClick={() => setShowHelp((v) => !v)}
          type="button"
          className="text-xs text-blue-600 hover:underline"
        >
          {showHelp ? '▲ Hide' : '▼ What is a Merkle proof?'}
        </button>

        {showHelp && (
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-800 space-y-1">
            <p className="font-semibold">What is a Merkle proof?</p>
            <p>A Merkle proof is a list of sibling hashes that lets a verifier reconstruct the root of a Merkle tree from a single leaf hash.</p>
            <p>Each line should be a 64-character lowercase hex string (SHA-256 hash of the sibling node at that level).</p>
          </div>
        )}

        {proofErrors.length > 0 && (
          <ul className="text-xs text-red-500 list-disc pl-4 space-y-0.5">
            {proofErrors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
        >
          {responding ? 'Submitting...' : 'Submit Response'}
        </button>
      </form>
    </div>
  );
}
