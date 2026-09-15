'use client';

import { FormEvent, useState } from 'react';
import { ConsentGrantChip } from '@/components/consent-grant-chip';
import {
  EmptyState,
  ErrorBanner,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  PageHeader,
  Panel,
  PrimaryButton,
  StatusPill,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { consentsFacade } from '@/services/domains/consents';
import { asItems, formatProblem } from '@/services/shared/http';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

export default function ResearchRequestsPage() {
  const { items, loading, error, setItems } = useSafeList(
    () => consentsFacade.listAccessRequests(),
    [],
  );
  const [learnerId, setLearnerId] = useState('learner_demo');
  const [researcherId, setResearcherId] = useState('researcher_demo');
  const [purpose, setPurpose] = useState('');
  const [studyTitle, setStudyTitle] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setBusy(true);
    try {
      await consentsFacade.createAccessRequest({
        learnerId,
        researcherId,
        purpose: purpose.trim(),
        studyTitle: studyTitle.trim() || undefined,
        expiresAt: expiresAt
          ? new Date(expiresAt).toISOString()
          : new Date(Date.now() + 30 * 86400000).toISOString(),
      });
      setPurpose('');
      const refreshed = await consentsFacade.listAccessRequests();
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
        title="Access requests"
        description="Request purpose-limited access. Denied and expired grants block fetch — no silent retry loops."
      />

      {error ? <ErrorBanner message={error} /> : null}

      <Panel title="New request">
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <FieldLabel>Learner id</FieldLabel>
            <FieldInput
              required
              value={learnerId}
              onChange={(e) => setLearnerId(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <FieldLabel>Researcher id</FieldLabel>
            <FieldInput
              required
              value={researcherId}
              onChange={(e) => setResearcherId(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5 sm:col-span-2">
            <FieldLabel>Purpose</FieldLabel>
            <FieldTextarea
              required
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <FieldLabel>Study title</FieldLabel>
            <FieldInput
              value={studyTitle}
              onChange={(e) => setStudyTitle(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <FieldLabel>Access window end</FieldLabel>
            <FieldInput
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </label>
          {formError ? (
            <div className="sm:col-span-2">
              <ErrorBanner message={formError} />
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Submitting…' : 'Submit request'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>

      <Panel title="Requests">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <EmptyState
            title="No access requests"
            description="Submit a purpose-limited request to start the consent path."
          />
        ) : (
          <ul className="space-y-2">
            {items.map((r) => (
              <li key={String(r.accessRequestId)} className="space-y-1">
                <ConsentGrantChip
                  purpose={String(r.purpose ?? '')}
                  status={String(r.status ?? 'pending')}
                  expiresAt={
                    r.expiresAt ? String(r.expiresAt) : undefined
                  }
                  studyId={r.studyId ? String(r.studyId) : undefined}
                />
                <p className="font-mono text-xs text-stone">
                  {String(r.accessRequestId)}
                  {r.status === 'granted' ? (
                    <StatusPill label="Open verify" tone="seal" />
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
