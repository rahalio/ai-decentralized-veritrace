/**
 * Adapters Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/adapters.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AdapterHealthStatus = components["schemas"]["AdapterHealthStatus"];
export type LbrEndpoint = components["schemas"]["LbrEndpoint"];
export type LbrEndpointCreate = components["schemas"]["LbrEndpointCreate"];
export type LbrEndpointKind = components["schemas"]["LbrEndpointKind"];
export type LbrEndpointListData = components["schemas"]["LbrEndpointListData"];
export type LbrEndpointUpdate = components["schemas"]["LbrEndpointUpdate"];
export type LearnerLbrLinkage = components["schemas"]["LearnerLbrLinkage"];
export type LearnerLbrLinkageCreate = components["schemas"]["LearnerLbrLinkageCreate"];
export type LearnerLbrLinkageStatus = components["schemas"]["LearnerLbrLinkageStatus"];
export type LedgerAdapter = components["schemas"]["LedgerAdapter"];
export type LedgerAdapterCreate = components["schemas"]["LedgerAdapterCreate"];
export type LedgerAdapterListData = components["schemas"]["LedgerAdapterListData"];
export type PatchPlaybook = components["schemas"]["PatchPlaybook"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateLbrEndpointRequestInput = NonNullable<operations["createLbrEndpoint"]["requestBody"]>["content"]["application/json"];
export type UpdateLbrEndpointRequestInput = NonNullable<operations["updateLbrEndpoint"]["requestBody"]>["content"]["application/json"];
export type UpdateLbrEndpointRequest = UpdateLbrEndpointRequestInput;
export type CreateLedgerAdapterRequestInput = NonNullable<operations["createLedgerAdapter"]["requestBody"]>["content"]["application/json"];
export type SetLearnerLbrLinkageRequestInput = NonNullable<operations["setLearnerLbrLinkage"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLbrEndpointsParams = NonNullable<operations["listLbrEndpoints"]["parameters"]["query"]>;
export type GetLbrEndpointParams = operations["getLbrEndpoint"]["parameters"]["path"];
export type UpdateLbrEndpointParams = operations["updateLbrEndpoint"]["parameters"]["path"];
export type ListLedgerAdaptersParams = NonNullable<operations["listLedgerAdapters"]["parameters"]["query"]>;
export type GetLedgerAdapterParams = operations["getLedgerAdapter"]["parameters"]["path"];
export type GetLearnerLbrLinkageParams = operations["getLearnerLbrLinkage"]["parameters"]["path"];
export type SetLearnerLbrLinkageParams = operations["setLearnerLbrLinkage"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLbrEndpointsResponse = operations["listLbrEndpoints"]["responses"]["200"]["content"]["application/json"];
export type CreateLbrEndpointResponse = operations["createLbrEndpoint"]["responses"]["201"]["content"]["application/json"];
export type GetLbrEndpointResponse = operations["getLbrEndpoint"]["responses"]["200"]["content"]["application/json"];
export type UpdateLbrEndpointResponse = operations["updateLbrEndpoint"]["responses"]["200"]["content"]["application/json"];
export type ListLedgerAdaptersResponse = operations["listLedgerAdapters"]["responses"]["200"]["content"]["application/json"];
export type CreateLedgerAdapterResponse = operations["createLedgerAdapter"]["responses"]["201"]["content"]["application/json"];
export type GetLedgerAdapterResponse = operations["getLedgerAdapter"]["responses"]["200"]["content"]["application/json"];
export type GetLearnerLbrLinkageResponse = operations["getLearnerLbrLinkage"]["responses"]["200"]["content"]["application/json"];
export type SetLearnerLbrLinkageResponse = operations["setLearnerLbrLinkage"]["responses"]["201"]["content"]["application/json"];


