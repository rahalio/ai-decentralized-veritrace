// @ts-nocheck
/**
 * Blocks Query Hooks
 *
 * React Query hooks for fetching blocks data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { blocksService } from "../blocks.service";

/**
 * Hook to list learning block metadata
 *
 * Query key: ["blocks", "Block", ]
 */
export function useBlock(params?: Record<string, any>) {
  return useTenantQuery(
    ["blocks", "Block", ],
    async (orgId: string, signal?: AbortSignal) => {
      return blocksService.getBlock(params, signal);
    }
  );
}

/**
 * Hook to get learning block metadata
 *
 * Query key: ["blocks", "Block", blockId]
 */
export function useBlock(blockId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["blocks", "Block", blockId],
    async (orgId: string, signal?: AbortSignal) => {
      return blocksService.getBlock(blockId, params, signal);
    },
    {
      enabled: !!blockId
    }
  );
}

/**
 * Hook to list deletion requests
 *
 * Query key: ["blocks", "DeletionRequest", ]
 */
export function useDeletionRequest(params?: Record<string, any>) {
  return useTenantQuery(
    ["blocks", "DeletionRequest", ],
    async (orgId: string, signal?: AbortSignal) => {
      return blocksService.getDeletionRequest(params, signal);
    }
  );
}

/**
 * Hook to get deletion request by id
 *
 * Query key: ["blocks", "DeletionRequest", deletionRequestId]
 */
export function useDeletionRequest(deletionRequestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["blocks", "DeletionRequest", deletionRequestId],
    async (orgId: string, signal?: AbortSignal) => {
      return blocksService.getDeletionRequest(deletionRequestId, params, signal);
    },
    {
      enabled: !!deletionRequestId
    }
  );
}
