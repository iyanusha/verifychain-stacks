'use client';

import { useState } from 'react';
import ReputationBadge from './ReputationBadge';
import type { ReputationScore, ReputationTier } from '@/types/reputation';
import { getSuccessRate } from '@/lib/reputationUtils';

interface LeaderboardEntry {
  rank: number;
  providerId: number;
  address: string;
  score: ReputationScore;
  successRate: number;
  totalCommitments: number;
}

// Mock data — clearly labeled; replace with contract indexer data
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    providerId: 7,
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    score: { raw: 820, tier: 'platinum', label: 'Platinum', color: 'text-indigo-500' },
    successRate: 97,
    totalCommitments: 41,
  },
  {
    rank: 2,
    providerId: 3,
    address: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    score: { raw: 590, tier: 'gold', label: 'Gold', color: 'text-yellow-500' },
    successRate: 91,
    totalCommitments: 29,
  },
  {
    rank: 3,
    providerId: 12,
    address: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC',
    score: { raw: 380, tier: 'gold', label: 'Gold', color: 'text-yellow-500' },
    successRate: 88,
    totalCommitments: 19,
  },
  {
    rank: 4,
    providerId: 5,
    address: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND',
    score: { raw: 210, tier: 'silver', label: 'Silver', color: 'text-gray-400' },
    successRate: 82,
    totalCommitments: 12,
  },
  {
    rank: 5,
    providerId: 1,
    address: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB',
    score: { raw: 85, tier: 'bronze', label: 'Bronze', color: 'text-amber-700' },
    successRate: 75,
    totalCommitments: 7,
  },
];

function truncateAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function ReputationLeaderboard() {
  const [sortDesc, setSortDesc] = useState(true);

  const sorted = [...MOCK_LEADERBOARD].sort((a, b) =>
    sortDesc ? b.score.raw - a.score.raw : a.score.raw - b.score.raw
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Provider Leaderboard</h2>
        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Mock data</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 border-b border-gray-100">
            <th className="px-5 py-3 text-left">#</th>
            <th className="px-5 py-3 text-left">Provider</th>
            <th className="px-5 py-3 text-left">Tier</th>
            <th
              className="px-5 py-3 text-right cursor-pointer hover:text-gray-900 select-none"
              onClick={() => setSortDesc((v) => !v)}
            >
              Score {sortDesc ? '↓' : '↑'}
            </th>
            <th className="px-5 py-3 text-right">Success Rate</th>
            <th className="px-5 py-3 text-right">Commitments</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => (
            <tr key={entry.providerId} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="px-5 py-3 font-medium text-gray-500">#{entry.rank}</td>
              <td className="px-5 py-3">
                <div>
                  <p className="font-medium text-gray-800">Provider #{entry.providerId}</p>
                  <p className="text-xs text-gray-400 font-mono">{truncateAddress(entry.address)}</p>
                </div>
              </td>
              <td className="px-5 py-3">
                <ReputationBadge tier={entry.score.tier as ReputationTier} size="sm" showLabel />
              </td>
              <td className={`px-5 py-3 text-right font-bold ${entry.score.color}`}>
                {entry.score.raw}
              </td>
              <td className="px-5 py-3 text-right text-gray-600">{entry.successRate}%</td>
              <td className="px-5 py-3 text-right text-gray-600">{entry.totalCommitments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
