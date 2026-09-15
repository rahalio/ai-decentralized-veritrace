'use client';

import { motion } from 'framer-motion';
import { SealMark, StatusPill } from '@/components/ui';

type VerificationStatus =
  | 'valid'
  | 'mismatch'
  | 'consent_denied'
  | 'lbr_offline'
  | 'no_anchor'
  | string;

function toneFor(status: VerificationStatus) {
  if (status === 'valid') return 'seal' as const;
  if (status === 'mismatch') return 'tamper' as const;
  if (status === 'no_anchor') return 'amber' as const;
  if (status === 'lbr_offline' || status === 'consent_denied')
    return 'stone' as const;
  return 'ink' as const;
}

function labelFor(status: VerificationStatus) {
  switch (status) {
    case 'valid':
      return 'Verified';
    case 'mismatch':
      return 'Tamper suspected';
    case 'no_anchor':
      return 'No anchor — policy skip';
    case 'lbr_offline':
      return 'LBR offline';
    case 'consent_denied':
      return 'Consent denied';
    default:
      return status;
  }
}

export function VerificationResultRow({
  blockId,
  status,
  commitmentId,
  detail,
}: {
  blockId: string;
  status: VerificationStatus;
  commitmentId?: string;
  detail?: string;
}) {
  const flash = status === 'valid';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 py-3 last:border-0"
    >
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          {flash ? <SealMark size="sm" flash label="Verified" /> : null}
          <StatusPill label={labelFor(status)} tone={toneFor(status)} />
        </div>
        <p className="font-mono text-xs text-ink-muted truncate">
          block {blockId}
          {commitmentId ? ` · commitment ${commitmentId}` : ''}
        </p>
        {detail ? <p className="text-xs text-ink-muted">{detail}</p> : null}
      </div>
    </motion.div>
  );
}
