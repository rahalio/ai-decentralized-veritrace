'use client';

import { StatusPill } from '@/components/ui';

type Health =
  | 'healthy'
  | 'degraded'
  | 'down'
  | 'disabled'
  | 'unversioned'
  | string;

function toneFor(status?: Health, vulnerable?: boolean) {
  if (vulnerable) return 'tamper' as const;
  if (status === 'healthy') return 'seal' as const;
  if (status === 'degraded' || status === 'unversioned') return 'amber' as const;
  if (status === 'down' || status === 'disabled') return 'tamper' as const;
  return 'stone' as const;
}

export function AdapterVersionBadge({
  name,
  version,
  status,
  kind,
  vulnerable,
}: {
  name?: string;
  version?: string;
  status?: Health;
  kind?: string;
  vulnerable?: boolean;
}) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-md border border-ink/10 bg-surface-sunken/50 px-2.5 py-1.5">
      <span className="text-sm font-medium text-ink">
        {name || kind || 'Adapter'}
      </span>
      <span className="font-mono text-xs text-ink-muted">
        v{version || '—'}
      </span>
      {status ? (
        <StatusPill label={status} tone={toneFor(status, vulnerable)} />
      ) : null}
      {vulnerable ? <StatusPill label="Patch needed" tone="tamper" /> : null}
    </div>
  );
}
