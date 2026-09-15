/**
 * Adapters Domain Facade — unique method names (codegen duplicates collapse in JS).
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

export const adaptersFacade = {
  async listLbrEndpoints(
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/lbr-endpoints${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async createLbrEndpoint(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/lbr-endpoints`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getLbrEndpoint(
    lbrEndpointId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/lbr-endpoints/${lbrEndpointId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async updateLbrEndpoint(
    lbrEndpointId: string,
    data?: unknown,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.patch<unknown>(
      `/v1/lbr-endpoints/${lbrEndpointId}`,
      { body: data, signal },
    );
    return response.data;
  },

  async listLedgerAdapters(
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/ledger-adapters${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async createLedgerAdapter(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/ledger-adapters`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getLedgerAdapter(
    ledgerAdapterId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/ledger-adapters/${ledgerAdapterId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async getLbrLinkage(
    learnerId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/learners/${learnerId}/lbr-linkage${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async updateLbrLinkage(
    learnerId: string,
    data?: unknown,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.post<unknown>(
      `/v1/learners/${learnerId}/lbr-linkage`,
      { body: data, signal },
    );
    return response.data;
  },
};
