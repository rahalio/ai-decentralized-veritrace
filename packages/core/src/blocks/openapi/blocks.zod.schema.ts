import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const emitLearningBlock_Body = z
  .object({
    spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
    learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
    activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
    lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    events: z.array(z.object({}).partial().passthrough()).min(1),
    anchorIfPolicyAllows: z.boolean().optional().default(true),
  })
  .passthrough();
const LearnerId = z.string();
const SpaceId = z.string();
const LearningBlockStatus = z.enum(['delivered', 'pending_lbr', 'deleted']);
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
const BlockId = z.string();
const ActivityId = z.string();
const LbrEndpointId = z.string();
const CommitmentId = z.string();
const LearningBlock = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
    learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
    activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
    contentHash: z.string().min(16).max(128),
    signature: z.string().max(512).optional(),
    lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['delivered', 'pending_lbr', 'deleted']),
    commitmentId: z
      .string()
      .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    deliveredAt: z.string().datetime({ offset: true }).optional(),
    deletedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LearningBlockListData = z
  .object({
    items: z.array(
      z
        .object({
          blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
          spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
          learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
          activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
          contentHash: z.string().min(16).max(128),
          signature: z.string().max(512).optional(),
          lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['delivered', 'pending_lbr', 'deleted']),
          commitmentId: z
            .string()
            .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          deliveredAt: z.string().datetime({ offset: true }).optional(),
          deletedAt: z.string().datetime({ offset: true }).optional(),
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
const LearningBlockListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
              spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
              learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
              activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
              contentHash: z.string().min(16).max(128),
              signature: z.string().max(512).optional(),
              lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['delivered', 'pending_lbr', 'deleted']),
              commitmentId: z
                .string()
                .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              deliveredAt: z.string().datetime({ offset: true }).optional(),
              deletedAt: z.string().datetime({ offset: true }).optional(),
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
const LearningBlockEvent = z.object({}).partial().passthrough();
const LearningBlockCreate = z
  .object({
    spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
    learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
    activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
    lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
    events: z.array(z.object({}).partial().passthrough()).min(1),
    anchorIfPolicyAllows: z.boolean().optional().default(true),
  })
  .passthrough();
const LearningBlockResponse = z
  .object({
    data: z
      .object({
        blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
        spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
        learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
        activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
        contentHash: z.string().min(16).max(128),
        signature: z.string().max(512).optional(),
        lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['delivered', 'pending_lbr', 'deleted']),
        commitmentId: z
          .string()
          .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        deliveredAt: z.string().datetime({ offset: true }).optional(),
        deletedAt: z.string().datetime({ offset: true }).optional(),
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
const DeletionRequestCreate = z
  .object({ reason: z.string().max(2000) })
  .partial()
  .passthrough();
const DeletionRequestId = z.string();
const DeletionRequestStatus = z.enum([
  'pending',
  'in_progress',
  'completed',
  'failed',
]);
const DeletionRequest = z
  .object({
    deletionRequestId: z.string().regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
    lbrEndpointId: z
      .string()
      .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
    reason: z.string().max(2000).optional(),
    failureDetail: z.string().max(2000).optional(),
    requestedAt: z.string().datetime({ offset: true }),
    completedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DeletionRequestResponse = z
  .object({
    data: z
      .object({
        deletionRequestId: z.string().regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
        blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
        learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
        lbrEndpointId: z
          .string()
          .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
        reason: z.string().max(2000).optional(),
        failureDetail: z.string().max(2000).optional(),
        requestedAt: z.string().datetime({ offset: true }),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
const DeletionRequestListData = z
  .object({
    items: z.array(
      z
        .object({
          deletionRequestId: z.string().regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
          blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
          learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
          lbrEndpointId: z
            .string()
            .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
          reason: z.string().max(2000).optional(),
          failureDetail: z.string().max(2000).optional(),
          requestedAt: z.string().datetime({ offset: true }),
          completedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const DeletionRequestListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              deletionRequestId: z
                .string()
                .regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
              blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
              learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
              lbrEndpointId: z
                .string()
                .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
              reason: z.string().max(2000).optional(),
              failureDetail: z.string().max(2000).optional(),
              requestedAt: z.string().datetime({ offset: true }),
              completedAt: z.string().datetime({ offset: true }).optional(),
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

export const schemas: any = {
  emitLearningBlock_Body,
  LearnerId,
  SpaceId,
  LearningBlockStatus,
  Problem,
  BlockId,
  ActivityId,
  LbrEndpointId,
  CommitmentId,
  LearningBlock,
  LearningBlockListData,
  ResponseMeta,
  LearningBlockListResponse,
  LearningBlockEvent,
  LearningBlockCreate,
  LearningBlockResponse,
  DeletionRequestCreate,
  DeletionRequestId,
  DeletionRequestStatus,
  DeletionRequest,
  DeletionRequestResponse,
  DeletionRequestListData,
  DeletionRequestListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/blocks',
    alias: 'listLearningBlocks',
    description: `Metadata only (hashes, status, LBR linkage). Raw traces stay in the learner LBR.
Filter by learnerId when listing a learner&#x27;s blocks.
`,
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
        name: 'learnerId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'spaceId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['delivered', 'pending_lbr', 'deleted']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
                  contentHash: z.string().min(16).max(128),
                  signature: z.string().max(512).optional(),
                  lbrEndpointId: z
                    .string()
                    .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['delivered', 'pending_lbr', 'deleted']),
                  commitmentId: z
                    .string()
                    .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  deliveredAt: z.string().datetime({ offset: true }).optional(),
                  deletedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/blocks',
    alias: 'emitLearningBlock',
    description: `Assemble a signed learning block at activity close and deliver to the learner LBR.
If no LBR is linked, status stays pending_lbr — do not silently centralise raw traces.
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: emitLearningBlock_Body,
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
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
            learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
            contentHash: z.string().min(16).max(128),
            signature: z.string().max(512).optional(),
            lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['delivered', 'pending_lbr', 'deleted']),
            commitmentId: z
              .string()
              .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            deliveredAt: z.string().datetime({ offset: true }).optional(),
            deletedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/blocks/:blockId',
    alias: 'getLearningBlockMeta',
    description: `Returns metadata and hashes only — not raw activity events.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'blockId',
        type: 'Path',
        schema: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
            learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            activityId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
            contentHash: z.string().min(16).max(128),
            signature: z.string().max(512).optional(),
            lbrEndpointId: z.string().regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['delivered', 'pending_lbr', 'deleted']),
            commitmentId: z
              .string()
              .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            deliveredAt: z.string().datetime({ offset: true }).optional(),
            deletedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/blocks/:blockId/deletion-requests',
    alias: 'createDeletionRequest',
    description: `Withdrawal path (BR-7). Deletes raw blocks in the LBR while leaving unlinkable
chain commitments intact.
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ reason: z.string().max(2000) })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'blockId',
        type: 'Path',
        schema: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            deletionRequestId: z.string().regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            lbrEndpointId: z
              .string()
              .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
            reason: z.string().max(2000).optional(),
            failureDetail: z.string().max(2000).optional(),
            requestedAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/deletion-requests',
    alias: 'listDeletionRequests',
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
        name: 'learnerId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['pending', 'in_progress', 'completed', 'failed'])
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
                  deletionRequestId: z
                    .string()
                    .regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
                  blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  lbrEndpointId: z
                    .string()
                    .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  status: z.enum([
                    'pending',
                    'in_progress',
                    'completed',
                    'failed',
                  ]),
                  reason: z.string().max(2000).optional(),
                  failureDetail: z.string().max(2000).optional(),
                  requestedAt: z.string().datetime({ offset: true }),
                  completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/deletion-requests/:deletionRequestId',
    alias: 'getDeletionRequest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'deletionRequestId',
        type: 'Path',
        schema: z.string().regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            deletionRequestId: z.string().regex(/^del_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            learnerId: z.string().regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            lbrEndpointId: z
              .string()
              .regex(/^lbr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
            reason: z.string().max(2000).optional(),
            failureDetail: z.string().max(2000).optional(),
            requestedAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
