// @ts-nocheck
/**
 * Adapters Query Hooks
 *
 * React Query hooks for fetching adapters data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { adaptersService } from "../adapters.service";

/**
 * Hook to list lbr endpoints
 *
 * Query key: ["adapters", "LbrEndpoint", ]
 */
export function useLbrEndpoint(params?: Record<string, any>) {
  return useTenantQuery(
    ["adapters", "LbrEndpoint", ],
    async (orgId: string, signal?: AbortSignal) => {
      return adaptersService.getLbrEndpoint(params, signal);
    }
  );
}

/**
 * Hook to get lbr endpoint by id
 *
 * Query key: ["adapters", "LbrEndpoint", lbrEndpointId]
 */
export function useLbrEndpoint(lbrEndpointId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["adapters", "LbrEndpoint", lbrEndpointId],
    async (orgId: string, signal?: AbortSignal) => {
      return adaptersService.getLbrEndpoint(lbrEndpointId, params, signal);
    },
    {
      enabled: !!lbrEndpointId
    }
  );
}

/**
 * Hook to list ledger adapters
 *
 * Query key: ["adapters", "LedgerAdapter", ]
 */
export function useLedgerAdapter(params?: Record<string, any>) {
  return useTenantQuery(
    ["adapters", "LedgerAdapter", ],
    async (orgId: string, signal?: AbortSignal) => {
      return adaptersService.getLedgerAdapter(params, signal);
    }
  );
}

/**
 * Hook to get ledger adapter by id
 *
 * Query key: ["adapters", "LedgerAdapter", ledgerAdapterId]
 */
export function useLedgerAdapter(ledgerAdapterId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["adapters", "LedgerAdapter", ledgerAdapterId],
    async (orgId: string, signal?: AbortSignal) => {
      return adaptersService.getLedgerAdapter(ledgerAdapterId, params, signal);
    },
    {
      enabled: !!ledgerAdapterId
    }
  );
}

/**
 * Hook to get learner lbr linkage
 *
 * Query key: ["adapters", "LbrLinkage", learnerId]
 */
export function useLbrLinkage(learnerId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["adapters", "LbrLinkage", learnerId],
    async (orgId: string, signal?: AbortSignal) => {
      return adaptersService.getLbrLinkage(learnerId, params, signal);
    },
    {
      enabled: !!learnerId
    }
  );
}
