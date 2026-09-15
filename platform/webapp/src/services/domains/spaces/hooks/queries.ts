// @ts-nocheck
/**
 * Spaces Query Hooks
 *
 * React Query hooks for fetching spaces data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { spacesService } from "../spaces.service";

/**
 * Hook to list learning spaces
 *
 * Query key: ["spaces", "Space", ]
 */
export function useSpace(params?: Record<string, any>) {
  return useTenantQuery(
    ["spaces", "Space", ],
    async (orgId: string, signal?: AbortSignal) => {
      return spacesService.getSpace(params, signal);
    }
  );
}

/**
 * Hook to get learning space by id
 *
 * Query key: ["spaces", "Space", spaceId]
 */
export function useSpace(spaceId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["spaces", "Space", spaceId],
    async (orgId: string, signal?: AbortSignal) => {
      return spacesService.getSpace(spaceId, params, signal);
    },
    {
      enabled: !!spaceId
    }
  );
}

/**
 * Hook to list necessity decisions for a space
 *
 * Query key: ["spaces", "NecessityDecision", spaceId]
 */
export function useNecessityDecision(spaceId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["spaces", "NecessityDecision", spaceId],
    async (orgId: string, signal?: AbortSignal) => {
      return spacesService.getNecessityDecision(spaceId, params, signal);
    },
    {
      enabled: !!spaceId
    }
  );
}

/**
 * Hook to get necessity decision by id
 *
 * Query key: ["spaces", "NecessityDecision", spaceId, necessityDecisionId]
 */
export function useNecessityDecision(spaceId: string, necessityDecisionId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["spaces", "NecessityDecision", spaceId, necessityDecisionId],
    async (orgId: string, signal?: AbortSignal) => {
      return spacesService.getNecessityDecision(spaceId, necessityDecisionId, params, signal);
    },
    {
      enabled: !!spaceId && !!necessityDecisionId
    }
  );
}

/**
 * Hook to get dpia evidence pack for a space
 *
 * Query key: ["spaces", "DpiaEvidence", spaceId]
 */
export function useDpiaEvidence(spaceId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["spaces", "DpiaEvidence", spaceId],
    async (orgId: string, signal?: AbortSignal) => {
      return spacesService.getDpiaEvidence(spaceId, params, signal);
    },
    {
      enabled: !!spaceId
    }
  );
}
