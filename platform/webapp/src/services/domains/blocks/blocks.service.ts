// @ts-nocheck
/**
 * Blocks Service
 *
 * API client for blocks domain.
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
// import type { ... } from "./blocks.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawBlocksService = {
  /**
   * List learning block metadata
   */
  async getBlock(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/blocks` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Emit a signed learning block
   */
  async getBlock(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/blocks`;

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
   * Get learning block metadata
   */
  async getBlock(blockId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/blocks/${blockId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Request deletion of a block from the learner LBR
   */
  async createDeletionRequest(blockId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/blocks/${blockId}/deletion-requests`;

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
   * List deletion requests
   */
  async getDeletionRequest(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/deletion-requests` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Get deletion request by id
   */
  async getDeletionRequest(deletionRequestId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/deletion-requests/${deletionRequestId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
export const blocksService = makeService(rawBlocksService, "blocks");
