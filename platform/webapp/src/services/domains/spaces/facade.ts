/**
 * Spaces Domain Facade — unique method names (codegen duplicates collapse in JS).
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

export const spacesFacade = {
  async listSpaces(params?: Record<string, unknown>, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/spaces${qs(params)}`, {
      signal,
    });
    return response.data;
  },

  async createSpace(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/spaces`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getSpace(
    spaceId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/spaces/${spaceId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async listNecessityDecisions(
    spaceId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/spaces/${spaceId}/necessity-decisions${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async createNecessityDecision(
    spaceId: string,
    data?: unknown,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.post<unknown>(
      `/v1/spaces/${spaceId}/necessity-decisions`,
      { body: data, signal },
    );
    return response.data;
  },

  async getNecessityDecision(
    spaceId: string,
    necessityDecisionId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/spaces/${spaceId}/necessity-decisions/${necessityDecisionId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async getDpiaEvidence(
    spaceId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/spaces/${spaceId}/dpia-evidence${qs(params)}`,
      { signal },
    );
    return response.data;
  },
};
