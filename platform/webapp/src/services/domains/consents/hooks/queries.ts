// @ts-nocheck
/**
 * Consents Query Hooks
 *
 * React Query hooks for fetching consents data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { consentsService } from "../consents.service";

/**
 * Hook to list consent grants
 *
 * Query key: ["consents", "Consent", ]
 */
export function useConsent(params?: Record<string, any>) {
  return useTenantQuery(
    ["consents", "Consent", ],
    async (orgId: string, signal?: AbortSignal) => {
      return consentsService.getConsent(params, signal);
    }
  );
}

/**
 * Hook to get consent grant by id
 *
 * Query key: ["consents", "Consent", consentId]
 */
export function useConsent(consentId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["consents", "Consent", consentId],
    async (orgId: string, signal?: AbortSignal) => {
      return consentsService.getConsent(consentId, params, signal);
    },
    {
      enabled: !!consentId
    }
  );
}

/**
 * Hook to list researcher access requests
 *
 * Query key: ["consents", "AccessRequest", ]
 */
export function useAccessRequest(params?: Record<string, any>) {
  return useTenantQuery(
    ["consents", "AccessRequest", ],
    async (orgId: string, signal?: AbortSignal) => {
      return consentsService.getAccessRequest(params, signal);
    }
  );
}

/**
 * Hook to get access request by id
 *
 * Query key: ["consents", "AccessRequest", accessRequestId]
 */
export function useAccessRequest(accessRequestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["consents", "AccessRequest", accessRequestId],
    async (orgId: string, signal?: AbortSignal) => {
      return consentsService.getAccessRequest(accessRequestId, params, signal);
    },
    {
      enabled: !!accessRequestId
    }
  );
}
