'use client';

import { useEffect, useState } from 'react';

export type ReputationEventType = 'success' | 'failure' | 'slash';

export interface ReputationHistoryEntry {
  date: string;
  eventType: ReputationEventType;
  deltaPoints: number;
  blockHeight: number;
}

interface ReputationHistoryProps {
  providerId: number;
}

const EVENT_STYLES: Record<ReputationEventType, { label: string; color: string; sign: string }> = {
  success: { label: 'Verification success', color: 'text-green-600', sign: '+' },
  failure: { label: 'Verification failure', color: 'text-red-500', sign: '-' },
  slash: { label: 'Slash event', color: 'text-red-700', sign: '-' },
};

export default function ReputationHistory({ providerId }: ReputationHistoryProps) {
  const [entries, setEntries] = useState<ReputationHistoryEntry[]>([]);

  useEffect(() => {
    const key = `reputation_history_${providerId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch {
        setEntries([]);
      }
    } else {
      // Seed with sample data for demonstration
      const sample: ReputationHistoryEntry[] = [
        { date: '2026-03-24', eventType: 'success', deltaPoints: 10, blockHeight: 145010 },
        { date: '2026-03-23', eventType: 'success', deltaPoints: 10, blockHeight: 144870 },
        { date: '2026-03-22', eventType: 'failure', deltaPoints: 25, blockHeight: 144730 },
        { date: '2026-03-21', eventType: 'success', deltaPoints: 10, blockHeight: 144590 },
        { date: '2026-03-20', eventType: 'slash', deltaPoints: 50, blockHeight: 144450 },
      ];
      localStorage.setItem(key, JSON.stringify(sample));
      setEntries(sample);
    }
  }, [providerId]);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">No reputation history yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">Reputation History</h3>
      <ol className="relative border-l border-gray-200 space-y-4">
        {entries.slice(0, 10).map((entry, idx) => {
          const style = EVENT_STYLES[entry.eventType];
          return (
            <li key={idx} className="ml-4">
              <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border border-white bg-gray-300" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800">{style.label}</p>
                  <p className="text-xs text-gray-400">Block #{entry.blockHeight} · {entry.date}</p>
                </div>
                <span className={`text-sm font-bold ${style.color}`}>
                  {style.sign}{Math.abs(entry.deltaPoints)} pts
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
