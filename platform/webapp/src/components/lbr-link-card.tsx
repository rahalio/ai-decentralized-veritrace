'use client';

import { FormEvent, useState } from 'react';
import { adaptersFacade } from '@/services/domains/adapters';
import { formatProblem } from '@/services/shared/http';
import {
  ErrorBanner,
  FieldLabel,
  FieldInput,
  FieldSelect,
  Panel,
  PrimaryButton,
  StatusPill,
} from '@/components/ui';

type LinkageKind = 'managed' | 'self_hosted';

export function LbrLinkCard({
  learnerId = 'learner_demo',
  onLinked,
}: {
  learnerId?: string;
  onLinked?: () => void;
}) {
  const [kind, setKind] = useState<LinkageKind>('managed');
  const [endpointId, setEndpointId] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      let lbrEndpointId = endpointId.trim();
      if (kind === 'managed' && !lbrEndpointId) {
        const created = (await adaptersFacade.createLbrEndpoint({
          name: 'Managed learner LBR',
          baseUrl: 'https://lbr.veritrace.local',
          kind: 'managed',
          version: '1.0.0',
        })) as { data?: { lbrEndpointId?: string }; lbrEndpointId?: string };
        lbrEndpointId =
          created?.data?.lbrEndpointId ?? created?.lbrEndpointId ?? '';
      }
      if (!lbrEndpointId) {
        throw new Error('Choose or create an LBR endpoint first');
      }
      await adaptersFacade.updateLbrLinkage(learnerId, {
        lbrEndpointId,
        platformCustodyNoticeAck: true,
        runConnectionTest: true,
      });
      setStatus('linked');
      onLinked?.();
    } catch (err) {
      setError(formatProblem(err));
      setStatus(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel title="Where your activity traces live">
      <form onSubmit={onSubmit} className="space-y-4">
        <p className="text-sm text-ink-muted">
          Your Learning Block Repository keeps the raw traces. Veritrace does
          not keep them by default — we only stamp opaque commitments when
          needed.
        </p>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setKind('managed')}>
            <StatusPill
              label="Managed repository"
              tone={kind === 'managed' ? 'seal' : 'stone'}
            />
          </button>
          <button type="button" onClick={() => setKind('self_hosted')}>
            <StatusPill
              label="Self-hosted endpoint"
              tone={kind === 'self_hosted' ? 'seal' : 'stone'}
            />
          </button>
        </div>

        {kind === 'self_hosted' ? (
          <label className="block space-y-1.5">
            <FieldLabel>LBR endpoint id</FieldLabel>
            <FieldInput
              required
              value={endpointId}
              onChange={(e) => setEndpointId(e.target.value)}
              placeholder="lbr_…"
            />
          </label>
        ) : (
          <label className="block space-y-1.5">
            <FieldLabel>Optional existing endpoint id</FieldLabel>
            <FieldInput
              value={endpointId}
              onChange={(e) => setEndpointId(e.target.value)}
              placeholder="Leave blank to register managed path"
            />
          </label>
        )}

        <label className="block space-y-1.5">
          <FieldLabel>Path</FieldLabel>
          <FieldSelect value={kind} onChange={(e) => setKind(e.target.value as LinkageKind)}>
            <option value="managed">Managed — no keys or gas literacy</option>
            <option value="self_hosted">Self-hosted — your endpoint URL</option>
          </FieldSelect>
        </label>

        {error ? <ErrorBanner message={error} /> : null}
        {status ? (
          <p className="text-sm text-seal" role="status">
            Repository linked ({status}).
          </p>
        ) : null}

        <PrimaryButton type="submit" disabled={busy}>
          {busy ? 'Linking…' : 'Link repository'}
        </PrimaryButton>
      </form>
    </Panel>
  );
}
