'use client';

import { useRouter } from 'next/navigation';
import type { ReputationScore } from '@/types/reputation';
import ReputationBadge from './ReputationBadge';

export interface ProviderInfo {
  id: number;
  storageCapacityGb: number;
  active: boolean;
  stakedAmount: number; // in microSTX
  registrationBlock: number;
}

interface ProviderCardProps {
  provider: ProviderInfo;
  score: ReputationScore;
  clickable?: boolean;
}

function microStxToStx(micro: number): string {
  return (micro / 1_000_000).toFixed(2);
}

export default function ProviderCard({ provider, score, clickable = true }: ProviderCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (clickable) router.push(`/providers/${provider.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 ${
        clickable
          ? 'cursor-pointer hover:shadow-lg hover:border-primary-300 hover:-translate-y-0.5'
          : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <ReputationBadge tier={score.tier} size="md" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Provider #{provider.id}</p>
            <p className="text-xs text-gray-400">
              Registered block #{provider.registrationBlock}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`inline-block h-2 w-2 rounded-full ${provider.active ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className={`text-xs font-medium ${provider.active ? 'text-green-600' : 'text-gray-400'}`}>
            {provider.active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500 mb-0.5">Storage</p>
          <p className="font-semibold text-gray-800">{provider.storageCapacityGb} GB</p>
        </div>
        <div className="rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500 mb-0.5">Staked</p>
          <p className="font-semibold text-gray-800">{microStxToStx(provider.stakedAmount)} STX</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs font-medium ${score.color}`}>{score.label} · {score.raw} pts</span>
        {clickable && <span className="text-xs text-gray-400">View →</span>}
      </div>
    </div>
  );
}
