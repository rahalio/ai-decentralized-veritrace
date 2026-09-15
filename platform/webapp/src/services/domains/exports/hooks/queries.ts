// @ts-nocheck
/**
 * Exports Query Hooks
 *
 * React Query hooks for fetching exports data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { exportsService } from "../exports.service";

/**
 * Hook to list research exports
 *
 * Query key: ["exports", "Export", ]
 */
export function useExport(params?: Record<string, any>) {
  return useTenantQuery(
    ["exports", "Export", ],
    async (orgId: string, signal?: AbortSignal) => {
      return exportsService.getExport(params, signal);
    }
  );
}

/**
 * Hook to get research export by id
 *
 * Query key: ["exports", "Export", exportId]
 */
export function useExport(exportId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["exports", "Export", exportId],
    async (orgId: string, signal?: AbortSignal) => {
      return exportsService.getExport(exportId, params, signal);
    },
    {
      enabled: !!exportId
    }
  );
}
