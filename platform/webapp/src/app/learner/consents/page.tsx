'use client';

import { useState } from 'react';
import { ConsentGrantChip } from '@/components/consent-grant-chip';
import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { consentsFacade } from '@/services/domains/consents';
import { formatProblem } from '@/services/shared/http';

export default function LearnerConsentsPage() {
  const requests = useSafeList(() => consentsFacade.listAccessRequests(), []);
  const grants = useSafeList(() => consentsFacade.listConsents(), []);
  const [actionError, setActionError] = useState<string | null>(null);

  async function decide(id: string, decision: 'approve' | 'deny') {
    setActionError(null);
    try {
      await consentsFacade.decideAccessRequest(id, { decision });
      window.location.reload();
    } catch (err) {
      setActionError(formatProblem(err));
    }
  }

  async function revoke(id: string) {
    setActionError(null);
    try {
      await consentsFacade.revokeConsent(id, {});
      window.location.reload();
    } catch (err) {
      setActionError(formatProblem(err));
    }
  }

  const pending = requests.items.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-8">
      <PageHeader
        title="My consents"
        description="Grant researchers time-boxed access for a stated purpose. Revoke anytime — no gas literacy required."
      />

      {(requests.error || grants.error || actionError) && (
        <ErrorBanner
          message={actionError || requests.error || grants.error || ''}
        />
      )}

      <Panel title="Pending requests">
        {requests.loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : pending.length === 0 ? (
          <EmptyState
            title="No pending research requests"
            description="When a researcher asks for access, purpose and time window appear here."
          />
        ) : (
          <ul className="space-y-3">
            {pending.map((r) => {
              const id = String(r.accessRequestId ?? '');
              return (
                <li key={id} className="space-y-2">
                  <ConsentGrantChip
                    purpose={String(r.purpose ?? '')}
                    status="pending"
                    expiresAt={
                      r.expiresAt ? String(r.expiresAt) : undefined
                    }
                    studyId={r.studyTitle ? String(r.studyTitle) : undefined}
                  />
                  <div className="flex gap-2">
                    <PrimaryButton onClick={() => decide(id, 'approve')}>
                      Approve
                    </PrimaryButton>
                    <SecondaryButton onClick={() => decide(id, 'deny')}>
                      Deny
                    </SecondaryButton>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel title="Active & past grants">
        {grants.loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : grants.items.length === 0 ? (
          <EmptyState title="No consent grants yet" />
        ) : (
          <ul className="space-y-3">
            {grants.items.map((g) => {
              const id = String(g.consentId ?? '');
              return (
                <li key={id} className="space-y-2">
                  <ConsentGrantChip
                    purpose={String(g.purpose ?? '')}
                    status={String(g.status ?? '')}
                    expiresAt={
                      g.expiresAt ? String(g.expiresAt) : undefined
                    }
                    studyId={g.studyId ? String(g.studyId) : undefined}
                  />
                  {g.status === 'active' ? (
                    <SecondaryButton onClick={() => revoke(id)}>
                      Revoke
                    </SecondaryButton>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
