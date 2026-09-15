'use client';

import { SealMark, StatusPill } from '@/components/ui';

export function ResearchExportPack({
  exportId,
  status,
  studyId,
  studyTitle,
  blockCount,
  includesVerificationProofs,
  includesConsentArtefacts,
  includesNecessitySummary,
  downloadUrl,
  ethicsShareUrl,
}: {
  exportId?: string;
  status?: string;
  studyId?: string;
  studyTitle?: string;
  blockCount?: number;
  includesVerificationProofs?: boolean;
  includesConsentArtefacts?: boolean;
  includesNecessitySummary?: boolean;
  downloadUrl?: string;
  ethicsShareUrl?: string;
}) {
  const checks = [
    {
      label: 'Verification proofs',
      ok: includesVerificationProofs ?? false,
    },
    {
      label: 'Consent artefacts',
      ok: includesConsentArtefacts ?? false,
    },
    {
      label: 'Necessity summary',
      ok: includesNecessitySummary ?? false,
    },
  ];

  return (
    <div className="space-y-3 rounded-md border border-ink/10 bg-[linear-gradient(180deg,rgba(184,197,192,0.06),transparent_40%),var(--color-surface-raised)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SealMark size="sm" label="Ethics package" />
        {status ? (
          <StatusPill
            label={status}
            tone={
              status === 'ready'
                ? 'seal'
                : status === 'failed'
                  ? 'tamper'
                  : 'amber'
            }
          />
        ) : null}
      </div>

      <div>
        <p className="font-display text-lg text-ink">
          {studyTitle || 'Research export'}
        </p>
        <p className="mt-1 font-mono text-xs text-ink-muted">
          {[exportId, studyId].filter(Boolean).join(' · ') || 'Pending package'}
        </p>
      </div>

      <ul className="space-y-1.5 text-sm">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2 text-ink-soft">
            <StatusPill
              label={c.ok ? 'Included' : 'Missing'}
              tone={c.ok ? 'seal' : 'amber'}
            />
            {c.label}
          </li>
        ))}
        <li className="text-ink-muted">
          Blocks: {typeof blockCount === 'number' ? blockCount : '—'}
        </li>
      </ul>

      <div className="flex flex-wrap gap-2 pt-1">
        {downloadUrl ? (
          <a
            href={downloadUrl}
            className="rounded-md bg-seal px-3 py-1.5 text-sm font-semibold text-surface hover:bg-seal/90"
          >
            Download
          </a>
        ) : null}
        {ethicsShareUrl ? (
          <a
            href={ethicsShareUrl}
            className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-semibold text-ink-muted hover:border-seal hover:text-seal"
          >
            Share with ethics
          </a>
        ) : null}
      </div>
    </div>
  );
}
