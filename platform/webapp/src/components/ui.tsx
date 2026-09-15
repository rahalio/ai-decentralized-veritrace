'use client';

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export function PageHeader({
  title,
  description,
  seal,
  actions,
}: {
  title: string;
  description?: string;
  seal?: boolean;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-2xl space-y-2">
        {seal ? <SealMark size="sm" /> : null}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        'rounded-md border border-ink/10 bg-surface-raised/70 p-4 shadow-[var(--shadow-panel)]',
        className,
      )}
    >
      {title ? (
        <h2 className="mb-3 font-display text-lg text-ink">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

export function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-md border border-ink/10 bg-surface-sunken/50 px-3 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl text-ink">{value}</p>
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

type PillTone = 'seal' | 'amber' | 'tamper' | 'stone' | 'ink';

const pillClasses: Record<PillTone, string> = {
  seal: 'border-seal/40 bg-seal-soft text-seal',
  amber: 'border-amber/40 bg-amber/10 text-amber',
  tamper: 'border-tamper/40 bg-tamper/10 text-tamper',
  stone: 'border-ink/15 bg-surface-sunken text-ink-muted',
  ink: 'border-ink/20 bg-surface-raised text-ink',
};

export function StatusPill({
  label,
  tone = 'stone',
}: {
  label: string;
  tone?: PillTone;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
        pillClasses[tone],
      )}
    >
      {label}
    </span>
  );
}

export function PrimaryButton({
  children,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={clsx(
        'rounded-md bg-seal px-3.5 py-2 text-sm font-semibold text-surface transition hover:bg-seal/90 disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={clsx(
        'rounded-md border border-ink/15 px-3.5 py-2 text-sm font-semibold text-ink-muted transition hover:border-seal hover:text-seal disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-md border border-dashed border-ink/15 px-4 py-8 text-center">
      <p className="font-display text-lg text-ink">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function SealMark({
  size = 'md',
  flash = false,
  label = 'Verified',
}: {
  size?: 'sm' | 'md' | 'lg';
  flash?: boolean;
  label?: string;
}) {
  const dim =
    size === 'sm'
      ? 'h-8 w-8 text-[9px]'
      : size === 'lg'
        ? 'h-14 w-14 text-sm'
        : 'h-10 w-10 text-[11px]';

  return (
    <motion.div
      className="inline-flex items-center gap-2"
      initial={false}
      animate={
        flash
          ? { scale: [1, 1.08, 1], opacity: [1, 0.85, 1] }
          : { scale: 1, opacity: 1 }
      }
      transition={{ duration: 0.18, ease: 'easeOut' }}
      aria-label={label}
    >
      <span
        aria-hidden
        className={clsx(
          'inline-flex items-center justify-center rounded-full border border-seal/50 bg-seal-soft font-bold uppercase tracking-wide text-seal seal-ring',
          dim,
        )}
      >
        Vt
      </span>
      <span className="font-display text-sm tracking-tight text-brand">
        {label}
      </span>
    </motion.div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-tamper/40 bg-tamper/10 px-3 py-2 text-sm text-ink"
    >
      {message}
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-stone">
      {children}
    </span>
  );
}

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        'w-full rounded-md border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-seal focus:ring-1 focus:ring-seal',
        props.className,
      )}
    />
  );
}

export function FieldSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx(
        'w-full rounded-md border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-seal focus:ring-1 focus:ring-seal',
        props.className,
      )}
    />
  );
}

export function FieldTextarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={clsx(
        'w-full rounded-md border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-seal focus:ring-1 focus:ring-seal',
        props.className,
      )}
    />
  );
}
