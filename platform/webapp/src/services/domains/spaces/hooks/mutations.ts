// @ts-nocheck
/**
 * Spaces Mutation Hooks
 *
 * React Query hooks for mutating spaces data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { spacesService } from "../spaces.service";
// TODO: Import types
// import type { ... } from "../spaces.api-types";

/**
 * Hook to register a learning space
 *
 * Automatically invalidates spaces queries on success.
 */
export function useCreateSpace() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return spacesService.createSpace(data);
    },
    {
      invalidateQueries: [["spaces", "Space"]],
    }
  );
}

/**
 * Hook to record a blockchain necessity decision
 *
 * Automatically invalidates spaces queries on success.
 */
export function useGetNecessityDecision() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return spacesService.getNecessityDecision(data);
    },
    {
      invalidateQueries: [["spaces", "NecessityDecision"]],
    }
  );
}
