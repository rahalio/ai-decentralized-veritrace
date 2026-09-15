// @ts-nocheck
/**
 * Verifications Query Hooks
 *
 * React Query hooks for fetching verifications data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { verificationsService } from "../verifications.service";

/**
 * Hook to list verification results
 *
 * Query key: ["verifications", "Verification", ]
 */
export function useVerification(params?: Record<string, any>) {
  return useTenantQuery(
    ["verifications", "Verification", ],
    async (orgId: string, signal?: AbortSignal) => {
      return verificationsService.getVerification(params, signal);
    }
  );
}

/**
 * Hook to get verification result by id
 *
 * Query key: ["verifications", "Verification", verificationId]
 */
export function useVerification(verificationId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["verifications", "Verification", verificationId],
    async (orgId: string, signal?: AbortSignal) => {
      return verificationsService.getVerification(verificationId, params, signal);
    },
    {
      enabled: !!verificationId
    }
  );
}

/**
 * Hook to list tamper incidents
 *
 * Query key: ["verifications", "TamperEvent", ]
 */
export function useTamperEvent(params?: Record<string, any>) {
  return useTenantQuery(
    ["verifications", "TamperEvent", ],
    async (orgId: string, signal?: AbortSignal) => {
      return verificationsService.getTamperEvent(params, signal);
    }
  );
}

/**
 * Hook to get tamper event by id
 *
 * Query key: ["verifications", "TamperEvent", tamperEventId]
 */
export function useTamperEvent(tamperEventId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["verifications", "TamperEvent", tamperEventId],
    async (orgId: string, signal?: AbortSignal) => {
      return verificationsService.getTamperEvent(tamperEventId, params, signal);
    },
    {
      enabled: !!tamperEventId
    }
  );
}
