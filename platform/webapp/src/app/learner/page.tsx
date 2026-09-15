'use client';

import Link from 'next/link';
import { PageHeader, Panel } from '@/components/ui';

const links = [
  {
    href: '/learner/lbr',
    title: 'LBR linkage',
    blurb: 'Choose where your activity traces live — managed or self-hosted.',
  },
  {
    href: '/learner/consents',
    title: 'My consents',
    blurb: 'Approve, deny, or revoke research access for a stated purpose.',
  },
  {
    href: '/learner/delete',
    title: 'Deletion requests',
    blurb: 'Ask your repository to delete raw blocks after withdrawal.',
  },
] as const;

export default function LearnerHomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Learner home"
        description="Your traces stay in your repository. Veritrace never asks you to learn wallets or gas."
      />

      <Panel>
        <ul className="grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-md border border-ink/10 bg-surface-sunken/40 px-3 py-3 transition hover:border-seal/40"
              >
                <p className="font-display text-lg text-ink">{l.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{l.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
