/**
 * Consents Domain Facade — unique method names (codegen duplicates collapse in JS).
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

export const consentsFacade = {
  async listConsents(params?: Record<string, unknown>, signal?: AbortSignal) {
    const response = await apiClient.get<unknown>(`/v1/consents${qs(params)}`, {
      signal,
    });
    return response.data;
  },

  async createConsent(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/consents`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getConsent(
    consentId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/consents/${consentId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async revokeConsent(consentId: string, data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(
      `/v1/consents/${consentId}/revoke`,
      { body: data, signal },
    );
    return response.data;
  },

  async listAccessRequests(
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/access-requests${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async createAccessRequest(data?: unknown, signal?: AbortSignal) {
    const response = await apiClient.post<unknown>(`/v1/access-requests`, {
      body: data,
      signal,
    });
    return response.data;
  },

  async getAccessRequest(
    accessRequestId: string,
    params?: Record<string, unknown>,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<unknown>(
      `/v1/access-requests/${accessRequestId}${qs(params)}`,
      { signal },
    );
    return response.data;
  },

  async decideAccessRequest(
    accessRequestId: string,
    data?: unknown,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.post<unknown>(
      `/v1/access-requests/${accessRequestId}/decide`,
      { body: data, signal },
    );
    return response.data;
  },
};
