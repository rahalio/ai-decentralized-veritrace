'use client';

import Link from 'next/link';
import { PageHeader, Panel } from '@/components/ui';
import { SealMark } from '@/components/ui';

const steps = [
  {
    href: '/research/requests',
    title: 'Access requests',
    blurb: 'Purpose-limited, time-boxed requests — never fetch without consent.',
  },
  {
    href: '/research/verify',
    title: 'Verification',
    blurb: 'Recompute hashes vs commitments; fail closed on mismatch.',
  },
  {
    href: '/research/exports',
    title: 'Research exports',
    blurb: 'Ethics-ready packages with proofs and consent artefacts.',
  },
] as const;

export default function ResearchHomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        seal
        title="Researcher home"
        description="Request → consent → verify → export. Packages fail closed on integrity mismatch."
      />

      <Panel>
        <SealMark label="Verified, consented, not panoptic" />
        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="block rounded-md border border-ink/10 bg-surface-sunken/40 px-3 py-3 transition hover:border-seal/40"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
                  Step {i + 1}
                </p>
                <p className="mt-1 font-display text-lg text-ink">{step.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{step.blurb}</p>
              </Link>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
