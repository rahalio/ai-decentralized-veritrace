'use client';

import { useEffect, useState } from 'react';
import { asItems, formatProblem } from '@/services/shared/http';
import { unwrapDataEnvelope } from '@/services/shared/contracts';

export function useSafeList<T extends Record<string, unknown> = Record<string, unknown>>(
  loader: () => Promise<unknown>,
  deps: unknown[] = [],
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loader()
      .then((raw) => {
        if (cancelled) return;
        const data = unwrapDataEnvelope(raw);
        setItems(asItems(data) as T[]);
      })
      .catch((err) => {
        if (cancelled) return;
        setItems([]);
        setError(formatProblem(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { items, loading, error, setItems, setError, setLoading };
}

export function useSafeEntity<T = Record<string, unknown>>(
  loader: () => Promise<unknown>,
  deps: unknown[] = [],
) {
  const [entity, setEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loader()
      .then((raw) => {
        if (cancelled) return;
        setEntity(unwrapDataEnvelope(raw) as T);
      })
      .catch((err) => {
        if (cancelled) return;
        setEntity(null);
        setError(formatProblem(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { entity, loading, error, setEntity, setError };
}
