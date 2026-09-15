'use client';

import { StatusPill } from '@/components/ui';

export function TeacherPlainStatus({
  researchCollectionEnabled = false,
  optInCount = 0,
  learnerOwned = true,
  spaceName,
}: {
  researchCollectionEnabled?: boolean;
  optInCount?: number;
  learnerOwned?: boolean;
  spaceName?: string;
}) {
  return (
    <div className="space-y-4">
      {spaceName ? (
        <p className="font-display text-xl text-ink">{spaceName}</p>
      ) : null}

      <div className="space-y-2 text-sm text-ink-soft">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill
            label={researchCollectionEnabled ? 'Research collection on' : 'Research off'}
            tone={researchCollectionEnabled ? 'seal' : 'stone'}
          />
          <span>
            {researchCollectionEnabled
              ? 'Learners who opted in can share activity for research.'
              : 'Research collection is off by default for this space.'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPill
            label={`${optInCount} opted in`}
            tone={optInCount > 0 ? 'amber' : 'stone'}
          />
          <span>Only voluntary participants are counted — no silent enrollment.</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPill
            label={learnerOwned ? 'Traces learner-owned' : 'Custody review'}
            tone={learnerOwned ? 'seal' : 'amber'}
          />
          <span>
            Activity records stay in each learner&apos;s repository, not a class
            wallet.
          </span>
        </div>
      </div>
    </div>
  );
}
