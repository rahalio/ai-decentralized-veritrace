'use client';

export function CustodyReductionMeter({
  learnerOwnedPct = 0,
  centralRawVolume = 0,
  label = 'Custody reduction',
}: {
  learnerOwnedPct?: number;
  centralRawVolume?: number;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(learnerOwnedPct)));

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
          {label}
        </p>
        <p className="font-display text-xl text-seal">{pct}%</p>
      </div>
      <div
        className="h-2 overflow-hidden rounded-sm bg-surface-sunken"
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Learner-owned block share"
      >
        <div
          className="h-full rounded-sm bg-seal transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-ink-muted">
        Learner-owned blocks {pct}% · central raw volume index {centralRawVolume}
      </p>
    </div>
  );
}
