// @ts-nocheck
/**
 * Verifications Mutation Hooks
 *
 * React Query hooks for mutating verifications data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { verificationsService } from "../verifications.service";
// TODO: Import types
// import type { ... } from "../verifications.api-types";

/**
 * Hook to verify a learning block on retrieval
 *
 * Automatically invalidates verifications queries on success.
 */
export function useGetVerification() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return verificationsService.getVerification(data);
    },
    {
      invalidateQueries: [["verifications", "Verification"]],
    }
  );
}

/**
 * Hook to acknowledge a tamper incident
 *
 * Automatically invalidates verifications queries on success.
 */
export function useGetAcknowledge() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return verificationsService.getAcknowledge(data);
    },
    {
      invalidateQueries: [["verifications", "Acknowledge"]],
    }
  );
}
