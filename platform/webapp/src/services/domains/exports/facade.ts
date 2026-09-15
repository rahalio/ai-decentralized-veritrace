/**
 * Exports Domain Facade — unique method names (codegen duplicates collapse in JS).
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

export const exportsFacade = {
  async listExports(params?: Record<string, unknown>, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/exports${qs(params)}`, {
      signal,
    });
    return response.data;
  },

  async createExport(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/exports`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getExport(
    exportId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/exports/${exportId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },
};
