'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import {
  EmptyState,
  ErrorBanner,
  FieldInput,
  FieldLabel,
  PageHeader,
  Panel,
  PrimaryButton,
  StatusPill,
} from '@/components/ui';
import { useSafeList } from '@/components/use-safe-load';
import { spacesFacade } from '@/services/domains/spaces';
import { asItems, formatProblem } from '@/services/shared/http';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

export default function OpsSpacesPage() {
  const { items, loading, error, setItems } = useSafeList(
    () => spacesFacade.listSpaces(),
    [],
  );
  const [name, setName] = useState('');
  const [externalRef, setExternalRef] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setBusy(true);
    try {
      await spacesFacade.createSpace({
        name: name.trim(),
        externalSpaceRef: externalRef.trim() || undefined,
        researchCollectionEnabled: false,
      });
      setName('');
      setExternalRef('');
      const refreshed = await spacesFacade.listSpaces();
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
        title="Learning spaces"
        description="Register Graasp-class spaces. Research collection stays off until learners opt in."
      />

      {error ? <ErrorBanner message={error} /> : null}

      <Panel title="Register space">
        <form onSubmit={onRegister} className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <FieldLabel>Name</FieldLabel>
            <FieldInput
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <FieldLabel>External ref</FieldLabel>
            <FieldInput
              value={externalRef}
              onChange={(e) => setExternalRef(e.target.value)}
              placeholder="graasp:…"
            />
          </label>
          {formError ? (
            <div className="sm:col-span-2">
              <ErrorBanner message={formError} />
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={busy}>
              {busy ? 'Registering…' : 'Register space'}
            </PrimaryButton>
          </div>
        </form>
      </Panel>

      <Panel title="Registry">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <EmptyState
            title="No spaces yet"
            description="Connect the first learning-space integration to begin."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[10px] uppercase tracking-[0.14em] text-stone">
                <tr>
                  <th className="pb-2 font-semibold">Name</th>
                  <th className="pb-2 font-semibold">Research</th>
                  <th className="pb-2 font-semibold">Necessity</th>
                  <th className="pb-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {items.map((s) => {
                  const id = String(s.spaceId ?? '');
                  return (
                    <tr key={id} className="border-t border-ink/10">
                      <td className="py-2.5 text-ink">
                        {String(s.name ?? id)}
                      </td>
                      <td className="py-2.5">
                        <StatusPill
                          label={
                            s.researchCollectionEnabled
                              ? 'Enabled'
                              : 'Off'
                          }
                          tone={
                            s.researchCollectionEnabled ? 'seal' : 'stone'
                          }
                        />
                      </td>
                      <td className="py-2.5">
                        <StatusPill
                          label={
                            s.latestNecessityDecisionId
                              ? 'Recorded'
                              : 'Missing'
                          }
                          tone={
                            s.latestNecessityDecisionId ? 'seal' : 'amber'
                          }
                        />
                      </td>
                      <td className="py-2.5 text-right">
                        <Link
                          href={`/ops/spaces/${id}`}
                          className="text-seal hover:underline"
                        >
                          Open
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
