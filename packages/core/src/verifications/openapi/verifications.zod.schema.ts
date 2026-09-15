import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const verifyLearningBlock_Body = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    allowNoAnchor: z.boolean().optional().default(false),
  })
  .passthrough();
const acknowledgeTamperEvent_Body = z
  .object({
    assignedTo: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    note: z.string().max(2000),
  })
  .partial()
  .passthrough();
const BlockId = z.string();
const VerificationStatus = z.enum([
  'valid',
  'mismatch',
  'consent_denied',
  'lbr_offline',
  'no_anchor',
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
const VerificationId = z.string();
const ConsentId = z.string();
const CommitmentId = z.string();
const TamperEventId = z.string();
const Verification = z
  .object({
    verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    consentId: z
      .string()
      .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    commitmentId: z
      .string()
      .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum([
      'valid',
      'mismatch',
      'consent_denied',
      'lbr_offline',
      'no_anchor',
    ]),
    expectedHash: z.string().max(128).optional(),
    observedHash: z.string().max(128).optional(),
    tamperEventId: z
      .string()
      .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    detail: z.string().max(2000).optional(),
    verifiedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const VerificationListData = z
  .object({
    items: z.array(
      z
        .object({
          verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
          blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
          consentId: z
            .string()
            .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          commitmentId: z
            .string()
            .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          status: z.enum([
            'valid',
            'mismatch',
            'consent_denied',
            'lbr_offline',
            'no_anchor',
          ]),
          expectedHash: z.string().max(128).optional(),
          observedHash: z.string().max(128).optional(),
          tamperEventId: z
            .string()
            .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          detail: z.string().max(2000).optional(),
          verifiedAt: z.string().datetime({ offset: true }),
          createdAt: z.string().datetime({ offset: true }),
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
const VerificationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
              blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
              consentId: z
                .string()
                .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              commitmentId: z
                .string()
                .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              status: z.enum([
                'valid',
                'mismatch',
                'consent_denied',
                'lbr_offline',
                'no_anchor',
              ]),
              expectedHash: z.string().max(128).optional(),
              observedHash: z.string().max(128).optional(),
              tamperEventId: z
                .string()
                .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              detail: z.string().max(2000).optional(),
              verifiedAt: z.string().datetime({ offset: true }),
              createdAt: z.string().datetime({ offset: true }),
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
const VerificationCreate = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    allowNoAnchor: z.boolean().optional().default(false),
  })
  .passthrough();
const VerificationResponse = z
  .object({
    data: z
      .object({
        verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
        blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
        consentId: z
          .string()
          .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        commitmentId: z
          .string()
          .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum([
          'valid',
          'mismatch',
          'consent_denied',
          'lbr_offline',
          'no_anchor',
        ]),
        expectedHash: z.string().max(128).optional(),
        observedHash: z.string().max(128).optional(),
        tamperEventId: z
          .string()
          .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        detail: z.string().max(2000).optional(),
        verifiedAt: z.string().datetime({ offset: true }),
        createdAt: z.string().datetime({ offset: true }),
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
const TamperEventStatus = z.enum(['open', 'acknowledged', 'resolved']);
const UserId = z.string();
const TamperEvent = z
  .object({
    tamperEventId: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
    verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    commitmentId: z
      .string()
      .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['open', 'acknowledged', 'resolved']),
    expectedHash: z.string().max(128).optional(),
    observedHash: z.string().max(128).optional(),
    assignedTo: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    rootCause: z.string().max(4000).optional(),
    playbookRef: z.string().max(300).optional(),
    detectedAt: z.string().datetime({ offset: true }),
    acknowledgedAt: z.string().datetime({ offset: true }).optional(),
    resolvedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TamperEventListData = z
  .object({
    items: z.array(
      z
        .object({
          tamperEventId: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
          verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
          blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
          commitmentId: z
            .string()
            .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          status: z.enum(['open', 'acknowledged', 'resolved']),
          expectedHash: z.string().max(128).optional(),
          observedHash: z.string().max(128).optional(),
          assignedTo: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          rootCause: z.string().max(4000).optional(),
          playbookRef: z.string().max(300).optional(),
          detectedAt: z.string().datetime({ offset: true }),
          acknowledgedAt: z.string().datetime({ offset: true }).optional(),
          resolvedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const TamperEventListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              tamperEventId: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
              verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
              blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
              commitmentId: z
                .string()
                .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              status: z.enum(['open', 'acknowledged', 'resolved']),
              expectedHash: z.string().max(128).optional(),
              observedHash: z.string().max(128).optional(),
              assignedTo: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              rootCause: z.string().max(4000).optional(),
              playbookRef: z.string().max(300).optional(),
              detectedAt: z.string().datetime({ offset: true }),
              acknowledgedAt: z.string().datetime({ offset: true }).optional(),
              resolvedAt: z.string().datetime({ offset: true }).optional(),
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
const TamperEventResponse = z
  .object({
    data: z
      .object({
        tamperEventId: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
        verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
        blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
        commitmentId: z
          .string()
          .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum(['open', 'acknowledged', 'resolved']),
        expectedHash: z.string().max(128).optional(),
        observedHash: z.string().max(128).optional(),
        assignedTo: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        rootCause: z.string().max(4000).optional(),
        playbookRef: z.string().max(300).optional(),
        detectedAt: z.string().datetime({ offset: true }),
        acknowledgedAt: z.string().datetime({ offset: true }).optional(),
        resolvedAt: z.string().datetime({ offset: true }).optional(),
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
const TamperEventAcknowledge = z
  .object({
    assignedTo: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    note: z.string().max(2000),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  verifyLearningBlock_Body,
  acknowledgeTamperEvent_Body,
  BlockId,
  VerificationStatus,
  Problem,
  VerificationId,
  ConsentId,
  CommitmentId,
  TamperEventId,
  Verification,
  VerificationListData,
  ResponseMeta,
  VerificationListResponse,
  VerificationCreate,
  VerificationResponse,
  TamperEventStatus,
  UserId,
  TamperEvent,
  TamperEventListData,
  TamperEventListResponse,
  TamperEventResponse,
  TamperEventAcknowledge,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/tamper-events',
    alias: 'listTamperEvents',
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
        schema: z.enum(['open', 'acknowledged', 'resolved']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  tamperEventId: z
                    .string()
                    .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  verificationId: z
                    .string()
                    .regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
                  blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  commitmentId: z
                    .string()
                    .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  status: z.enum(['open', 'acknowledged', 'resolved']),
                  expectedHash: z.string().max(128).optional(),
                  observedHash: z.string().max(128).optional(),
                  assignedTo: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  rootCause: z.string().max(4000).optional(),
                  playbookRef: z.string().max(300).optional(),
                  detectedAt: z.string().datetime({ offset: true }),
                  acknowledgedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  resolvedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/tamper-events/:tamperEventId',
    alias: 'getTamperEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'tamperEventId',
        type: 'Path',
        schema: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            tamperEventId: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            commitmentId: z
              .string()
              .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['open', 'acknowledged', 'resolved']),
            expectedHash: z.string().max(128).optional(),
            observedHash: z.string().max(128).optional(),
            assignedTo: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            rootCause: z.string().max(4000).optional(),
            playbookRef: z.string().max(300).optional(),
            detectedAt: z.string().datetime({ offset: true }),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/tamper-events/:tamperEventId/acknowledge',
    alias: 'acknowledgeTamperEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: acknowledgeTamperEvent_Body.optional(),
      },
      {
        name: 'tamperEventId',
        type: 'Path',
        schema: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            tamperEventId: z.string().regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            commitmentId: z
              .string()
              .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['open', 'acknowledged', 'resolved']),
            expectedHash: z.string().max(128).optional(),
            observedHash: z.string().max(128).optional(),
            assignedTo: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            rootCause: z.string().max(4000).optional(),
            playbookRef: z.string().max(300).optional(),
            detectedAt: z.string().datetime({ offset: true }),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/verifications',
    alias: 'listVerifications',
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
        name: 'blockId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum([
            'valid',
            'mismatch',
            'consent_denied',
            'lbr_offline',
            'no_anchor',
          ])
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
                  verificationId: z
                    .string()
                    .regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
                  blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  consentId: z
                    .string()
                    .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  commitmentId: z
                    .string()
                    .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  status: z.enum([
                    'valid',
                    'mismatch',
                    'consent_denied',
                    'lbr_offline',
                    'no_anchor',
                  ]),
                  expectedHash: z.string().max(128).optional(),
                  observedHash: z.string().max(128).optional(),
                  tamperEventId: z
                    .string()
                    .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  detail: z.string().max(2000).optional(),
                  verifiedAt: z.string().datetime({ offset: true }),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/verifications',
    alias: 'verifyLearningBlock',
    description: `Recompute block hash vs anchored commitment under an active consent.
Fail closed on mismatch; LBR offline is distinct from tamper.
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: verifyLearningBlock_Body,
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
            verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z
              .string()
              .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            commitmentId: z
              .string()
              .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum([
              'valid',
              'mismatch',
              'consent_denied',
              'lbr_offline',
              'no_anchor',
            ]),
            expectedHash: z.string().max(128).optional(),
            observedHash: z.string().max(128).optional(),
            tamperEventId: z
              .string()
              .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            detail: z.string().max(2000).optional(),
            verifiedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/verifications/:verificationId',
    alias: 'getVerification',
    requestFormat: 'json',
    parameters: [
      {
        name: 'verificationId',
        type: 'Path',
        schema: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            verificationId: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z
              .string()
              .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            commitmentId: z
              .string()
              .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum([
              'valid',
              'mismatch',
              'consent_denied',
              'lbr_offline',
              'no_anchor',
            ]),
            expectedHash: z.string().max(128).optional(),
            observedHash: z.string().max(128).optional(),
            tamperEventId: z
              .string()
              .regex(/^tmp_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            detail: z.string().max(2000).optional(),
            verifiedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
