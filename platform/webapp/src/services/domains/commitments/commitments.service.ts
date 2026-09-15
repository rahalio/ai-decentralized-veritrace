// @ts-nocheck
/**
 * Commitments Service
 *
 * API client for commitments domain.
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
// import type { ... } from "./commitments.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawCommitmentsService = {
  /**
   * List chain commitments
   */
  async getCommitment(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/commitments` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Anchor an opaque hash commitment
   */
  async getCommitment(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/commitments`;

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
   * Get chain commitment by id
   */
  async getCommitment(commitmentId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/commitments/${commitmentId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
export const commitmentsService = makeService(rawCommitmentsService, "commitments");
