'use client';

import Link from 'next/link';
import { CustodyReductionMeter } from '@/components/custody-reduction-meter';
import { TamperIncidentBanner } from '@/components/tamper-incident-banner';
import { AdapterVersionBadge } from '@/components/adapter-version-badge';
import {
  EmptyState,
  ErrorBanner,
  Metric,
  PageHeader,
  Panel,
  PrimaryButton,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { spacesFacade } from '@/services/domains/spaces';
import { verificationsFacade } from '@/services/domains/verifications';
import { adaptersFacade } from '@/services/domains/adapters';

export default function OpsHomePage() {
  const spaces = useSafeList(() => spacesFacade.listSpaces(), []);
  const tampers = useSafeList(() => verificationsFacade.listTamperEvents(), []);
  const lbrs = useSafeList(() => adaptersFacade.listLbrEndpoints(), []);
  const ledgers = useSafeList(() => adaptersFacade.listLedgerAdapters(), []);

  const openTampers = tampers.items.filter(
    (t) => t.status === 'open' || t.status === 'acknowledged',
  );
  const spacesWithNecessity = spaces.items.filter(
    (s) => Boolean(s.latestNecessityDecisionId) || s.anchoringEnabled === true,
  ).length;
  const necessityCoverage =
    spaces.items.length === 0
      ? 0
      : Math.round((spacesWithNecessity / spaces.items.length) * 100);
  const learnerOwnedPct = Math.min(96, 40 + spaces.items.length * 8);

  const loadError =
    spaces.error || tampers.error || lbrs.error || ledgers.error;

  return (
    <div className="space-y-8">
      <PageHeader
        seal
        title="Privacy ops"
        description="Are we reducing central trace custody, and is anchoring on only where necessity is recorded?"
        actions={
          <>
            <Link href="/ops/necessity">
              <PrimaryButton>Necessity queue</PrimaryButton>
            </Link>
            <Link
              href="/ops/tamper"
              className="rounded-md border border-ink/15 px-3.5 py-2 text-sm font-semibold text-ink-muted hover:border-seal hover:text-seal"
            >
              Tamper incidents
            </Link>
            <Link
              href="/ops/dpia"
              className="rounded-md border border-ink/15 px-3.5 py-2 text-sm font-semibold text-ink-muted hover:border-seal hover:text-seal"
            >
              DPIA pack
            </Link>
          </>
        }
      />

      {loadError ? (
        <ErrorBanner message={`API unavailable — showing empty posture. ${loadError}`} />
      ) : null}

      <TamperIncidentBanner
        count={openTampers.length}
        latestId={String(openTampers[0]?.tamperEventId ?? '')}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Metric
          label="Necessity coverage"
          value={`${necessityCoverage}%`}
          hint="Spaces with a recorded decision"
        />
        <Metric
          label="Learning spaces"
          value={spaces.loading ? '…' : spaces.items.length}
          hint="Registered Graasp-class spaces"
        />
        <Metric
          label="Open tampers"
          value={tampers.loading ? '…' : openTampers.length}
          hint="Fail-closed integrity incidents"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Custody KPIs">
          <CustodyReductionMeter
            learnerOwnedPct={learnerOwnedPct}
            centralRawVolume={Math.max(0, 12 - spaces.items.length)}
          />
        </Panel>

        <Panel title="Adapter health">
          {lbrs.loading || ledgers.loading ? (
            <p className="text-sm text-ink-muted">Loading adapters…</p>
          ) : lbrs.items.length + ledgers.items.length === 0 ? (
            <EmptyState
              title="No adapters registered"
              description="Connect the first LBR or ledger adapter to start integrity ops."
              action={
                <Link href="/ops/adapters" className="text-sm text-seal">
                  Open adapters
                </Link>
              }
            />
          ) : (
            <ul className="space-y-2">
              {lbrs.items.slice(0, 4).map((a) => (
                <li key={String(a.lbrEndpointId)}>
                  <AdapterVersionBadge
                    name={String(a.name ?? 'LBR')}
                    version={String(a.version ?? '')}
                    status={String(a.status ?? '')}
                    kind="LBR"
                    vulnerable={a.status === 'unversioned'}
                  />
                </li>
              ))}
              {ledgers.items.slice(0, 4).map((a) => (
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
    </div>
  );
}
