// @ts-nocheck
/**
 * Consents Service
 *
 * API client for consents domain.
 * Uses ApiResponse<T> pattern - response.data is already T.
 *
 * TODO(client): Migrate all endpoints to typed client when generated.
 * Currently using apiClient.get/post() as temporary fallback.
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { getEffectiveOrgId } from "@/services/shared/infrastructure/tenant-state";
import { validateApiResponse, formatValidationError } from "@/services/shared/contracts";
// TODO: Import schemas from contracts
// import { ... } from "./contracts";
// TODO: Import types from api-types
// import type { ... } from "./consents.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawConsentsService = {
  /**
   * List consent grants
   */
  async getConsent(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/consents` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Create a consent grant
   */
  async createConsent(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/consents`;

    // TODO(client): migrate when generated
    const response = await apiClient.post<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Get consent grant by id
   */
  async getConsent(consentId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/consents/${consentId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Revoke a consent grant
   */
  async getRevoke(consentId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/consents/${consentId}/revoke`;

    // TODO(client): migrate when generated
    const response = await apiClient.post<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * List researcher access requests
   */
  async getAccessRequest(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/access-requests` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Submit a researcher access request
   */
  async createAccessRequest(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/access-requests`;

    // TODO(client): migrate when generated
    const response = await apiClient.post<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Get access request by id
   */
  async getAccessRequest(accessRequestId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/access-requests/${accessRequestId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Approve or deny an access request
   */
  async getDecide(accessRequestId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/access-requests/${accessRequestId}/decide`;

    // TODO(client): migrate when generated
    const response = await apiClient.post<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  }
};

// Wrap service with error handling and logging
export const consentsService = makeService(rawConsentsService, "consents");
