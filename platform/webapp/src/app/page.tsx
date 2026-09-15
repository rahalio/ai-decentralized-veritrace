import Link from 'next/link';

const roles = [
  {
    href: '/ops',
    title: 'Privacy ops',
    blurb: 'Spaces, necessity decisions, adapters, tamper, DPIA',
  },
  {
    href: '/research',
    title: 'Researcher',
    blurb: 'Access requests, verification, ethics-ready exports',
  },
  {
    href: '/learner',
    title: 'Learner',
    blurb: 'LBR linkage, consents, deletion — no wallet jargon',
  },
  {
    href: '/teacher',
    title: 'Teacher',
    blurb: 'Space research opt-in without raw telemetry',
  },
] as const;

export default function HomePage() {
  return (
    <div className="animate-fadeUp space-y-10">
      <header className="max-w-xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-seal">
          Verification seal
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          Veritrace
        </h1>
        <p className="text-base text-ink-muted">
          Your traces, your repository — integrity without custody.
        </p>
        <Link
          href="/login"
          className="inline-flex rounded-md bg-seal px-4 py-2 text-sm font-semibold text-surface transition hover:bg-seal/90"
        >
          Sign in
        </Link>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-stone">
          Role homes
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {roles.map((role) => (
            <li key={role.href}>
              <Link
                href={role.href}
                className="block rounded-md border border-ink/10 bg-surface-raised/60 px-4 py-3 transition hover:border-seal/40 hover:bg-surface-raised"
              >
                <span className="font-display text-lg text-ink">{role.title}</span>
                <p className="mt-1 text-sm text-ink-muted">{role.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
