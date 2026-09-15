/**
 * Spaces Domain Contracts
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
 * @see @veritrace/core/spaces for the source schemas
 */

import { spacesSchemas as coreSpacesSchemas } from "@veritrace/core/spaces";
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
} = coreSpacesSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const spacesSchemas = coreSpacesSchemas;
