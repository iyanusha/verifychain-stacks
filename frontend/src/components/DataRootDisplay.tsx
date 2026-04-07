'use client';

import { useState } from 'react';

interface DataRootDisplayProps {
  dataRoot: string; // 32-byte hex (64 chars)
  onVerify?: () => void;
}

export default function DataRootDisplay({ dataRoot, onVerify }: DataRootDisplayProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayHash = expanded
    ? dataRoot
    : `${dataRoot.slice(0, 16)}…${dataRoot.slice(-8)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dataRoot);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-700">Data Root (Merkle Root)</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-blue-600 hover:underline"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? '✓ Copied' : '⧉ Copy'}
          </button>
        </div>
      </div>

      <div className="data-root-display">
        {displayHash}
      </div>

      {onVerify && (
        <button
          onClick={onVerify}
          className="w-full rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Verify Chunk Inclusion Proof
        </button>
      )}
    </div>
  );
}
