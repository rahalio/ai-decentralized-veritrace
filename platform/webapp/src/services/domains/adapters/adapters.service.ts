// @ts-nocheck
/**
 * Adapters Service
 *
 * API client for adapters domain.
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
// import type { ... } from "./adapters.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawAdaptersService = {
  /**
   * List LBR endpoints
   */
  async getLbrEndpoint(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/lbr-endpoints` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Register an LBR endpoint
   */
  async createLbrEndpoint(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/lbr-endpoints`;

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
   * Get LBR endpoint by id
   */
  async getLbrEndpoint(lbrEndpointId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/lbr-endpoints/${lbrEndpointId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Update an LBR endpoint
   */
  async updateLbrEndpoint(lbrEndpointId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/lbr-endpoints/${lbrEndpointId}`;

    // TODO(client): migrate when generated
    const response = await apiClient.patch<any>(url, {
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
   * List ledger adapters
   */
  async getLedgerAdapter(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/ledger-adapters` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Register a ledger adapter
   */
  async createLedgerAdapter(data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/ledger-adapters`;

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
   * Get ledger adapter by id
   */
  async getLedgerAdapter(ledgerAdapterId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/ledger-adapters/${ledgerAdapterId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Get learner LBR linkage
   */
  async getLbrLinkage(learnerId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const url = `/v1/learners/${learnerId}/lbr-linkage` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Set or replace learner LBR linkage
   */
  async updateLbrLinkage(learnerId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const url = `/v1/learners/${learnerId}/lbr-linkage`;

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
export const adaptersService = makeService(rawAdaptersService, "adapters");
