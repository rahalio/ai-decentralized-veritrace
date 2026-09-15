'use client';

import { motion } from 'framer-motion';
import { StatusPill } from '@/components/ui';

type ConsentStatus = 'active' | 'revoked' | 'expired' | 'pending' | string;

function toneFor(status: ConsentStatus) {
  if (status === 'active') return 'seal' as const;
  if (status === 'pending') return 'amber' as const;
  if (status === 'revoked' || status === 'expired') return 'stone' as const;
  return 'ink' as const;
}

export function ConsentGrantChip({
  purpose,
  expiresAt,
  status,
  studyId,
}: {
  purpose: string;
  expiresAt?: string;
  status: ConsentStatus;
  studyId?: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="flex flex-wrap items-center gap-2 rounded-md border border-ink/10 bg-surface-sunken/40 px-3 py-2"
    >
      <StatusPill label={status} tone={toneFor(status)} />
      <span className="text-sm text-ink">{purpose}</span>
      {studyId ? (
        <span className="font-mono text-xs text-ink-muted">{studyId}</span>
      ) : null}
      {expiresAt ? (
        <span className="text-xs text-stone">
          until {new Date(expiresAt).toLocaleDateString()}
        </span>
      ) : null}
    </motion.div>
  );
}
