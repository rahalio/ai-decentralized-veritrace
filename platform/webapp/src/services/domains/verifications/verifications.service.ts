// @ts-nocheck
/**
 * Verifications Service
 *
 * API client for verifications domain.
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
// import type { ... } from "./verifications.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawVerificationsService = {
  /**
   * List verification results
   */
  async getVerification(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/verifications` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Verify a learning block on retrieval
   */
  async getVerification(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/verifications`;

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
   * Get verification result by id
   */
  async getVerification(verificationId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/verifications/${verificationId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * List tamper incidents
   */
  async getTamperEvent(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/tamper-events` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Get tamper event by id
   */
  async getTamperEvent(tamperEventId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/tamper-events/${tamperEventId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Acknowledge a tamper incident
   */
  async getAcknowledge(tamperEventId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/tamper-events/${tamperEventId}/acknowledge`;

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
export const verificationsService = makeService(rawVerificationsService, "verifications");
