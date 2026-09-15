'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import { useAuth } from '@/contexts/auth-context';

const NAV_SECTIONS = [
  {
    label: 'Privacy ops',
    items: [
      { href: '/ops', label: 'Ops home' },
      { href: '/ops/spaces', label: 'Learning spaces' },
      { href: '/ops/necessity', label: 'Necessity decisions' },
      { href: '/ops/adapters', label: 'LBR & ledger adapters' },
      { href: '/ops/tamper', label: 'Tamper incidents' },
      { href: '/ops/dpia', label: 'DPIA evidence' },
    ],
  },
  {
    label: 'Research',
    items: [
      { href: '/research', label: 'Researcher home' },
      { href: '/research/requests', label: 'Access requests' },
      { href: '/research/verify', label: 'Verification' },
      { href: '/research/exports', label: 'Research exports' },
    ],
  },
  {
    label: 'Learner',
    items: [
      { href: '/learner', label: 'Learner home' },
      { href: '/learner/lbr', label: 'LBR linkage' },
      { href: '/learner/consents', label: 'My consents' },
      { href: '/learner/delete', label: 'Deletion requests' },
    ],
  },
  {
    label: 'Teacher',
    items: [
      { href: '/teacher', label: 'Teacher space' },
      { href: '/teacher/opt-in', label: 'Research opt-in' },
    ],
  },
] as const;

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-seal/50 bg-seal-soft text-[10px] font-bold uppercase tracking-wide text-seal"
      >
        Vt
      </span>
      <span className="font-display text-lg tracking-tight text-ink">
        Veritrace
      </span>
    </Link>
  );
}

function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-6 px-4 pb-6" aria-label="Primary">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
            {section.label}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block rounded-md px-2 py-1.5 text-sm transition',
                      active
                        ? 'bg-seal-soft text-seal'
                        : 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { ready, authenticated, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!authenticated && pathname !== '/login' && pathname !== '/') {
      router.replace('/login');
    }
  }, [ready, authenticated, pathname, router]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center text-ink-muted">
        Loading…
      </div>
    );
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface-raised focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <div className="relative z-10 flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col overflow-y-auto border-e border-ink/10 bg-surface-raised/70 lg:flex">
          <div className="px-5 py-4">
            <Brand />
          </div>
          <SideNav />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface-raised/90 backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="lg:hidden">
                <Brand />
              </div>
              <div className="ml-auto flex items-center gap-2">
                {authenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      router.replace('/login');
                    }}
                    className="rounded-md border border-ink/15 px-2.5 py-1 text-xs font-semibold text-ink-muted hover:border-seal hover:text-seal"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-md border border-ink/15 px-2.5 py-1 text-xs font-semibold text-ink-muted hover:border-seal hover:text-seal"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </header>

          <main
            id="main"
            className="mx-auto w-full max-w-5xl animate-fadeUp px-4 py-8"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
