// @ts-nocheck
/**
 * Spaces Service
 *
 * API client for spaces domain.
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
// import type { ... } from "./spaces.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawSpacesService = {
  /**
   * List learning spaces
   */
  async getSpace(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/spaces` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Register a learning space
   */
  async createSpace(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/spaces`;

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
   * Get learning space by id
   */
  async getSpace(spaceId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/spaces/${spaceId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * List necessity decisions for a space
   */
  async getNecessityDecision(spaceId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/spaces/${spaceId}/necessity-decisions` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Record a blockchain necessity decision
   */
  async getNecessityDecision(spaceId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/spaces/${spaceId}/necessity-decisions`;

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
   * Get necessity decision by id
   */
  async getNecessityDecision(spaceId: string, necessityDecisionId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/spaces/${spaceId}/necessity-decisions/${necessityDecisionId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Get DPIA evidence pack for a space
   */
  async getDpiaEvidence(spaceId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/spaces/${spaceId}/dpia-evidence` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
  }
};

// Wrap service with error handling and logging
export const spacesService = makeService(rawSpacesService, "spaces");
