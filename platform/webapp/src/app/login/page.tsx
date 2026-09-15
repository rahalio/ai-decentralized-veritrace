'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { formatProblem } from '@/services/shared/http';

const DEMO_API_KEY = 'veritrace_demo_local_dev_key';

export default function LoginPage() {
  const { signInWithPassword, signInWithApiKey } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      try {
        await signInWithPassword(email, password);
      } catch (passwordErr) {
        const key =
          apiKey.trim() ||
          (password.trim() === DEMO_API_KEY ? DEMO_API_KEY : '');
        if (key === DEMO_API_KEY || key) {
          await signInWithApiKey(key || DEMO_API_KEY, 'local-demo');
        } else {
          throw passwordErr;
        }
      }
      router.replace('/');
    } catch (err) {
      setError(
        `${formatProblem(err)} — for local demo, use API key ${DEMO_API_KEY}`,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-surface-sunken lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(63,166,122,0.28),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(184,197,192,0.08),transparent_40%)]" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="font-display text-5xl font-semibold tracking-tight text-ink">
            Veritrace
          </p>
          <p className="mt-4 max-w-md font-display text-2xl text-brand">
            Your traces, your repository
          </p>
          <p className="mt-3 max-w-md text-sm text-ink-muted">
            Integrity without custody — sealed commitments, learner-owned
            blocks.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center px-6 py-12"
      >
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-5">
          <div>
            <p className="mb-2 font-display text-3xl text-ink lg:hidden">
              Veritrace
            </p>
            <h1 className="font-display text-3xl text-ink lg:hidden">
              Your traces, your repository
            </h1>
            <h1 className="hidden font-display text-3xl text-ink lg:block">
              Enter Veritrace
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              One path in — no wallet or gas literacy required.
            </p>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-md border border-tamper/40 bg-tamper/10 px-3 py-2 text-sm text-ink"
            >
              {error}
            </div>
          ) : null}

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-stone">
              Email
            </span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-seal focus:ring-1 focus:ring-seal"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-stone">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-seal focus:ring-1 focus:ring-seal"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-stone">
              Demo API key (fallback)
            </span>
            <input
              type="text"
              autoComplete="off"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={DEMO_API_KEY}
              className="w-full rounded-md border border-ink/15 bg-surface-raised px-3 py-2 font-mono text-sm text-ink outline-none focus:border-seal focus:ring-1 focus:ring-seal"
            />
          </label>

          <button
            type="submit"
            disabled={busy || (!email && !apiKey && password !== DEMO_API_KEY)}
            className="w-full rounded-md bg-seal px-4 py-2.5 text-sm font-semibold text-surface transition hover:bg-seal/90 disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Enter Veritrace'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
