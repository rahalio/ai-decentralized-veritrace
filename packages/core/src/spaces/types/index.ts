/**
 * Spaces Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/spaces.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DeletionCompletionMetrics = components["schemas"]["DeletionCompletionMetrics"];
export type DpiAEvidencePack = components["schemas"]["DpiAEvidencePack"];
export type LearningSpace = components["schemas"]["LearningSpace"];
export type LearningSpaceCreate = components["schemas"]["LearningSpaceCreate"];
export type LearningSpaceListData = components["schemas"]["LearningSpaceListData"];
export type NecessityCriteria = components["schemas"]["NecessityCriteria"];
export type NecessityDecision = components["schemas"]["NecessityDecision"];
export type NecessityDecisionCreate = components["schemas"]["NecessityDecisionCreate"];
export type NecessityDecisionListData = components["schemas"]["NecessityDecisionListData"];
export type NecessityOutcome = components["schemas"]["NecessityOutcome"];
export type Space = operations["listLearningSpaces"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterLearningSpaceRequestInput = NonNullable<operations["registerLearningSpace"]["requestBody"]>["content"]["application/json"];
export type RecordNecessityDecisionRequestInput = NonNullable<operations["recordNecessityDecision"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLearningSpacesParams = NonNullable<operations["listLearningSpaces"]["parameters"]["query"]>;
export type GetLearningSpaceParams = operations["getLearningSpace"]["parameters"]["path"];
export type ListNecessityDecisionsParams = NonNullable<operations["listNecessityDecisions"]["parameters"]["query"]>;
export type RecordNecessityDecisionParams = operations["recordNecessityDecision"]["parameters"]["path"];
export type GetNecessityDecisionParams = operations["getNecessityDecision"]["parameters"]["path"];
export type GetDpiAEvidencePackParams = operations["getDpiAEvidencePack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLearningSpacesResponse = operations["listLearningSpaces"]["responses"]["200"]["content"]["application/json"];
export type RegisterLearningSpaceResponse = operations["registerLearningSpace"]["responses"]["201"]["content"]["application/json"];
export type GetLearningSpaceResponse = operations["getLearningSpace"]["responses"]["200"]["content"]["application/json"];
export type ListNecessityDecisionsResponse = operations["listNecessityDecisions"]["responses"]["200"]["content"]["application/json"];
export type RecordNecessityDecisionResponse = operations["recordNecessityDecision"]["responses"]["201"]["content"]["application/json"];
export type GetNecessityDecisionResponse = operations["getNecessityDecision"]["responses"]["200"]["content"]["application/json"];
export type GetDpiAEvidencePackResponse = operations["getDpiAEvidencePack"]["responses"]["200"]["content"]["application/json"];


