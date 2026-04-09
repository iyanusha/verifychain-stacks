'use client';

import { use } from 'react';
import { useFetchChallenges } from '@/hooks/useFetchChallenges';
import { useRespondToChallenge } from '@/hooks/useRespondToChallenge';
import ChallengeTimeline from '@/components/ChallengeTimeline';
import ChallengeStatusBadge from '@/components/ChallengeStatusBadge';
import ChallengeResponseForm from '@/components/ChallengeResponseForm';
import { formatDeadline, getBlocksUntilDeadline } from '@/lib/challengeUtils';

const CURRENT_BLOCK = 144900;
const CONNECTED_ADDRESS = ''; // hook into wallet context in production

interface PageProps {
  params: Promise<{ id: string }>;
}

function truncate(str: string) {
  return `${str.slice(0, 8)}...${str.slice(-6)}`;
}

export default function ChallengeDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { challenges, loading } = useFetchChallenges();
  const { responding, error: respondError, txId, respond } = useRespondToChallenge();

  const challenge = challenges.find((c) => c.id === id);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-56 rounded bg-gray-200" />
          <div className="h-24 rounded-xl bg-gray-100" />
        </div>
      </main>
    );
  }

  if (!challenge) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-gray-500">Challenge &quot;{id}&quot; not found.</p>
      </main>
    );
  }

  const blocksLeft = getBlocksUntilDeadline(challenge, CURRENT_BLOCK);
  const canRespond = challenge.status === 'pending' && blocksLeft > 0;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-mono">{challenge.id}</h1>
          <p className="text-sm text-gray-400 mt-0.5">Commitment #{challenge.commitmentId}</p>
        </div>
        <ChallengeStatusBadge status={challenge.status} />
      </div>

      <ChallengeTimeline status={challenge.status} />

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Challenger</p>
          <p className="font-mono text-sm mt-1">{truncate(challenge.challenger)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Provider</p>
          <p className="font-semibold text-sm mt-1">#{challenge.providerId}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Challenge Block</p>
          <p className="font-semibold text-sm mt-1">#{challenge.challengeBlock}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Deadline Block</p>
          <p className="font-semibold text-sm mt-1">
            #{challenge.responseDeadlineBlock}
            {challenge.status === 'pending' && (
              <span className="ml-1 text-xs text-yellow-600">({formatDeadline(blocksLeft)} left)</span>
            )}
          </p>
        </div>
      </div>

      {challenge.status === 'slashed' && challenge.slashAmount !== undefined && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">Slash Executed</p>
          <p className="text-sm text-red-600 mt-1">
            {(challenge.slashAmount / 1_000_000).toFixed(6)} STX slashed due to failed challenge response.
          </p>
        </div>
      )}

      {challenge.responseHash && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">Response Submitted</p>
          <p className="font-mono text-xs text-green-800 mt-1 break-all">{challenge.responseHash}</p>
        </div>
      )}

      {canRespond && (
        <ChallengeResponseForm
          challengeId={challenge.id}
          onSubmit={(hash, proof) => respond(challenge.id, hash, proof)}
          responding={responding}
          error={respondError}
          txId={txId}
        />
      )}
    </main>
  );
}
