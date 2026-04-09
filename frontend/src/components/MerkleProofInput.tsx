'use client';

const HEX64_PATTERN = /^[0-9a-fA-F]{64}$/;

interface MerkleProofInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

interface LineValidation {
  hash: string;
  valid: boolean;
}

export default function MerkleProofInput({ value, onChange, disabled = false }: MerkleProofInputProps) {
  const lines: LineValidation[] = value
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((l) => ({
      hash: l.trim(),
      valid: HEX64_PATTERN.test(l.trim()),
    }));

  const validCount = lines.filter((l) => l.valid).length;
  const invalidCount = lines.length - validCount;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-700">
          Merkle Proof <span className="text-gray-400">(one hash per line)</span>
        </label>
        {lines.length > 0 && (
          <span className="text-xs">
            <span className="text-green-600">{validCount} valid</span>
            {invalidCount > 0 && (
              <span className="text-red-500 ml-2">{invalidCount} invalid</span>
            )}
          </span>
        )}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={6}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary-200 resize-y disabled:opacity-50"
        placeholder={`a1b2c3...d4e5f6\n0f1e2d...3c4b5a\n(paste proof hashes here)`}
      />

      {lines.length > 0 && (
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <span className={line.valid ? 'text-green-500' : 'text-red-500'}>
                {line.valid ? '✓' : '✗'}
              </span>
              <span className="font-mono text-gray-500 truncate">
                {line.hash.slice(0, 16)}…{line.hash.slice(-8)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
