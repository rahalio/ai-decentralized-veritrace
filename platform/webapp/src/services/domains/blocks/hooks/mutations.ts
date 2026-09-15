// @ts-nocheck
/**
 * Blocks Mutation Hooks
 *
 * React Query hooks for mutating blocks data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { blocksService } from "../blocks.service";
// TODO: Import types
// import type { ... } from "../blocks.api-types";

/**
 * Hook to emit a signed learning block
 *
 * Automatically invalidates blocks queries on success.
 */
export function useGetBlock() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return blocksService.getBlock(data);
    },
    {
      invalidateQueries: [["blocks", "Block"]],
    }
  );
}

/**
 * Hook to request deletion of a block from the learner lbr
 *
 * Automatically invalidates blocks queries on success.
 */
export function useCreateDeletionRequest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return blocksService.createDeletionRequest(data);
    },
    {
      invalidateQueries: [["blocks", "DeletionRequest"]],
    }
  );
}
