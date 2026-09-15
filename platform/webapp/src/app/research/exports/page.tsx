'use client';

import { FormEvent, useState } from 'react';
import { ResearchExportPack } from '@/components/research-export-pack';
import {
  EmptyState,
  ErrorBanner,
  FieldInput,
  FieldLabel,
  PageHeader,
  Panel,
  PrimaryButton,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { exportsFacade } from '@/services/domains/exports';
import { asItems, formatProblem } from '@/services/shared/http';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

export default function ResearchExportsPage() {
  const { items, loading, error, setItems } = useSafeList(
    () => exportsFacade.listExports(),
    [],
  );
  const [consentId, setConsentId] = useState('');
  const [studyId, setStudyId] = useState('');
  const [blockIds, setBlockIds] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setBusy(true);
    try {
      await exportsFacade.createExport({
        consentId: consentId.trim(),
        studyId: studyId.trim() || undefined,
        blockIds: blockIds
          .split(/[\s,]+/)
          .map((s) => s.trim())
          .filter(Boolean),
      });
      const refreshed = await exportsFacade.listExports();
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
        seal
        title="Research exports"
        description="Verified bundles with consent artefacts and proofs for ethics board review."
      />

      {error ? <ErrorBanner message={error} /> : null}

      <Panel title="Generate package">
        <form onSubmit={onCreate} className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <FieldLabel>Consent id</FieldLabel>
            <FieldInput
              required
              value={consentId}
              onChange={(e) => setConsentId(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <FieldLabel>Study id</FieldLabel>
            <FieldInput
              value={studyId}
              onChange={(e) => setStudyId(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5 sm:col-span-2">
            <FieldLabel>Block ids (verified only)</FieldLabel>
            <FieldInput
              value={blockIds}
              onChange={(e) => setBlockIds(e.target.value)}
              placeholder="blk_a, blk_b"
            />
          </label>
          {formError ? (
            <div className="sm:col-span-2">
              <ErrorBanner message={formError} />
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Generating…' : 'Generate package'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>

      <Panel title="Packages">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <EmptyState
            title="No export packages"
            description="Generate only after verification pass (or explicit no-anchor policy)."
          />
        ) : (
          <ul className="grid gap-3 lg:grid-cols-2">
            {items.map((exp) => {
              const ethics = (exp.ethicsPackage ?? {}) as Record<
                string,
                unknown
              >;
              return (
                <li key={String(exp.exportId)}>
                  <ResearchExportPack
                    exportId={String(exp.exportId ?? '')}
                    status={String(exp.status ?? '')}
                    studyId={
                      exp.studyId
                        ? String(exp.studyId)
                        : ethics.studyId
                          ? String(ethics.studyId)
                          : undefined
                    }
                    studyTitle={
                      ethics.studyTitle
                        ? String(ethics.studyTitle)
                        : undefined
                    }
                    blockCount={
                      Array.isArray(exp.blockIds)
                        ? exp.blockIds.length
                        : typeof ethics.blockCount === 'number'
                          ? ethics.blockCount
                          : undefined
                    }
                    includesVerificationProofs={Boolean(
                      ethics.includesVerificationProofs ??
                        (Array.isArray(exp.verificationIds) &&
                          exp.verificationIds.length > 0),
                    )}
                    includesConsentArtefacts={Boolean(
                      ethics.includesConsentArtefacts ??
                        (Array.isArray(exp.consentArtefacts) &&
                          exp.consentArtefacts.length > 0),
                    )}
                    includesNecessitySummary={Boolean(
                      ethics.includesNecessitySummary ?? exp.necessitySummary,
                    )}
                    downloadUrl={
                      exp.downloadUrl ? String(exp.downloadUrl) : undefined
                    }
                    ethicsShareUrl={
                      ethics.ethicsShareUrl
                        ? String(ethics.ethicsShareUrl)
                        : undefined
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
