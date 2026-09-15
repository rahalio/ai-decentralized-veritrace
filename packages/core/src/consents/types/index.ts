/**
 * Consents Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/consents.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConsentGrant = components["schemas"]["ConsentGrant"];
export type ConsentGrantCreate = components["schemas"]["ConsentGrantCreate"];
export type ConsentGrantListData = components["schemas"]["ConsentGrantListData"];
export type ConsentGrantStatus = components["schemas"]["ConsentGrantStatus"];
export type AccessRequest = components["schemas"]["AccessRequest"];
export type AccessRequestCreate = components["schemas"]["AccessRequestCreate"];
export type AccessRequestDecide = components["schemas"]["AccessRequestDecide"];
export type AccessRequestId = components["schemas"]["AccessRequestId"];
export type AccessRequestListData = components["schemas"]["AccessRequestListData"];
export type AccessRequestListResponse = components["schemas"]["AccessRequestListResponse"];
export type AccessRequestResponse = components["schemas"]["AccessRequestResponse"];
export type AccessRequestStatus = components["schemas"]["AccessRequestStatus"];
export type Consent = operations["listConsents"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateConsentGrantRequestInput = NonNullable<operations["createConsentGrant"]["requestBody"]>["content"]["application/json"];
export type CreateAccessRequestRequestInput = NonNullable<operations["createAccessRequest"]["requestBody"]>["content"]["application/json"];
export type DecideAccessRequestRequestInput = NonNullable<operations["decideAccessRequest"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConsentsParams = NonNullable<operations["listConsents"]["parameters"]["query"]>;
export type GetConsentParams = operations["getConsent"]["parameters"]["path"];
export type RevokeConsentParams = operations["revokeConsent"]["parameters"]["path"];
export type ListAccessRequestsParams = NonNullable<operations["listAccessRequests"]["parameters"]["query"]>;
export type GetAccessRequestParams = operations["getAccessRequest"]["parameters"]["path"];
export type DecideAccessRequestParams = operations["decideAccessRequest"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConsentsResponse = operations["listConsents"]["responses"]["200"]["content"]["application/json"];
export type CreateConsentGrantResponse = operations["createConsentGrant"]["responses"]["201"]["content"]["application/json"];
export type GetConsentResponse = operations["getConsent"]["responses"]["200"]["content"]["application/json"];
export type RevokeConsentResponse = operations["revokeConsent"]["responses"]["200"]["content"]["application/json"];
export type ListAccessRequestsResponse = operations["listAccessRequests"]["responses"]["200"]["content"]["application/json"];
export type CreateAccessRequestResponse = operations["createAccessRequest"]["responses"]["201"]["content"]["application/json"];
export type GetAccessRequestResponse = operations["getAccessRequest"]["responses"]["200"]["content"]["application/json"];
export type DecideAccessRequestResponse = operations["decideAccessRequest"]["responses"]["200"]["content"]["application/json"];


