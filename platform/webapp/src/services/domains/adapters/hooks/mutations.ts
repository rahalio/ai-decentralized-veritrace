// @ts-nocheck
/**
 * Adapters Mutation Hooks
 *
 * React Query hooks for mutating adapters data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { adaptersService } from "../adapters.service";
// TODO: Import types
// import type { ... } from "../adapters.api-types";

/**
 * Hook to register an lbr endpoint
 *
 * Automatically invalidates adapters queries on success.
 */
export function useCreateLbrEndpoint() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return adaptersService.createLbrEndpoint(data);
    },
    {
      invalidateQueries: [["adapters", "LbrEndpoint"]],
    }
  );
}

/**
 * Hook to update an lbr endpoint
 *
 * Automatically invalidates adapters queries on success.
 */
export function useUpdateLbrEndpoint() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return adaptersService.updateLbrEndpoint(data);
    },
    {
      invalidateQueries: [["adapters", "LbrEndpoint"]],
    }
  );
}

/**
 * Hook to register a ledger adapter
 *
 * Automatically invalidates adapters queries on success.
 */
export function useCreateLedgerAdapter() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return adaptersService.createLedgerAdapter(data);
    },
    {
      invalidateQueries: [["adapters", "LedgerAdapter"]],
    }
  );
}

/**
 * Hook to set or replace learner lbr linkage
 *
 * Automatically invalidates adapters queries on success.
 */
export function useUpdateLbrLinkage() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return adaptersService.updateLbrLinkage(data);
    },
    {
      invalidateQueries: [["adapters", "LbrLinkage"]],
    }
  );
}
