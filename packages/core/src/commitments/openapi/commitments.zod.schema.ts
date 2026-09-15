import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const anchorCommitment_Body = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    ledgerNetworkId: z.string().max(100).optional(),
    ledgerAdapterId: z
      .string()
      .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    containsPersonalData: z.literal(false).optional().default(false),
  })
  .passthrough();
const BlockId = z.string();
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
const CommitmentId = z.string();
const SpaceId = z.string();
const LedgerAdapterId = z.string();
const ChainCommitment = z
  .object({
    commitmentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    spaceId: z
      .string()
      .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    commitmentHash: z.string().min(16).max(128),
    ledgerTxId: z.string().max(200).optional(),
    ledgerNetworkId: z.string().max(100).optional(),
    ledgerAdapterId: z
      .string()
      .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    containsPersonalData: z.literal(false),
    anchoredAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ChainCommitmentListData = z
  .object({
    items: z.array(
      z
        .object({
          commitmentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
          blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
          spaceId: z
            .string()
            .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          commitmentHash: z.string().min(16).max(128),
          ledgerTxId: z.string().max(200).optional(),
          ledgerNetworkId: z.string().max(100).optional(),
          ledgerAdapterId: z
            .string()
            .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          containsPersonalData: z.literal(false),
          anchoredAt: z.string().datetime({ offset: true }),
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
const ChainCommitmentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              commitmentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
              blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
              spaceId: z
                .string()
                .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              commitmentHash: z.string().min(16).max(128),
              ledgerTxId: z.string().max(200).optional(),
              ledgerNetworkId: z.string().max(100).optional(),
              ledgerAdapterId: z
                .string()
                .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              containsPersonalData: z.literal(false),
              anchoredAt: z.string().datetime({ offset: true }),
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
const ChainCommitmentCreate = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    ledgerNetworkId: z.string().max(100).optional(),
    ledgerAdapterId: z
      .string()
      .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    containsPersonalData: z.literal(false).optional().default(false),
  })
  .passthrough();
const ChainCommitmentResponse = z
  .object({
    data: z
      .object({
        commitmentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
        blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
        spaceId: z
          .string()
          .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        commitmentHash: z.string().min(16).max(128),
        ledgerTxId: z.string().max(200).optional(),
        ledgerNetworkId: z.string().max(100).optional(),
        ledgerAdapterId: z
          .string()
          .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        containsPersonalData: z.literal(false),
        anchoredAt: z.string().datetime({ offset: true }),
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

export const schemas: any = {
  anchorCommitment_Body,
  BlockId,
  Problem,
  CommitmentId,
  SpaceId,
  LedgerAdapterId,
  ChainCommitment,
  ChainCommitmentListData,
  ResponseMeta,
  ChainCommitmentListResponse,
  ChainCommitmentCreate,
  ChainCommitmentResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/commitments',
    alias: 'listCommitments',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  commitmentId: z
                    .string()
                    .regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  spaceId: z
                    .string()
                    .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  commitmentHash: z.string().min(16).max(128),
                  ledgerTxId: z.string().max(200).optional(),
                  ledgerNetworkId: z.string().max(100).optional(),
                  ledgerAdapterId: z
                    .string()
                    .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  containsPersonalData: z.literal(false),
                  anchoredAt: z.string().datetime({ offset: true }),
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
    path: '/v1/commitments',
    alias: 'anchorCommitment',
    description: `Write a content-hash commitment to the configured ledger. Rejected when the
space has no necessity decision allowing blockchain, or when personal data
would be included (&#x60;containsPersonalData&#x60; must be false).
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: anchorCommitment_Body,
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
            commitmentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            spaceId: z
              .string()
              .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            commitmentHash: z.string().min(16).max(128),
            ledgerTxId: z.string().max(200).optional(),
            ledgerNetworkId: z.string().max(100).optional(),
            ledgerAdapterId: z
              .string()
              .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            containsPersonalData: z.literal(false),
            anchoredAt: z.string().datetime({ offset: true }),
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
    path: '/v1/commitments/:commitmentId',
    alias: 'getCommitment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'commitmentId',
        type: 'Path',
        schema: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            commitmentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            spaceId: z
              .string()
              .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            commitmentHash: z.string().min(16).max(128),
            ledgerTxId: z.string().max(200).optional(),
            ledgerNetworkId: z.string().max(100).optional(),
            ledgerAdapterId: z
              .string()
              .regex(/^ldg_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            containsPersonalData: z.literal(false),
            anchoredAt: z.string().datetime({ offset: true }),
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
