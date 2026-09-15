'use client';

import { FormEvent, useMemo, useState } from 'react';
import { spacesFacade } from '@/services/domains/spaces';
import { formatProblem } from '@/services/shared/http';
import {
  ErrorBanner,
  FieldLabel,
  FieldTextarea,
  Panel,
  PrimaryButton,
  SecondaryButton,
  StatusPill,
} from '@/components/ui';

type Outcome = 'permissioned' | 'permissionless' | 'no_chain';

function deriveOutcome(criteria: {
  sharedStateRequired: boolean;
  multipleWriters: boolean;
  trustedThirdPartyAvailable: boolean;
  writersKnownInAdvance: boolean;
  useBlockchain: boolean;
}): Outcome {
  if (!criteria.useBlockchain) return 'no_chain';
  if (criteria.writersKnownInAdvance && !criteria.trustedThirdPartyAvailable) {
    return 'permissioned';
  }
  return 'permissionless';
}

export function NecessityDecisionForm({
  spaceId,
  onRecorded,
}: {
  spaceId: string;
  onRecorded?: () => void;
}) {
  const [sharedStateRequired, setSharedStateRequired] = useState(false);
  const [multipleWriters, setMultipleWriters] = useState(false);
  const [trustedThirdPartyAvailable, setTrustedThirdPartyAvailable] =
    useState(true);
  const [writersKnownInAdvance, setWritersKnownInAdvance] = useState(true);
  const [feeLatencyAccepted, setFeeLatencyAccepted] = useState(false);
  const [useBlockchain, setUseBlockchain] = useState(false);
  const [rationale, setRationale] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const outcome = useMemo(
    () =>
      deriveOutcome({
        sharedStateRequired,
        multipleWriters,
        trustedThirdPartyAvailable,
        writersKnownInAdvance,
        useBlockchain,
      }),
    [
      sharedStateRequired,
      multipleWriters,
      trustedThirdPartyAvailable,
      writersKnownInAdvance,
      useBlockchain,
    ],
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setBusy(true);
    try {
      await spacesFacade.createNecessityDecision(spaceId, {
        useBlockchain,
        outcome,
        feeLatencyAccepted: useBlockchain ? feeLatencyAccepted : true,
        rationale: rationale.trim() || 'Recorded via Veritrace necessity form',
        criteria: {
          sharedStateRequired,
          multipleWriters,
          trustedThirdPartyAvailable,
          writersKnownInAdvance,
        },
      });
      setOk(true);
      onRecorded?.();
    } catch (err) {
      setError(formatProblem(err));
    } finally {
      setBusy(false);
    }
  }

  const checks: { label: string; value: boolean; set: (v: boolean) => void }[] =
    [
      {
        label: 'Shared state required across parties?',
        value: sharedStateRequired,
        set: setSharedStateRequired,
      },
      {
        label: 'Multiple writers to the record?',
        value: multipleWriters,
        set: setMultipleWriters,
      },
      {
        label: 'Trusted third party available?',
        value: trustedThirdPartyAvailable,
        set: setTrustedThirdPartyAvailable,
      },
      {
        label: 'Writers known in advance?',
        value: writersKnownInAdvance,
        set: setWritersKnownInAdvance,
      },
    ];

  return (
    <Panel title="Blockchain necessity decision">
      <form onSubmit={onSubmit} className="space-y-5">
        <p className="text-sm text-ink-muted">
          Wüst–Gervais checklist — record before enabling any chain anchor for
          this space.
        </p>

        <ul className="space-y-3">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start justify-between gap-3">
              <span className="text-sm text-ink">{c.label}</span>
              <button
                type="button"
                onClick={() => c.set(!c.value)}
                className="shrink-0"
                aria-pressed={c.value}
              >
                <StatusPill
                  label={c.value ? 'Yes' : 'No'}
                  tone={c.value ? 'seal' : 'stone'}
                />
              </button>
            </li>
          ))}
        </ul>

        <label className="flex items-center justify-between gap-3">
          <span className="text-sm text-ink">Use blockchain anchoring?</span>
          <button
            type="button"
            onClick={() => setUseBlockchain(!useBlockchain)}
            aria-pressed={useBlockchain}
          >
            <StatusPill
              label={useBlockchain ? 'On' : 'Skip / no chain'}
              tone={useBlockchain ? 'amber' : 'stone'}
            />
          </button>
        </label>

        {useBlockchain ? (
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm text-ink">
              Accept fee / latency trade-offs?
            </span>
            <button
              type="button"
              onClick={() => setFeeLatencyAccepted(!feeLatencyAccepted)}
              aria-pressed={feeLatencyAccepted}
            >
              <StatusPill
                label={feeLatencyAccepted ? 'Accepted' : 'Not accepted'}
                tone={feeLatencyAccepted ? 'seal' : 'amber'}
              />
            </button>
          </label>
        ) : null}

        <div className="flex items-center gap-2 text-sm">
          <span className="text-ink-muted">Derived outcome</span>
          <StatusPill
            label={outcome.replace('_', ' ')}
            tone={outcome === 'no_chain' ? 'stone' : 'amber'}
          />
        </div>

        <label className="block space-y-1.5">
          <FieldLabel>Rationale</FieldLabel>
          <FieldTextarea
            required
            rows={3}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Why this posture — or why skip anchoring"
          />
        </label>

        {error ? <ErrorBanner message={error} /> : null}
        {ok ? (
          <p className="text-sm text-seal" role="status">
            Decision recorded.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <PrimaryButton type="submit" disabled={busy || !spaceId}>
            {busy ? 'Recording…' : 'Record decision'}
          </PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={() => {
              setUseBlockchain(false);
              setFeeLatencyAccepted(false);
              setRationale('Explicit skip — no chain for this space.');
            }}
          >
            Disable anchoring
          </SecondaryButton>
        </div>
      </form>
    </Panel>
  );
}
