'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { NecessityDecisionForm } from '@/components/necessity-decision-form';
import {
  EmptyState,
  ErrorBanner,
  FieldLabel,
  FieldSelect,
  PageHeader,
  Panel,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { spacesFacade } from '@/services/domains/spaces';

function NecessityBody() {
  const search = useSearchParams();
  const querySpaceId = search.get('spaceId') || '';
  const spaces = useSafeList(() => spacesFacade.listSpaces(), []);
  const [selected, setSelected] = useState(querySpaceId);

  const spaceId =
    selected || querySpaceId || String(spaces.items[0]?.spaceId ?? '');

  const spaceOptions = useMemo(
    () =>
      spaces.items.map((s) => ({
        id: String(s.spaceId ?? ''),
        name: String(s.name ?? s.spaceId ?? ''),
      })),
    [spaces.items],
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Necessity decisions"
        description="Force a Wüst–Gervais-style record before any chain anchoring is enabled."
      />

      {spaces.error ? <ErrorBanner message={spaces.error} /> : null}

      <Panel title="Space">
        {spaces.loading ? (
          <p className="text-sm text-ink-muted">Loading spaces…</p>
        ) : spaceOptions.length === 0 ? (
          <EmptyState
            title="No spaces in queue"
            description="Register a learning space first, then record necessity."
          />
        ) : (
          <label className="block max-w-md space-y-1.5">
            <FieldLabel>Select space</FieldLabel>
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

      {spaceId ? <NecessityDecisionForm spaceId={spaceId} /> : null}
    </div>
  );
}

export default function OpsNecessityPage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-ink-muted">Loading necessity…</p>}
    >
      <NecessityBody />
    </Suspense>
  );
}
