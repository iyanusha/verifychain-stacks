'use client';

import { useState } from 'react';
import { verifyMerklePath } from '@/lib/challengeUtils';
import { buildMerkleTree, getProofForIndex, bytesToHex } from '@/lib/merkleUtils';

interface VerificationStep {
  level: number;
  left: string;
  right: string;
  result: string;
}

interface MerkleVerifierProps {
  dataRoot: string;
  chunkCount: number;
}

export default function MerkleVerifier({ dataRoot, chunkCount }: MerkleVerifierProps) {
  const [chunkIndex, setChunkIndex] = useState(0);
  const [chunkHash, setChunkHash] = useState('');
  const [proofText, setProofText] = useState('');
  const [steps, setSteps] = useState<VerificationStep[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [generatingProof, setGeneratingProof] = useState(false);

  const handleGenerateTestProof = async () => {
    if (!chunkHash) return;
    setGeneratingProof(true);
    try {
      // Build a test tree from the provided chunkHash as a leaf, padded to chunkCount leaves
      const leaves: string[] = Array.from({ length: Math.max(2, chunkCount) }, (_, i) =>
        i === chunkIndex ? chunkHash : bytesToHex(new Uint8Array(32).fill(i))
      );
      const tree = await buildMerkleTree(leaves);
      const proof = getProofForIndex(tree, chunkIndex);
      setProofText(proof.join('\n'));
    } catch {
      // ignore
    } finally {
      setGeneratingProof(false);
    }
  };

  const proof = proofText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const handlePasteProof = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setProofText(text);
    } catch {
      // clipboard not available
    }
  };

  const handleVerify = async () => {
    if (!chunkHash || proof.length === 0) return;
    setVerifying(true);
    setSteps([]);
    setResult(null);

    try {
      // Run the path verification and collect steps
      const collectedSteps: VerificationStep[] = [];
      let current = chunkHash.toLowerCase();
      let idx = chunkIndex;

      for (let level = 0; level < proof.length; level++) {
        const sibling = proof[level].toLowerCase();
        const isLeft = idx % 2 === 0;
        const left = isLeft ? current : sibling;
        const right = isLeft ? sibling : current;

        // Hash the concatenated pair
        const combined = new Uint8Array(64);
        for (let i = 0; i < 32; i++) {
          combined[i] = parseInt(left.slice(i * 2, i * 2 + 2), 16);
          combined[i + 32] = parseInt(right.slice(i * 2, i * 2 + 2), 16);
        }
        const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
        const hashHex = Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

        collectedSteps.push({ level, left, right, result: hashHex });
        current = hashHex;
        idx = Math.floor(idx / 2);
      }

      setSteps(collectedSteps);
      const valid = await verifyMerklePath(chunkHash, proof, dataRoot, chunkIndex);
      setResult(valid);
    } catch {
      setResult(false);
    } finally {
      setVerifying(false);
    }
  };

  const toggleStep = (level: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Merkle Proof Verifier</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Chunk Index (0–{Math.max(0, chunkCount - 1)})
          </label>
          <input
            type="number"
            min={0}
            max={chunkCount - 1}
            value={chunkIndex}
            onChange={(e) => setChunkIndex(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Chunk Hash (64 hex)</label>
          <input
            type="text"
            value={chunkHash}
            onChange={(e) => setChunkHash(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="a1b2c3...d4e5f6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-gray-700">Proof (one hash per line)</label>
          <div className="flex gap-2">
            <button onClick={handlePasteProof} className="text-xs text-blue-600 hover:underline">
              Paste from clipboard
            </button>
            <button
              onClick={handleGenerateTestProof}
              disabled={!chunkHash || generatingProof}
              className="text-xs text-gray-500 hover:underline disabled:opacity-50"
            >
              {generatingProof ? 'Generating...' : 'Generate test proof'}
            </button>
          </div>
        </div>
        <textarea
          value={proofText}
          onChange={(e) => setProofText(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary-200 resize-y"
          placeholder="sibling hash per line..."
        />
      </div>

      <button
        onClick={handleVerify}
        disabled={verifying || !chunkHash || proof.length === 0}
        className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-primary-700 transition-colors"
      >
        {verifying ? 'Verifying...' : 'Verify Proof'}
      </button>

      {result !== null && (
        <div className={`rounded-lg p-3 text-sm font-medium ${result ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {result ? '✓ Proof valid — chunk is included in the Merkle tree' : '✗ Proof invalid — hash mismatch at root'}
        </div>
      )}

      {steps.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700">Verification Path</p>
          {steps.map((step) => (
            <div key={step.level} className="merkle-step">
              <button
                onClick={() => toggleStep(step.level)}
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900"
              >
                <span>{expandedSteps.has(step.level) ? '▼' : '▶'}</span>
                <span>Level {step.level} → <span className="font-mono">{step.result.slice(0, 12)}…</span></span>
              </button>
              {expandedSteps.has(step.level) && (
                <div className="mt-2 space-y-1 text-xs font-mono text-gray-500">
                  <p>L: {step.left}</p>
                  <p>R: {step.right}</p>
                  <p className="text-gray-800">→ {step.result}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
