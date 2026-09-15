/**
 * Verifications Domain
 *
 * Barrel export for verifications service, types, hooks, and view models.
 *
 * Architecture Rules:
 * - API types: re-exports from @veritrace/core only
 * - View models: UI-only extensions (VM suffix)
 * - Service: only place that touches network
 * - Hooks: call service only (never apiClient directly)
 * - Mappers: internal to service layer (not for components)
 * - Components: domain-specific UI (not exported from barrel)
 */

// ============================================================================
// Service (runtime boundary - only place that touches network)
// ============================================================================
export { verificationsService } from './verifications.service';

// ============================================================================
// Facade (high-level API for components)
// ============================================================================
export { verificationsFacade } from './facade';

// ============================================================================
// Contracts (runtime validation)
// ============================================================================
export * from "./contracts";

// ============================================================================
// API Types (re-exports from @veritrace/core only)
// ============================================================================
// These are immutable API contracts - never define locally
// API types: import from ./.api-types as needed

// ============================================================================
// Hooks (consolidated in hooks/ directory)
// ============================================================================
export * from './hooks';

// ============================================================================
// Components (domain-specific UI - not exported from barrel)
// ============================================================================
// Components are now in features/ directory and should be imported from there.
// This prevents cross-domain component dependencies and keeps the barrel focused.
