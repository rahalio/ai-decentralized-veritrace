/**
 * Verifications Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/verifications.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type TamperEvent = components["schemas"]["TamperEvent"];
export type TamperEventAcknowledge = components["schemas"]["TamperEventAcknowledge"];
export type TamperEventListData = components["schemas"]["TamperEventListData"];
export type TamperEventStatus = components["schemas"]["TamperEventStatus"];
export type Verification = components["schemas"]["Verification"];
export type VerificationCreate = components["schemas"]["VerificationCreate"];
export type VerificationListData = components["schemas"]["VerificationListData"];
export type VerificationStatus = components["schemas"]["VerificationStatus"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type VerifyLearningBlockRequestInput = NonNullable<operations["verifyLearningBlock"]["requestBody"]>["content"]["application/json"];
export type AcknowledgeTamperEventRequestInput = NonNullable<operations["acknowledgeTamperEvent"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListVerificationsParams = NonNullable<operations["listVerifications"]["parameters"]["query"]>;
export type GetVerificationParams = operations["getVerification"]["parameters"]["path"];
export type ListTamperEventsParams = NonNullable<operations["listTamperEvents"]["parameters"]["query"]>;
export type GetTamperEventParams = operations["getTamperEvent"]["parameters"]["path"];
export type AcknowledgeTamperEventParams = operations["acknowledgeTamperEvent"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListVerificationsResponse = operations["listVerifications"]["responses"]["200"]["content"]["application/json"];
export type VerifyLearningBlockResponse = operations["verifyLearningBlock"]["responses"]["201"]["content"]["application/json"];
export type GetVerificationResponse = operations["getVerification"]["responses"]["200"]["content"]["application/json"];
export type ListTamperEventsResponse = operations["listTamperEvents"]["responses"]["200"]["content"]["application/json"];
export type GetTamperEventResponse = operations["getTamperEvent"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeTamperEventResponse = operations["acknowledgeTamperEvent"]["responses"]["200"]["content"]["application/json"];


