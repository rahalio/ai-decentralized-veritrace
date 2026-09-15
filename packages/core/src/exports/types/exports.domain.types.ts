/**
 * Exports Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/exports.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConsentArtefactSummary = components["schemas"]["ConsentArtefactSummary"];
export type EthicsPackageSummary = components["schemas"]["EthicsPackageSummary"];
export type NecessitySummary = components["schemas"]["NecessitySummary"];
export type ResearchExport = components["schemas"]["ResearchExport"];
export type ResearchExportCreate = components["schemas"]["ResearchExportCreate"];
export type ResearchExportListData = components["schemas"]["ResearchExportListData"];
export type ResearchExportStatus = components["schemas"]["ResearchExportStatus"];
export type Export = operations["listResearchExports"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateResearchExportRequestInput = NonNullable<operations["createResearchExport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListResearchExportsParams = NonNullable<operations["listResearchExports"]["parameters"]["query"]>;
export type GetResearchExportParams = operations["getResearchExport"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListResearchExportsResponse = operations["listResearchExports"]["responses"]["200"]["content"]["application/json"];
export type CreateResearchExportResponse = operations["createResearchExport"]["responses"]["201"]["content"]["application/json"];
export type GetResearchExportResponse = operations["getResearchExport"]["responses"]["200"]["content"]["application/json"];


