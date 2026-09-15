// @ts-nocheck
/**
 * Consents Mutation Hooks
 *
 * React Query hooks for mutating consents data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { consentsService } from "../consents.service";
// TODO: Import types
// import type { ... } from "../consents.api-types";

/**
 * Hook to create a consent grant
 *
 * Automatically invalidates consents queries on success.
 */
export function useCreateConsent() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return consentsService.createConsent(data);
    },
    {
      invalidateQueries: [["consents", "Consent"]],
    }
  );
}

/**
 * Hook to revoke a consent grant
 *
 * Automatically invalidates consents queries on success.
 */
export function useGetRevoke() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return consentsService.getRevoke(data);
    },
    {
      invalidateQueries: [["consents", "Revoke"]],
    }
  );
}

/**
 * Hook to submit a researcher access request
 *
 * Automatically invalidates consents queries on success.
 */
export function useCreateAccessRequest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return consentsService.createAccessRequest(data);
    },
    {
      invalidateQueries: [["consents", "AccessRequest"]],
    }
  );
}

/**
 * Hook to approve or deny an access request
 *
 * Automatically invalidates consents queries on success.
 */
export function useGetDecide() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return consentsService.getDecide(data);
    },
    {
      invalidateQueries: [["consents", "Decide"]],
    }
  );
}
