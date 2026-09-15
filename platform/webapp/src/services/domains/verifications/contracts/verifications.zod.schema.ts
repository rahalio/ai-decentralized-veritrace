/**
 * Verifications Domain Contracts
 *
 * Re-exports Zod schemas from @veritrace/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @veritrace/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @veritrace/core/verifications for the source schemas
 */

import { verificationsSchemas as coreVerificationsSchemas } from "@veritrace/core/verifications";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreVerificationsSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const verificationsSchemas = coreVerificationsSchemas;
