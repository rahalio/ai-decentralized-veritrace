/**
 * Verifications Domain Facade — unique method names (codegen duplicates collapse in JS).
 */

import { apiClient } from '@/services/shared/infrastructure';

function qs(params?: Record<string, unknown>): string {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    search.set(k, String(v));
  }
  const q = search.toString();
  return q ? `?${q}` : '';
}

export const verificationsFacade = {
  async listVerifications(
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/verifications${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async createVerification(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/verifications`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getVerification(
    verificationId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/verifications/${verificationId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async listTamperEvents(
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/tamper-events${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async getTamperEvent(
    tamperEventId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/tamper-events/${tamperEventId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async acknowledgeTamperEvent(
    tamperEventId: string,
    data?: unknown,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.post<unknown>(
      `/v1/tamper-events/${tamperEventId}/acknowledge`,
      { body: data, signal },
    );
    return response.data;
  },
};
