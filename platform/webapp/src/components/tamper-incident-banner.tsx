'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { StatusPill } from '@/components/ui';

export function TamperIncidentBanner({
  count = 0,
  latestId,
  message,
}: {
  count?: number;
  latestId?: string;
  message?: string;
}) {
  if (count <= 0 && !message) return null;

  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: 'easeInOut' }}
      className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-tamper/50 bg-tamper/15 px-4 py-3"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <StatusPill label="Tamper" tone="tamper" />
          <p className="font-display text-base text-ink">
            {message ??
              `${count} open integrity incident${count === 1 ? '' : 's'}`}
          </p>
        </div>
        {latestId ? (
          <p className="font-mono text-xs text-ink-muted">{latestId}</p>
        ) : null}
      </div>
      <Link
        href="/ops/tamper"
        className="rounded-md border border-tamper/40 px-3 py-1.5 text-sm font-semibold text-ink hover:bg-tamper/20"
      >
        Open queue
      </Link>
    </motion.div>
  );
}
