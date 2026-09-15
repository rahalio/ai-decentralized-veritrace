'use client';

import { FormEvent, useState } from 'react';
import {
  EmptyState,
  ErrorBanner,
  FieldInput,
  FieldLabel,
  PageHeader,
  Panel,
  PrimaryButton,
  StatusPill,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { blocksFacade } from '@/services/domains/blocks';
import { asItems, formatProblem } from '@/services/shared/http';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

export default function LearnerDeletePage() {
  const { items, loading, error, setItems } = useSafeList(
    () => blocksFacade.listDeletionRequests(),
    [],
  );
  const [blockId, setBlockId] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setBusy(true);
    try {
      await blocksFacade.createDeletionRequest(blockId.trim(), {});
      setBlockId('');
      const refreshed = await blocksFacade.listDeletionRequests();
      setItems(asItems(unwrapDataEnvelope(refreshed)) as typeof items);
    } catch (err) {
      setFormError(formatProblem(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Deletion requests"
        description="Withdraw access and ask your Learning Block Repository to delete raw blocks. Residual commitments stay unlinkable."
      />

      {error ? <ErrorBanner message={error} /> : null}

      <Panel title="Request deletion">
        <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-3">
          <label className="block min-w-[220px] flex-1 space-y-1.5">
            <FieldLabel>Block id</FieldLabel>
            <FieldInput
              required
              value={blockId}
              onChange={(e) => setBlockId(e.target.value)}
              placeholder="blk_…"
            />
          </label>
          <PrimaryButton type="submit" disabled={busy}>
            {busy ? 'Requesting…' : 'Request LBR deletion'}
          </PrimaryButton>
        </form>
        {formError ? (
          <div className="mt-3">
            <ErrorBanner message={formError} />
          </div>
        ) : null}
      </Panel>

      <Panel title="Status">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <EmptyState
            title="No deletion requests"
            description="When you revoke research access, request raw-block deletion here."
          />
        ) : (
          <ul className="space-y-2">
            {items.map((d) => (
              <li
                key={String(d.deletionRequestId)}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 py-2 last:border-0"
              >
                <span className="font-mono text-xs text-ink-muted">
                  {String(d.blockId ?? d.deletionRequestId)}
                </span>
                <StatusPill
                  label={String(d.status ?? 'pending')}
                  tone={
                    d.status === 'completed'
                      ? 'seal'
                      : d.status === 'failed'
                        ? 'tamper'
                        : 'amber'
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
