'use client';

import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  StatusPill,
} from '@/components/ui';
import { TamperIncidentBanner } from '@/components/tamper-incident-banner';
import { useSafeList } from '@/components/use-safe-load';
import { verificationsFacade } from '@/services/domains/verifications';
import { formatProblem } from '@/services/shared/http';
import { useState } from 'react';

export default function OpsTamperPage() {
  const { items, loading, error, setItems } = useSafeList(
    () => verificationsFacade.listTamperEvents(),
    [],
  );
  const [actionError, setActionError] = useState<string | null>(null);

  const openCount = items.filter(
    (t) => t.status === 'open' || t.status === 'acknowledged',
  ).length;

  async function acknowledge(id: string) {
    setActionError(null);
    try {
      await verificationsFacade.acknowledgeTamperEvent(id, {});
      setItems(
        items.map((t) =>
          t.tamperEventId === id ? { ...t, status: 'acknowledged' } : t,
        ),
      );
    } catch (err) {
      setActionError(formatProblem(err));
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tamper incidents"
        description="Verification mismatches are operational incidents — fail closed, then resolve with a playbook."
      />

      {error ? <ErrorBanner message={error} /> : null}
      {actionError ? <ErrorBanner message={actionError} /> : null}

      <TamperIncidentBanner count={openCount} />

      <Panel title="Incident queue">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <EmptyState
            title="Integrity healthy"
            description="No tamper events. Mismatches will appear here and page security."
          />
        ) : (
          <ul className="divide-y divide-ink/10">
            {items.map((t) => {
              const id = String(t.tamperEventId ?? '');
              return (
                <li
                  key={id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill
                        label={String(t.status ?? 'open')}
                        tone={
                          t.status === 'resolved'
                            ? 'seal'
                            : t.status === 'acknowledged'
                              ? 'amber'
                              : 'tamper'
                        }
                      />
                      <span className="font-mono text-xs text-ink-muted">
                        block {String(t.blockId ?? '—')}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-stone">{id}</p>
                  </div>
                  {t.status === 'open' ? (
                    <PrimaryButton onClick={() => acknowledge(id)}>
                      Acknowledge
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton disabled>Tracked</SecondaryButton>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
