// @ts-nocheck
/**
 * Exports Mutation Hooks
 *
 * React Query hooks for mutating exports data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { exportsService } from "../exports.service";
// TODO: Import types
// import type { ... } from "../exports.api-types";

/**
 * Hook to create a research export package
 *
 * Automatically invalidates exports queries on success.
 */
export function useCreateExport() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return exportsService.createExport(data);
    },
    {
      invalidateQueries: [["exports", "Export"]],
    }
  );
}
