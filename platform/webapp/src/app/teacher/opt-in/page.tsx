'use client';

import { TeacherPlainStatus } from '@/components/teacher-plain-status';
import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { spacesFacade } from '@/services/domains/spaces';
import { formatProblem } from '@/services/shared/http';
import { useState } from 'react';

export default function TeacherOptInPage() {
  const spaces = useSafeList(() => spacesFacade.listSpaces(), []);
  const space = spaces.items[0];
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggleCollection(enabled: boolean) {
    setError(null);
    setMessage(null);
    if (!space?.spaceId) {
      setError('No space available');
      return;
    }
    try {
      // Collection toggle is policy-gated; surface intent until PATCH exists.
      await spacesFacade.createSpace({
        name: String(space.name ?? 'Space'),
        researchCollectionEnabled: enabled,
      });
      setMessage(
        enabled
          ? 'Research collection requested — only with learner opt-in policy.'
          : 'Research collection left off.',
      );
    } catch (err) {
      setError(formatProblem(err));
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Research opt-in"
        description="Enable collection only with an opt-in policy. Message the class that participation is voluntary — no wallet steps."
      />

      {spaces.error ? <ErrorBanner message={spaces.error} /> : null}
      {error ? <ErrorBanner message={error} /> : null}
      {message ? (
        <p className="text-sm text-seal" role="status">
          {message}
        </p>
      ) : null}

      <Panel title="Class research posture">
        {!space ? (
          <EmptyState
            title="No space linked"
            description="Ask your platform admin to register this learning space first."
          />
        ) : (
          <div className="space-y-4">
            <TeacherPlainStatus
              spaceName={String(space.name ?? 'Your space')}
              researchCollectionEnabled={Boolean(
                space.researchCollectionEnabled,
              )}
              optInCount={Number(space.optInCount ?? 0)}
              learnerOwned
            />
            <div className="flex flex-wrap gap-2">
              <PrimaryButton onClick={() => toggleCollection(true)}>
                Enable with opt-in policy
              </PrimaryButton>
              <SecondaryButton onClick={() => toggleCollection(false)}>
                Keep research off
              </SecondaryButton>
            </div>
            <p className="text-sm text-ink-muted">
              Suggested class note: “Sharing activity for research is optional.
              Your traces stay in your own repository.”
            </p>
          </div>
        )}
      </Panel>
    </div>
  );
}
