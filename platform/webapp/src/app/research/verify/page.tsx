'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { TamperIncidentBanner } from '@/components/tamper-incident-banner';
import { VerificationResultRow } from '@/components/verification-result-row';
import {
  EmptyState,
  ErrorBanner,
  FieldInput,
  FieldLabel,
  PageHeader,
  Panel,
  PrimaryButton,
  SealMark,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { verificationsFacade } from '@/services/domains/verifications';
import { asItems, formatProblem } from '@/services/shared/http';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

export default function ResearchVerifyPage() {
  const { items, loading, error, setItems } = useSafeList(
    () => verificationsFacade.listVerifications(),
    [],
  );
  const [blockId, setBlockId] = useState('');
  const [consentId, setConsentId] = useState('');
  const [allowNoAnchor, setAllowNoAnchor] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [lastStatus, setLastStatus] = useState<string | null>(null);

  async function onVerify(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setBusy(true);
    setFlash(false);
    try {
      const raw = await verificationsFacade.createVerification({
        blockId: blockId.trim(),
        consentId: consentId.trim(),
        allowNoAnchor,
      });
      const result = unwrapDataEnvelope(raw) as {
        status?: string;
        tamperEventId?: string;
      };
      setLastStatus(result?.status ?? null);
      if (result?.status === 'valid') setFlash(true);
      const refreshed = await verificationsFacade.listVerifications();
      setItems(asItems(unwrapDataEnvelope(refreshed)) as typeof items);
    } catch (err) {
      setFormError(formatProblem(err));
    } finally {
      setBusy(false);
    }
  }

  const mismatch = items.filter((v) => v.status === 'mismatch');

  return (
    <div className="space-y-8">
      <PageHeader
        seal
        title="Verification on retrieval"
        description="Recompute block hash vs anchored commitment. Mismatch opens a tamper incident; LBR offline is distinct from tamper."
        actions={
          <Link
            href="/research/exports"
            className="rounded-md border border-ink/15 px-3.5 py-2 text-sm font-semibold text-ink-muted hover:border-seal hover:text-seal"
          >
            Proceed to export
          </Link>
        }
      />

      {error ? <ErrorBanner message={error} /> : null}
      <TamperIncidentBanner
        count={mismatch.length}
        message={
          mismatch.length
            ? 'Mismatch detected — fail closed until ops acknowledge.'
            : undefined
        }
      />

      {flash ? (
        <div className="flex items-center gap-2">
          <SealMark flash label="Verified" />
        </div>
      ) : null}

      <Panel title="Verify selection">
        <form onSubmit={onVerify} className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <FieldLabel>Block id</FieldLabel>
            <FieldInput
              required
              value={blockId}
              onChange={(e) => setBlockId(e.target.value)}
              placeholder="blk_…"
            />
          </label>
          <label className="block space-y-1.5">
            <FieldLabel>Consent id</FieldLabel>
            <FieldInput
              required
              value={consentId}
              onChange={(e) => setConsentId(e.target.value)}
              placeholder="cns_…"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-ink sm:col-span-2">
            <input
              type="checkbox"
              checked={allowNoAnchor}
              onChange={(e) => setAllowNoAnchor(e.target.checked)}
            />
            Allow no-anchor policy path
          </label>
          {formError ? (
            <div className="sm:col-span-2">
              <ErrorBanner message={formError} />
            </div>
          ) : null}
          {lastStatus ? (
            <p className="sm:col-span-2 text-sm text-ink-muted" role="status">
              Last result: {lastStatus}
            </p>
          ) : null}
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Verifying…' : 'Verify selection'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>

      <Panel title="Results">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <EmptyState
            title="No verifications yet"
            description="Run verify after a consent grant. Do not treat missing LBR data as empty valid activity."
          />
        ) : (
          <div>
            {items.map((v) => (
              <VerificationResultRow
                key={String(v.verificationId)}
                blockId={String(v.blockId ?? '')}
                status={String(v.status ?? '')}
                commitmentId={
                  v.commitmentId ? String(v.commitmentId) : undefined
                }
                detail={v.detail ? String(v.detail) : undefined}
              />
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
