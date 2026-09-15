/**
 * Blocks Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/blocks.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type LearningBlock = components["schemas"]["LearningBlock"];
export type LearningBlockCreate = components["schemas"]["LearningBlockCreate"];
export type LearningBlockEvent = components["schemas"]["LearningBlockEvent"];
export type LearningBlockListData = components["schemas"]["LearningBlockListData"];
export type LearningBlockStatus = components["schemas"]["LearningBlockStatus"];
export type DeletionRequest = components["schemas"]["DeletionRequest"];
export type DeletionRequestCreate = components["schemas"]["DeletionRequestCreate"];
export type DeletionRequestId = components["schemas"]["DeletionRequestId"];
export type DeletionRequestListData = components["schemas"]["DeletionRequestListData"];
export type DeletionRequestListResponse = components["schemas"]["DeletionRequestListResponse"];
export type DeletionRequestResponse = components["schemas"]["DeletionRequestResponse"];
export type DeletionRequestStatus = components["schemas"]["DeletionRequestStatus"];
export type Block = operations["listLearningBlocks"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type EmitLearningBlockRequestInput = NonNullable<operations["emitLearningBlock"]["requestBody"]>["content"]["application/json"];
export type CreateDeletionRequestRequestInput = NonNullable<operations["createDeletionRequest"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLearningBlocksParams = NonNullable<operations["listLearningBlocks"]["parameters"]["query"]>;
export type GetLearningBlockMetaParams = operations["getLearningBlockMeta"]["parameters"]["path"];
export type CreateDeletionRequestParams = operations["createDeletionRequest"]["parameters"]["path"];
export type ListDeletionRequestsParams = NonNullable<operations["listDeletionRequests"]["parameters"]["query"]>;
export type GetDeletionRequestParams = operations["getDeletionRequest"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLearningBlocksResponse = operations["listLearningBlocks"]["responses"]["200"]["content"]["application/json"];
export type EmitLearningBlockResponse = operations["emitLearningBlock"]["responses"]["201"]["content"]["application/json"];
export type GetLearningBlockMetaResponse = operations["getLearningBlockMeta"]["responses"]["200"]["content"]["application/json"];
export type CreateDeletionRequestResponse = operations["createDeletionRequest"]["responses"]["201"]["content"]["application/json"];
export type ListDeletionRequestsResponse = operations["listDeletionRequests"]["responses"]["200"]["content"]["application/json"];
export type GetDeletionRequestResponse = operations["getDeletionRequest"]["responses"]["200"]["content"]["application/json"];


