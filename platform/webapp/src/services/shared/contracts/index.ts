import type { ZodTypeAny } from 'zod';

export function validateApiResponse<T>(data: T): T {
  return data;
}

export function formatValidationError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Validation failed';
}

export function validateWithSchema<T>(
  schema: ZodTypeAny,
  data: unknown,
): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new Error(formatValidationError(parsed.error));
  }
  return parsed.data as T;
}

export function unwrapDataEnvelope<T>(payload: { data?: T } | T): T {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    (payload as { data?: T }).data !== undefined
  ) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}
