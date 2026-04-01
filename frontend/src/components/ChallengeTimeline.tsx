'use client';

import type { ChallengeStatus } from '@/types/challenge';

interface TimelineStep {
  key: string;
  label: string;
  description: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  { key: 'created', label: 'Created', description: 'Challenge submitted on-chain' },
  { key: 'response-window', label: 'Response Window', description: '144 blocks to respond (~24 hours)' },
  { key: 'outcome', label: 'Outcome', description: 'Responded, Expired, or Slashed' },
  { key: 'finalized', label: 'Finalized', description: 'Validated or Slash executed' },
];

function getActiveStep(status: ChallengeStatus): number {
  switch (status) {
    case 'pending': return 1;
    case 'responded': return 2;
    case 'expired': return 2;
    case 'slashed': return 3;
    case 'validated': return 3;
    default: return 0;
  }
}

function getOutcomeLabel(status: ChallengeStatus): string {
  switch (status) {
    case 'responded': return 'Responded';
    case 'expired': return 'Expired';
    case 'slashed': return 'Slashed';
    case 'validated': return 'Validated';
    default: return 'Pending';
  }
}

interface ChallengeTimelineProps {
  status: ChallengeStatus;
}

export default function ChallengeTimeline({ status }: ChallengeTimelineProps) {
  const activeStep = getActiveStep(status);
  const outcomeLabel = getOutcomeLabel(status);

  const steps = TIMELINE_STEPS.map((step, idx) => {
    const label = step.key === 'outcome' ? outcomeLabel : step.label;
    const isCurrent = idx === activeStep;
    const isCompleted = idx < activeStep;
    const isSlashed = status === 'slashed' && idx >= 2;
    const isExpired = status === 'expired' && idx >= 2;

    return { ...step, label, isCurrent, isCompleted, isSlashed, isExpired };
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Challenge Lifecycle</h3>
      <div className="flex items-start gap-0">
        {steps.map((step, idx) => (
          <div key={step.key} className="flex-1 flex items-start">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center w-full">
                <div
                  className={`challenge-timeline-dot flex-shrink-0 ${
                    step.isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : step.isCurrent
                      ? step.isSlashed
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-primary-600 border-primary-600 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                />
                {idx < steps.length - 1 && (
                  <div
                    className={`challenge-timeline-line ${
                      step.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-center px-1">
                <p
                  className={`text-xs font-medium ${
                    step.isCurrent
                      ? step.isSlashed
                        ? 'text-red-600'
                        : step.isExpired
                        ? 'text-gray-500'
                        : 'text-primary-700'
                      : step.isCompleted
                      ? 'text-green-700'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
