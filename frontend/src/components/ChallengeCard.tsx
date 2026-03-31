'use client';

import { useState } from 'react';
import type { Challenge } from '@/types/challenge';
import {
  getBlocksUntilDeadline,
  formatDeadline,
  getChallengeStatusColor,
  getResponseWindowProgress,
} from '@/lib/challengeUtils';
import ChallengeStatusBadge from './ChallengeStatusBadge';

const CURRENT_BLOCK = 144900; // TODO: replace with live block from Stacks API

interface ChallengeCardProps {
  challenge: Challenge;
  onRespond?: (id: string) => void;
}

function truncate(str: string, start = 6, end = 4): string {
  return `${str.slice(0, start)}...${str.slice(-end)}`;
}

export default function ChallengeCard({ challenge, onRespond }: ChallengeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const blocksLeft = getBlocksUntilDeadline(challenge, CURRENT_BLOCK);
  const progress = getResponseWindowProgress(challenge, CURRENT_BLOCK);

  const actionButton = () => {
    if (challenge.status === 'pending') {
      return (
        <button
          onClick={() => onRespond?.(challenge.id)}
          className="rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-yellow-600"
        >
          Respond
        </button>
      );
    }
    if (challenge.status === 'responded') {
      return (
        <button className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700">
          View Response
        </button>
      );
    }
    return (
      <span className="text-xs text-gray-400">
        {challenge.status === 'expired' ? 'Expired' : challenge.status}
      </span>
    );
  };

  return (
    <div className="challenge-card rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ChallengeStatusBadge status={challenge.status} />
            <button
              onClick={() => {
                navigator.clipboard.writeText(challenge.id);
              }}
              className="text-xs text-gray-400 hover:text-gray-600"
              title="Copy challenge ID"
            >
              {truncate(challenge.id, 8, 4)} ⧉
            </button>
          </div>
          <p className="text-xs text-gray-500">Commitment #{challenge.commitmentId}</p>
          <p className="text-xs text-gray-400">Challenger: {truncate(challenge.challenger)}</p>
        </div>
        {actionButton()}
      </div>

      {challenge.status === 'pending' && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Response window</span>
            <span className={getChallengeStatusColor(challenge.status)}>
              {formatDeadline(blocksLeft)} remaining
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full transition-all ${progress >= 80 ? 'bg-red-400' : 'bg-yellow-400'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 text-xs text-gray-400 hover:text-gray-600"
      >
        {expanded ? 'Hide details ▲' : 'Show details ▼'}
      </button>

      {expanded && (
        <div className="mt-3 space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-3">
          <p>Challenge block: #{challenge.challengeBlock}</p>
          <p>Deadline block: #{challenge.responseDeadlineBlock}</p>
          <p>Provider: #{challenge.providerId}</p>
          {challenge.slashAmount !== undefined && (
            <p className="text-red-600 font-medium">
              Slash: {(challenge.slashAmount / 1_000_000).toFixed(6)} STX
            </p>
          )}
        </div>
      )}
    </div>
  );
}
