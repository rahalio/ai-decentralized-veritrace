/**
 * Blocks Domain Facade — unique method names (codegen duplicates collapse in JS).
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

export const blocksFacade = {
  async listBlocks(params?: Record<string, unknown>, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/blocks${qs(params)}`, {
      signal,
    });
    return response.data;
  },

  async createBlock(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/blocks`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getBlock(
    blockId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/blocks/${blockId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async createDeletionRequest(
    blockId: string,
    data?: unknown,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.post<unknown>(
      `/v1/blocks/${blockId}/deletion-requests`,
      { body: data, signal },
    );
    return response.data;
  },

  async listDeletionRequests(
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/deletion-requests${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async getDeletionRequest(
    deletionRequestId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/deletion-requests/${deletionRequestId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },
};
