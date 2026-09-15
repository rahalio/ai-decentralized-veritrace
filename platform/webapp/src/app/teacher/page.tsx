'use client';

import Link from 'next/link';
import { TeacherPlainStatus } from '@/components/teacher-plain-status';
import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { spacesFacade } from '@/services/domains/spaces';

export default function TeacherHomePage() {
  const spaces = useSafeList(() => spacesFacade.listSpaces(), []);
  const space = spaces.items[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Teacher space"
        description="Consent and research status without raw telemetry or blockchain jargon."
        actions={
          <Link
            href="/teacher/opt-in"
            className="rounded-md bg-seal px-3.5 py-2 text-sm font-semibold text-surface hover:bg-seal/90"
          >
            Research opt-in
          </Link>
        }
      />

      {spaces.error ? <ErrorBanner message={spaces.error} /> : null}

      <Panel title="Plain status">
        {spaces.loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : !space ? (
          <EmptyState
            title="Research off by default"
            description="When a space is linked, you will see opt-in counts here — never wallet copy."
          />
        ) : (
          <TeacherPlainStatus
            spaceName={String(space.name ?? 'Your space')}
            researchCollectionEnabled={Boolean(
              space.researchCollectionEnabled,
            )}
            optInCount={Number(space.optInCount ?? 0)}
            learnerOwned
          />
        )}
      </Panel>
    </div>
  );
}
