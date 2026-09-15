// @ts-nocheck
/**
 * Commitments Query Hooks
 *
 * React Query hooks for fetching commitments data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { commitmentsService } from "../commitments.service";

/**
 * Hook to list chain commitments
 *
 * Query key: ["commitments", "Commitment", ]
 */
export function useCommitment(params?: Record<string, any>) {
  return useTenantQuery(
    ["commitments", "Commitment", ],
    async (orgId: string, signal?: AbortSignal) => {
      return commitmentsService.getCommitment(params, signal);
    }
  );
}

/**
 * Hook to get chain commitment by id
 *
 * Query key: ["commitments", "Commitment", commitmentId]
 */
export function useCommitment(commitmentId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["commitments", "Commitment", commitmentId],
    async (orgId: string, signal?: AbortSignal) => {
      return commitmentsService.getCommitment(commitmentId, params, signal);
    },
    {
      enabled: !!commitmentId
    }
  );
}
