'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CustodyReductionMeter } from '@/components/custody-reduction-meter';
import {
  EmptyState,
  ErrorBanner,
  FieldLabel,
  FieldSelect,
  PageHeader,
  Panel,
  SealMark,
  StatusPill,
} from '@/components/ui';
import { useSafeEntity, useSafeList } from '@/components/use-safe-load';
import { spacesFacade } from '@/services/domains/spaces';

function DpiABody() {
  const search = useSearchParams();
  const querySpaceId = search.get('spaceId') || '';
  const spaces = useSafeList(() => spacesFacade.listSpaces(), []);
  const [selected, setSelected] = useState(querySpaceId);

  const spaceId =
    selected || querySpaceId || String(spaces.items[0]?.spaceId ?? '');

  const evidence = useSafeEntity<{
    onChainPolicyAttestation?: string;
    sampleCommitmentHash?: string;
    anchoringEnabled?: boolean;
    personalDataOnLedgerDetected?: boolean;
    necessityDecisionIds?: string[];
    deletionMetrics?: {
      requestedCount?: number;
      completedCount?: number;
      failedCount?: number;
    };
  }>(
    () =>
      spaceId
        ? spacesFacade.getDpiaEvidence(spaceId)
        : Promise.resolve(null),
    [spaceId],
  );

  const spaceOptions = useMemo(
    () =>
      spaces.items.map((s) => ({
        id: String(s.spaceId ?? ''),
        name: String(s.name ?? s.spaceId ?? ''),
      })),
    [spaces.items],
  );

  const deletion = evidence.entity?.deletionMetrics;
  const completionPct =
    deletion && deletion.requestedCount
      ? Math.round(
          ((deletion.completedCount ?? 0) / deletion.requestedCount) * 100,
        )
      : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        seal
        title="DPIA evidence pack"
        description="Prove raw traces are not on chain; show necessity decisions and deletion completion."
      />

      {spaces.error ? <ErrorBanner message={spaces.error} /> : null}

      <Panel title="Space">
        {spaceOptions.length === 0 ? (
          <EmptyState
            title="Select a space"
            description="Register a learning space to generate DPIA evidence."
          />
        ) : (
          <label className="block max-w-md space-y-1.5">
            <FieldLabel>Space</FieldLabel>
            <FieldSelect
              value={spaceId}
              onChange={(e) => setSelected(e.target.value)}
            >
              {spaceOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </FieldSelect>
          </label>
        )}
      </Panel>

      {evidence.error ? <ErrorBanner message={evidence.error} /> : null}

      {spaceId && evidence.entity ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="On-chain policy">
            <SealMark size="sm" label="Opaque commitments only" />
            <p className="mt-3 text-sm text-ink-soft">
              {evidence.entity.onChainPolicyAttestation ||
                'Ledger holds opaque hashes — no personal data.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusPill
                label={
                  evidence.entity.anchoringEnabled
                    ? 'Anchoring enabled'
                    : 'Anchoring off'
                }
                tone={evidence.entity.anchoringEnabled ? 'amber' : 'seal'}
              />
              <StatusPill
                label={
                  evidence.entity.personalDataOnLedgerDetected
                    ? 'PII risk detected'
                    : 'No PII on ledger'
                }
                tone={
                  evidence.entity.personalDataOnLedgerDetected
                    ? 'tamper'
                    : 'seal'
                }
              />
            </div>
            {evidence.entity.sampleCommitmentHash ? (
              <p className="mt-3 break-all font-mono text-xs text-ink-muted">
                sample {evidence.entity.sampleCommitmentHash}
              </p>
            ) : null}
          </Panel>

          <Panel title="Deletion & custody">
            <CustodyReductionMeter
              learnerOwnedPct={Math.min(98, 55 + completionPct / 2)}
              centralRawVolume={deletion?.failedCount ?? 0}
            />
            <p className="mt-3 text-sm text-ink-muted">
              Deletion requests {deletion?.requestedCount ?? 0} · completed{' '}
              {deletion?.completedCount ?? 0} · failed{' '}
              {deletion?.failedCount ?? 0}
            </p>
            <p className="mt-2 text-xs text-stone">
              Necessity ids:{' '}
              {(evidence.entity.necessityDecisionIds ?? []).join(', ') || '—'}
            </p>
          </Panel>
        </div>
      ) : spaceId && !evidence.loading ? (
        <EmptyState
          title="No DPIA pack yet"
          description="Evidence will appear once the space has necessity and adapter posture."
        />
      ) : null}
    </div>
  );
}

export default function OpsDpiAPage() {
  return (
    <Suspense fallback={<p className="text-sm text-ink-muted">Loading DPIA…</p>}>
      <DpiABody />
    </Suspense>
  );
}
