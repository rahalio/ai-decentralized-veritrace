'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ErrorBanner,
  PageHeader,
  Panel,
  StatusPill,
} from '@/components/ui';
import { useSafeEntity, useSafeList } from '@/components/use-safe-load';
import { spacesFacade } from '@/services/domains/spaces';

export default function OpsSpaceDetailPage() {
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;

  const space = useSafeEntity<{
    name?: string;
    description?: string;
    researchCollectionEnabled?: boolean;
    anchoringEnabled?: boolean;
    latestNecessityDecisionId?: string;
  }>(() => spacesFacade.getSpace(spaceId), [spaceId]);

  const decisions = useSafeList(
    () => spacesFacade.listNecessityDecisions(spaceId),
    [spaceId],
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title={space.entity?.name || 'Learning space'}
        description={
          space.entity?.description ||
          `Space ${spaceId} — hooks, research enablement, necessity posture.`
        }
        actions={
          <>
            <Link
              href={`/ops/necessity?spaceId=${encodeURIComponent(spaceId)}`}
              className="rounded-md bg-seal px-3.5 py-2 text-sm font-semibold text-surface hover:bg-seal/90"
            >
              Necessity decision
            </Link>
            <Link
              href={`/ops/dpia?spaceId=${encodeURIComponent(spaceId)}`}
              className="rounded-md border border-ink/15 px-3.5 py-2 text-sm font-semibold text-ink-muted hover:border-seal hover:text-seal"
            >
              DPIA evidence
            </Link>
          </>
        }
      />

      {space.error ? <ErrorBanner message={space.error} /> : null}

      <div className="flex flex-wrap gap-2">
        <StatusPill
          label={
            space.entity?.researchCollectionEnabled
              ? 'Research on'
              : 'Research off'
          }
          tone={space.entity?.researchCollectionEnabled ? 'seal' : 'stone'}
        />
        <StatusPill
          label={
            space.entity?.anchoringEnabled ? 'Anchoring on' : 'Anchoring off'
          }
          tone={space.entity?.anchoringEnabled ? 'amber' : 'stone'}
        />
        <StatusPill
          label={
            space.entity?.latestNecessityDecisionId
              ? 'Necessity recorded'
              : 'Necessity missing'
          }
          tone={space.entity?.latestNecessityDecisionId ? 'seal' : 'amber'}
        />
      </div>

      <Panel title="Necessity history">
        {decisions.error ? <ErrorBanner message={decisions.error} /> : null}
        {decisions.loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : decisions.items.length === 0 ? (
          <p className="text-sm text-ink-muted">
            No decisions yet — record one before enabling commitments.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {decisions.items.map((d) => (
              <li
                key={String(d.necessityDecisionId)}
                className="flex flex-wrap items-center gap-2 border-b border-ink/10 py-2 last:border-0"
              >
                <StatusPill
                  label={String(d.outcome ?? '—')}
                  tone={d.useBlockchain ? 'amber' : 'stone'}
                />
                <span className="text-ink-muted">
                  {String(d.rationale ?? '').slice(0, 120)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
