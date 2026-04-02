'use client';

import { useState } from 'react';
import { useFetchChallenges } from '@/hooks/useFetchChallenges';
import ChallengeCard from '@/components/ChallengeCard';
import type { ChallengeStatus } from '@/types/challenge';

const ACTIVE_STATUSES: ChallengeStatus[] = ['pending', 'responded'];
const RESOLVED_STATUSES: ChallengeStatus[] = ['validated', 'slashed', 'expired'];

export default function ChallengesPage() {
  const { challenges, loading, error, filterByStatus } = useFetchChallenges();
  const [tab, setTab] = useState<'active' | 'resolved'>('active');

  const activeChallenges = challenges.filter((c) => ACTIVE_STATUSES.includes(c.status));
  const resolvedChallenges = challenges.filter((c) => RESOLVED_STATUSES.includes(c.status));

  const displayed = tab === 'active' ? activeChallenges : resolvedChallenges;

  const slashedList = filterByStatus('slashed');
  const totalSlash = slashedList.reduce((sum, c) => sum + (c.slashAmount ?? 0), 0);
  const totalResolved = resolvedChallenges.length;
  const responseRate =
    challenges.length > 0
      ? Math.round((challenges.filter((c) => c.responseHash).length / challenges.length) * 100)
      : 0;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Challenges</h1>
        <p className="text-sm text-gray-500 mt-1">Storage challenge submissions and their outcomes.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{activeChallenges.length}</p>
          <p className="text-xs text-gray-500 mt-1">Open Challenges</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{(totalSlash / 1_000_000).toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Slashed (STX)</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{responseRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Response Rate</p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-gray-200">
        {(['active', 'resolved'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t} ({t === 'active' ? activeChallenges.length : resolvedChallenges.length})
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="animate-pulse h-32 rounded-xl bg-gray-100" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {!loading && displayed.length === 0 && (
        <p className="text-sm text-gray-400 py-8 text-center">No {tab} challenges.</p>
      )}

      <div className="space-y-3">
        {displayed.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </main>
  );
}
