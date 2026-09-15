'use client';

import { AdapterVersionBadge } from '@/components/adapter-version-badge';
import {
  EmptyState,
  ErrorBanner,
  PageHeader,
  Panel,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { adaptersFacade } from '@/services/domains/adapters';

export default function OpsAdaptersPage() {
  const lbrs = useSafeList(() => adaptersFacade.listLbrEndpoints(), []);
  const ledgers = useSafeList(() => adaptersFacade.listLedgerAdapters(), []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="LBR & ledger adapters"
        description="Versioned adapters and patch posture — ledger holds opaque commitments only."
      />

      {(lbrs.error || ledgers.error) && (
        <ErrorBanner message={lbrs.error || ledgers.error || ''} />
      )}

      <Panel title="Learning Block Repository endpoints">
        {lbrs.loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : lbrs.items.length === 0 ? (
          <EmptyState
            title="No LBR endpoints"
            description="Register a managed or self-hosted repository adapter."
          />
        ) : (
          <ul className="space-y-2">
            {lbrs.items.map((a) => (
              <li key={String(a.lbrEndpointId)}>
                <AdapterVersionBadge
                  name={String(a.name ?? 'LBR')}
                  version={String(a.version ?? '')}
                  status={String(a.status ?? '')}
                  kind={String(a.kind ?? 'LBR')}
                  vulnerable={a.status === 'unversioned'}
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Ledger adapters">
        {ledgers.loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : ledgers.items.length === 0 ? (
          <EmptyState
            title="No ledger adapters"
            description="Commitments adapter stays disabled until a necessity decision allows anchoring."
          />
        ) : (
          <ul className="space-y-2">
            {ledgers.items.map((a) => (
              <li key={String(a.ledgerAdapterId)}>
                <AdapterVersionBadge
                  name={String(a.name ?? 'Ledger')}
                  version={String(a.version ?? '')}
                  status={String(a.status ?? '')}
                  kind="Ledger"
                  vulnerable={a.status === 'unversioned'}
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
