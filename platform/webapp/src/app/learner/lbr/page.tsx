'use client';

import { LbrLinkCard } from '@/components/lbr-link-card';
import { ErrorBanner, PageHeader } from '@/components/ui';
import { useSafeEntity } from '@/components/use-safe-load';
import { adaptersFacade } from '@/services/domains/adapters';
import { StatusPill } from '@/components/ui';

const LEARNER_ID = 'learner_demo';

export default function LearnerLbrPage() {
  const linkage = useSafeEntity<{
    status?: string;
    lbrEndpointId?: string;
    platformCustodyNoticeAck?: boolean;
  }>(() => adaptersFacade.getLbrLinkage(LEARNER_ID), []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="LBR linkage"
        description="Designate an external Learning Block Repository. Platform custody of raw traces is off by default."
      />

      {linkage.error ? (
        <ErrorBanner message={linkage.error} />
      ) : linkage.entity ? (
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill
            label={String(linkage.entity.status ?? 'unknown')}
            tone={
              linkage.entity.status === 'linked' ? 'seal' : 'amber'
            }
          />
          <span className="font-mono text-xs text-ink-muted">
            {String(linkage.entity.lbrEndpointId ?? '')}
          </span>
        </div>
      ) : null}

      <LbrLinkCard learnerId={LEARNER_ID} />
    </div>
  );
}
