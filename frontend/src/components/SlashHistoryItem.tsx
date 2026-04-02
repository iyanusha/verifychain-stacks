'use client';

import type { SlashEvent } from '@/types/challenge';

interface SlashHistoryItemProps {
  event: SlashEvent;
}

const REASON_LABEL: Record<SlashEvent['reason'], string> = {
  'failed-challenge': 'Failed challenge response',
  'late-response': 'Late response window',
};

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function SlashHistoryItem({ event }: SlashHistoryItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border-l-4 border-l-red-500 border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-sm font-bold">
        ⚠
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-gray-900">Provider #{event.providerId}</p>
            <p className="text-xs text-gray-500 mt-0.5">{REASON_LABEL[event.reason]}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-red-600">
              -{(event.slashAmount / 1_000_000).toFixed(6)} STX
            </p>
            <p className="text-xs text-gray-400">{formatDate(event.timestamp)}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
          <span>Challenge: <span className="font-mono">{event.challengeId}</span></span>
          <span>Block #{event.block}</span>
        </div>
      </div>
    </div>
  );
}
