// @ts-nocheck
/**
 * Commitments Mutation Hooks
 *
 * React Query hooks for mutating commitments data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { commitmentsService } from "../commitments.service";
// TODO: Import types
// import type { ... } from "../commitments.api-types";

/**
 * Hook to anchor an opaque hash commitment
 *
 * Automatically invalidates commitments queries on success.
 */
export function useGetCommitment() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return commitmentsService.getCommitment(data);
    },
    {
      invalidateQueries: [["commitments", "Commitment"]],
    }
  );
}
