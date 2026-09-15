import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createLbrEndpoint_Body = z
  .object({
    name: z.string().min(1).max(200),
    baseUrl: z.string().url(),
    kind: z.enum(['managed', 'self_hosted']),
    version: z.string().min(1).max(64),
  })
  .passthrough();
const updateLbrEndpoint_Body = z
  .object({
    name: z.string().min(1).max(200),
    baseUrl: z.string().url(),
    kind: z.enum(['managed', 'self_hosted']),
    status: z.enum(['healthy', 'degraded', 'down', 'disabled', 'unversioned']),
    version: z.string().min(1).max(64),
  })
  .partial()
  .passthrough();
const createLedgerAdapter_Body = z
  .object({
    name: z.string().min(1).max(200),
    version: z.string().min(1).max(64),
    networkId: z.string().min(1).max(100),
    commitmentsOnly: z.literal(true).optional().default(true),
    patchPlaybook: z
      .object({
        title: z.string().min(1).max(200),
        summary: z.string().max(2000).optional(),
        disableAnchoringDuringPatch: z.boolean().optional().default(true),
        steps: z.array(z.string().max(1000)).min(1),
        runbookUrl: z.string().url().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
const setLearnerLbrLinkage_Body = z
  .object({
    lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    platformCustodyNoticeAck: z.boolean().optional().default(true),
    runConnectionTest: z.boolean().optional().default(true),
  })
  .passthrough();
const AdapterHealthStatus = z.enum([
  'healthy',
  'degraded',
  'down',
  'disabled',
  'unversioned',
]);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const LbrEndpointId = z.string();
const LbrEndpointKind = z.enum(['managed', 'self_hosted']);
const LbrEndpoint = z
  .object({
    lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    baseUrl: z.string().url(),
    kind: z.enum(['managed', 'self_hosted']),
    status: z.enum(['healthy', 'degraded', 'down', 'disabled', 'unversioned']),
    version: z.string().min(1).max(64),
    lastHealthCheckAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LbrEndpointListData = z
  .object({
    items: z.array(
      z
        .object({
          lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          baseUrl: z.string().url(),
          kind: z.enum(['managed', 'self_hosted']),
          status: z.enum([
            'healthy',
            'degraded',
            'down',
            'disabled',
            'unversioned',
          ]),
          version: z.string().min(1).max(64),
          lastHealthCheckAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const LbrEndpointListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              baseUrl: z.string().url(),
              kind: z.enum(['managed', 'self_hosted']),
              status: z.enum([
                'healthy',
                'degraded',
                'down',
                'disabled',
                'unversioned',
              ]),
              version: z.string().min(1).max(64),
              lastHealthCheckAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const LbrEndpointCreate = z
  .object({
    name: z.string().min(1).max(200),
    baseUrl: z.string().url(),
    kind: z.enum(['managed', 'self_hosted']),
    version: z.string().min(1).max(64),
  })
  .passthrough();
const LbrEndpointResponse = z
  .object({
    data: z
      .object({
        lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        baseUrl: z.string().url(),
        kind: z.enum(['managed', 'self_hosted']),
        status: z.enum([
          'healthy',
          'degraded',
          'down',
          'disabled',
          'unversioned',
        ]),
        version: z.string().min(1).max(64),
        lastHealthCheckAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const LbrEndpointUpdate = z
  .object({
    name: z.string().min(1).max(200),
    baseUrl: z.string().url(),
    kind: z.enum(['managed', 'self_hosted']),
    status: z.enum(['healthy', 'degraded', 'down', 'disabled', 'unversioned']),
    version: z.string().min(1).max(64),
  })
  .partial()
  .passthrough();
const LedgerAdapterId = z.string();
const PatchPlaybook = z
  .object({
    title: z.string().min(1).max(200),
    summary: z.string().max(2000).optional(),
    disableAnchoringDuringPatch: z.boolean().optional().default(true),
    steps: z.array(z.string().max(1000)).min(1),
    runbookUrl: z.string().url().optional(),
  })
  .passthrough();
const LedgerAdapter = z
  .object({
    ledgerAdapterId: z.string().regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    version: z.string().min(1).max(64),
    networkId: z.string().min(1).max(100),
    status: z.enum(['healthy', 'degraded', 'down', 'disabled', 'unversioned']),
    commitmentsOnly: z.boolean().optional().default(true),
    vulnerabilityBanner: z.string().max(2000).optional(),
    patchPlaybook: z
      .object({
        title: z.string().min(1).max(200),
        summary: z.string().max(2000).optional(),
        disableAnchoringDuringPatch: z.boolean().optional().default(true),
        steps: z.array(z.string().max(1000)).min(1),
        runbookUrl: z.string().url().optional(),
      })
      .passthrough()
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LedgerAdapterListData = z
  .object({
    items: z.array(
      z
        .object({
          ledgerAdapterId: z.string().regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          version: z.string().min(1).max(64),
          networkId: z.string().min(1).max(100),
          status: z.enum([
            'healthy',
            'degraded',
            'down',
            'disabled',
            'unversioned',
          ]),
          commitmentsOnly: z.boolean().optional().default(true),
          vulnerabilityBanner: z.string().max(2000).optional(),
          patchPlaybook: z
            .object({
              title: z.string().min(1).max(200),
              summary: z.string().max(2000).optional(),
              disableAnchoringDuringPatch: z.boolean().optional().default(true),
              steps: z.array(z.string().max(1000)).min(1),
              runbookUrl: z.string().url().optional(),
            })
            .passthrough()
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const LedgerAdapterListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              ledgerAdapterId: z.string().regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              version: z.string().min(1).max(64),
              networkId: z.string().min(1).max(100),
              status: z.enum([
                'healthy',
                'degraded',
                'down',
                'disabled',
                'unversioned',
              ]),
              commitmentsOnly: z.boolean().optional().default(true),
              vulnerabilityBanner: z.string().max(2000).optional(),
              patchPlaybook: z
                .object({
                  title: z.string().min(1).max(200),
                  summary: z.string().max(2000).optional(),
                  disableAnchoringDuringPatch: z
                    .boolean()
                    .optional()
                    .default(true),
                  steps: z.array(z.string().max(1000)).min(1),
                  runbookUrl: z.string().url().optional(),
                })
                .passthrough()
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const LedgerAdapterCreate = z
  .object({
    name: z.string().min(1).max(200),
    version: z.string().min(1).max(64),
    networkId: z.string().min(1).max(100),
    commitmentsOnly: z.literal(true).optional().default(true),
    patchPlaybook: z
      .object({
        title: z.string().min(1).max(200),
        summary: z.string().max(2000).optional(),
        disableAnchoringDuringPatch: z.boolean().optional().default(true),
        steps: z.array(z.string().max(1000)).min(1),
        runbookUrl: z.string().url().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
const LedgerAdapterResponse = z
  .object({
    data: z
      .object({
        ledgerAdapterId: z.string().regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        version: z.string().min(1).max(64),
        networkId: z.string().min(1).max(100),
        status: z.enum([
          'healthy',
          'degraded',
          'down',
          'disabled',
          'unversioned',
        ]),
        commitmentsOnly: z.boolean().optional().default(true),
        vulnerabilityBanner: z.string().max(2000).optional(),
        patchPlaybook: z
          .object({
            title: z.string().min(1).max(200),
            summary: z.string().max(2000).optional(),
            disableAnchoringDuringPatch: z.boolean().optional().default(true),
            steps: z.array(z.string().max(1000)).min(1),
            runbookUrl: z.string().url().optional(),
          })
          .passthrough()
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const LearnerId = z.string();
const LearnerLbrLinkageStatus = z.enum([
  'linked',
  'disconnected',
  'pending_test',
]);
const LearnerLbrLinkage = z
  .object({
    learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
    lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['linked', 'disconnected', 'pending_test']),
    connectionTestPassed: z.boolean().optional(),
    platformCustodyNoticeAck: z.boolean().optional(),
    linkedAt: z.string().datetime({ offset: true }),
    disconnectedAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LearnerLbrLinkageResponse = z
  .object({
    data: z
      .object({
        learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
        lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['linked', 'disconnected', 'pending_test']),
        connectionTestPassed: z.boolean().optional(),
        platformCustodyNoticeAck: z.boolean().optional(),
        linkedAt: z.string().datetime({ offset: true }),
        disconnectedAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const LearnerLbrLinkageCreate = z
  .object({
    lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    platformCustodyNoticeAck: z.boolean().optional().default(true),
    runConnectionTest: z.boolean().optional().default(true),
  })
  .passthrough();

export const schemas: any = {
  createLbrEndpoint_Body,
  updateLbrEndpoint_Body,
  createLedgerAdapter_Body,
  setLearnerLbrLinkage_Body,
  AdapterHealthStatus,
  Problem,
  LbrEndpointId,
  LbrEndpointKind,
  LbrEndpoint,
  LbrEndpointListData,
  ResponseMeta,
  LbrEndpointListResponse,
  LbrEndpointCreate,
  LbrEndpointResponse,
  LbrEndpointUpdate,
  LedgerAdapterId,
  PatchPlaybook,
  LedgerAdapter,
  LedgerAdapterListData,
  LedgerAdapterListResponse,
  LedgerAdapterCreate,
  LedgerAdapterResponse,
  LearnerId,
  LearnerLbrLinkageStatus,
  LearnerLbrLinkage,
  LearnerLbrLinkageResponse,
  LearnerLbrLinkageCreate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/lbr-endpoints',
    alias: 'listLbrEndpoints',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['healthy', 'degraded', 'down', 'disabled', 'unversioned'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  lbrEndpointId: z
                    .string()
                    .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  baseUrl: z.string().url(),
                  kind: z.enum(['managed', 'self_hosted']),
                  status: z.enum([
                    'healthy',
                    'degraded',
                    'down',
                    'disabled',
                    'unversioned',
                  ]),
                  version: z.string().min(1).max(64),
                  lastHealthCheckAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/lbr-endpoints',
    alias: 'createLbrEndpoint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createLbrEndpoint_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            baseUrl: z.string().url(),
            kind: z.enum(['managed', 'self_hosted']),
            status: z.enum([
              'healthy',
              'degraded',
              'down',
              'disabled',
              'unversioned',
            ]),
            version: z.string().min(1).max(64),
            lastHealthCheckAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/lbr-endpoints/:lbrEndpointId',
    alias: 'getLbrEndpoint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'lbrEndpointId',
        type: 'Path',
        schema: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            baseUrl: z.string().url(),
            kind: z.enum(['managed', 'self_hosted']),
            status: z.enum([
              'healthy',
              'degraded',
              'down',
              'disabled',
              'unversioned',
            ]),
            version: z.string().min(1).max(64),
            lastHealthCheckAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'patch',
    path: '/v1/lbr-endpoints/:lbrEndpointId',
    alias: 'updateLbrEndpoint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateLbrEndpoint_Body,
      },
      {
        name: 'lbrEndpointId',
        type: 'Path',
        schema: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            baseUrl: z.string().url(),
            kind: z.enum(['managed', 'self_hosted']),
            status: z.enum([
              'healthy',
              'degraded',
              'down',
              'disabled',
              'unversioned',
            ]),
            version: z.string().min(1).max(64),
            lastHealthCheckAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/learners/:learnerId/lbr-linkage',
    alias: 'getLearnerLbrLinkage',
    description: `Plain-language linkage of where the learner&#x27;s activity traces live.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'learnerId',
        type: 'Path',
        schema: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['linked', 'disconnected', 'pending_test']),
            connectionTestPassed: z.boolean().optional(),
            platformCustodyNoticeAck: z.boolean().optional(),
            linkedAt: z.string().datetime({ offset: true }),
            disconnectedAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/learners/:learnerId/lbr-linkage',
    alias: 'setLearnerLbrLinkage',
    description: `Designate an external Learning Block Repository without gas/key/fork UI.
Disconnect with deletion prompt is a product UX concern on top of this API.
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setLearnerLbrLinkage_Body,
      },
      {
        name: 'learnerId',
        type: 'Path',
        schema: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['linked', 'disconnected', 'pending_test']),
            connectionTestPassed: z.boolean().optional(),
            platformCustodyNoticeAck: z.boolean().optional(),
            linkedAt: z.string().datetime({ offset: true }),
            disconnectedAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/ledger-adapters',
    alias: 'listLedgerAdapters',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['healthy', 'degraded', 'down', 'disabled', 'unversioned'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  ledgerAdapterId: z
                    .string()
                    .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  version: z.string().min(1).max(64),
                  networkId: z.string().min(1).max(100),
                  status: z.enum([
                    'healthy',
                    'degraded',
                    'down',
                    'disabled',
                    'unversioned',
                  ]),
                  commitmentsOnly: z.boolean().optional().default(true),
                  vulnerabilityBanner: z.string().max(2000).optional(),
                  patchPlaybook: z
                    .object({
                      title: z.string().min(1).max(200),
                      summary: z.string().max(2000).optional(),
                      disableAnchoringDuringPatch: z
                        .boolean()
                        .optional()
                        .default(true),
                      steps: z.array(z.string().max(1000)).min(1),
                      runbookUrl: z.string().url().optional(),
                    })
                    .passthrough()
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/ledger-adapters',
    alias: 'createLedgerAdapter',
    description: `Versioned adapter for opaque hash commitments only. Include patch playbook
for contract/vulnerability response (BR-9).
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createLedgerAdapter_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            ledgerAdapterId: z.string().regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            version: z.string().min(1).max(64),
            networkId: z.string().min(1).max(100),
            status: z.enum([
              'healthy',
              'degraded',
              'down',
              'disabled',
              'unversioned',
            ]),
            commitmentsOnly: z.boolean().optional().default(true),
            vulnerabilityBanner: z.string().max(2000).optional(),
            patchPlaybook: z
              .object({
                title: z.string().min(1).max(200),
                summary: z.string().max(2000).optional(),
                disableAnchoringDuringPatch: z
                  .boolean()
                  .optional()
                  .default(true),
                steps: z.array(z.string().max(1000)).min(1),
                runbookUrl: z.string().url().optional(),
              })
              .passthrough()
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/ledger-adapters/:ledgerAdapterId',
    alias: 'getLedgerAdapter',
    requestFormat: 'json',
    parameters: [
      {
        name: 'ledgerAdapterId',
        type: 'Path',
        schema: z.string().regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            ledgerAdapterId: z.string().regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            version: z.string().min(1).max(64),
            networkId: z.string().min(1).max(100),
            status: z.enum([
              'healthy',
              'degraded',
              'down',
              'disabled',
              'unversioned',
            ]),
            commitmentsOnly: z.boolean().optional().default(true),
            vulnerabilityBanner: z.string().max(2000).optional(),
            patchPlaybook: z
              .object({
                title: z.string().min(1).max(200),
                summary: z.string().max(2000).optional(),
                disableAnchoringDuringPatch: z
                  .boolean()
                  .optional()
                  .default(true),
                steps: z.array(z.string().max(1000)).min(1),
                runbookUrl: z.string().url().optional(),
              })
              .passthrough()
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
