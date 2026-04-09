'use client';

import { useState, useRef, useEffect } from 'react';
import type { ReputationData, ReputationScore as ReputationScoreType } from '@/types/reputation';
import { getSuccessRate, formatScore } from '@/lib/reputationUtils';

interface ReputationScoreProps {
  score: ReputationScoreType;
  reputation: ReputationData;
}

const TIER_BG: Record<string, string> = {
  unverified: 'bg-gray-100 text-gray-600',
  bronze: 'bg-amber-100 text-amber-800',
  silver: 'bg-gray-200 text-gray-700',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-indigo-100 text-indigo-800',
};

export default function ReputationScore({ score, reputation }: ReputationScoreProps) {
  const [showInfo, setShowInfo] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowInfo(false);
      }
    }
    if (showInfo) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showInfo]);

  const successRate = getSuccessRate(reputation);
  const tierBg = TIER_BG[score.tier] ?? TIER_BG.unverified;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tierBg}`}>
          <span>{score.label} Provider</span>
        </span>
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setShowInfo((v) => !v)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            aria-label="How is the score calculated?"
          >
            ℹ
          </button>
          {showInfo && (
            <div className="absolute right-0 top-8 z-20 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg text-xs text-gray-600">
              <p className="font-semibold mb-1 text-gray-800">Score formula</p>
              <p className="font-mono">score = (successes × 10) − (failures × 25) + (commitments × 2)</p>
              <p className="mt-2">Clamped to 0–1000. Tiers: Bronze (1–100), Silver (101–300), Gold (301–600), Platinum (601–1000).</p>
            </div>
          )}
        </div>
      </div>

      <div className={`text-3xl font-bold ${score.color}`}>{formatScore(score.raw)}</div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <span className="text-green-600 font-medium">{reputation.successCount}✓</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="text-red-500 font-medium">{reputation.failureCount}✗</span>
        </span>
        <span className="ml-auto font-medium text-gray-700">{successRate}% success</span>
      </div>
    </div>
  );
}
