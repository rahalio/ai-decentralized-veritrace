/**
 * Commitments Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/commitments.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ChainCommitment = components["schemas"]["ChainCommitment"];
export type ChainCommitmentCreate = components["schemas"]["ChainCommitmentCreate"];
export type ChainCommitmentListData = components["schemas"]["ChainCommitmentListData"];
export type Commitment = operations["listCommitments"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AnchorCommitmentRequestInput = NonNullable<operations["anchorCommitment"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCommitmentsParams = NonNullable<operations["listCommitments"]["parameters"]["query"]>;
export type GetCommitmentParams = operations["getCommitment"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCommitmentsResponse = operations["listCommitments"]["responses"]["200"]["content"]["application/json"];
export type AnchorCommitmentResponse = operations["anchorCommitment"]["responses"]["201"]["content"]["application/json"];
export type GetCommitmentResponse = operations["getCommitment"]["responses"]["200"]["content"]["application/json"];


