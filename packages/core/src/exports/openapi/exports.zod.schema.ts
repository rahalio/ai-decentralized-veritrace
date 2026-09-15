import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createResearchExport_Body = z
  .object({
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    blockIds: z.array(z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)).min(1),
    verificationIds: z
      .array(z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    studyId: z.string().max(100).optional(),
    studyTitle: z.string().max(300).optional(),
    allowNoAnchor: z.boolean().optional().default(false),
  })
  .passthrough();
const ConsentId = z.string();
const ResearchExportStatus = z.enum(['pending', 'ready', 'failed']);
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
const ExportId = z.string();
const SpaceId = z.string();
const UserId = z.string();
const BlockId = z.string();
const VerificationId = z.string();
const LearnerId = z.string();
const ConsentArtefactSummary = z
  .object({
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    purpose: z.string().max(2000),
    status: z.enum(['active', 'revoked', 'expired']),
    expiresAt: z.string().datetime({ offset: true }).optional(),
    learnerId: z
      .string()
      .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    researcherId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const NecessityDecisionId = z.string();
const NecessitySummary = z
  .object({
    necessityDecisionId: z.string().regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
    spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
    outcome: z.enum(['permissioned', 'permissionless', 'no_chain']),
    useBlockchain: z.boolean(),
    rationaleExcerpt: z.string().max(500),
    decidedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const EthicsPackageSummary = z
  .object({
    studyId: z.string().max(100).optional(),
    studyTitle: z.string().max(300).optional(),
    includesVerificationProofs: z.boolean(),
    includesConsentArtefacts: z.boolean(),
    includesNecessitySummary: z.boolean(),
    blockCount: z.number().int().gte(0),
    validVerificationCount: z.number().int().gte(0).optional(),
    noAnchorCount: z.number().int().gte(0).optional(),
    mismatchCount: z.number().int().gte(0).optional(),
    ethicsShareUrl: z.string().url().optional(),
  })
  .passthrough();
const ResearchExport = z
  .object({
    exportId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    spaceId: z
      .string()
      .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    researcherId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['pending', 'ready', 'failed']),
    blockIds: z.array(z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)),
    verificationIds: z.array(z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/)),
    consentArtefacts: z
      .array(
        z
          .object({
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            purpose: z.string().max(2000),
            status: z.enum(['active', 'revoked', 'expired']),
            expiresAt: z.string().datetime({ offset: true }).optional(),
            learnerId: z
              .string()
              .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            researcherId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
          })
          .passthrough()
      )
      .optional(),
    necessitySummary: z
      .object({
        necessityDecisionId: z.string().regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
        spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
        outcome: z.enum(['permissioned', 'permissionless', 'no_chain']),
        useBlockchain: z.boolean(),
        rationaleExcerpt: z.string().max(500),
        decidedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
    ethicsPackage: z
      .object({
        studyId: z.string().max(100).optional(),
        studyTitle: z.string().max(300).optional(),
        includesVerificationProofs: z.boolean(),
        includesConsentArtefacts: z.boolean(),
        includesNecessitySummary: z.boolean(),
        blockCount: z.number().int().gte(0),
        validVerificationCount: z.number().int().gte(0).optional(),
        noAnchorCount: z.number().int().gte(0).optional(),
        mismatchCount: z.number().int().gte(0).optional(),
        ethicsShareUrl: z.string().url().optional(),
      })
      .passthrough()
      .optional(),
    downloadUrl: z.string().url().optional(),
    failureDetail: z.string().max(2000).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    readyAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ResearchExportListData = z
  .object({
    items: z.array(
      z
        .object({
          exportId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
          consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
          spaceId: z
            .string()
            .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          researcherId: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          status: z.enum(['pending', 'ready', 'failed']),
          blockIds: z.array(z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)),
          verificationIds: z.array(
            z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/)
          ),
          consentArtefacts: z
            .array(
              z
                .object({
                  consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                  purpose: z.string().max(2000),
                  status: z.enum(['active', 'revoked', 'expired']),
                  expiresAt: z.string().datetime({ offset: true }).optional(),
                  learnerId: z
                    .string()
                    .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  researcherId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                })
                .passthrough()
            )
            .optional(),
          necessitySummary: z
            .object({
              necessityDecisionId: z
                .string()
                .regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
              spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
              outcome: z.enum(['permissioned', 'permissionless', 'no_chain']),
              useBlockchain: z.boolean(),
              rationaleExcerpt: z.string().max(500),
              decidedAt: z.string().datetime({ offset: true }),
            })
            .partial()
            .passthrough()
            .optional(),
          ethicsPackage: z
            .object({
              studyId: z.string().max(100).optional(),
              studyTitle: z.string().max(300).optional(),
              includesVerificationProofs: z.boolean(),
              includesConsentArtefacts: z.boolean(),
              includesNecessitySummary: z.boolean(),
              blockCount: z.number().int().gte(0),
              validVerificationCount: z.number().int().gte(0).optional(),
              noAnchorCount: z.number().int().gte(0).optional(),
              mismatchCount: z.number().int().gte(0).optional(),
              ethicsShareUrl: z.string().url().optional(),
            })
            .passthrough()
            .optional(),
          downloadUrl: z.string().url().optional(),
          failureDetail: z.string().max(2000).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          readyAt: z.string().datetime({ offset: true }).optional(),
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
const ResearchExportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              exportId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
              consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
              spaceId: z
                .string()
                .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              researcherId: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              status: z.enum(['pending', 'ready', 'failed']),
              blockIds: z.array(
                z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
              verificationIds: z.array(
                z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
              consentArtefacts: z
                .array(
                  z
                    .object({
                      consentId: z
                        .string()
                        .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                      purpose: z.string().max(2000),
                      status: z.enum(['active', 'revoked', 'expired']),
                      expiresAt: z
                        .string()
                        .datetime({ offset: true })
                        .optional(),
                      learnerId: z
                        .string()
                        .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
                        .optional(),
                      researcherId: z
                        .string()
                        .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                        .optional(),
                    })
                    .passthrough()
                )
                .optional(),
              necessitySummary: z
                .object({
                  necessityDecisionId: z
                    .string()
                    .regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
                  spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  outcome: z.enum([
                    'permissioned',
                    'permissionless',
                    'no_chain',
                  ]),
                  useBlockchain: z.boolean(),
                  rationaleExcerpt: z.string().max(500),
                  decidedAt: z.string().datetime({ offset: true }),
                })
                .partial()
                .passthrough()
                .optional(),
              ethicsPackage: z
                .object({
                  studyId: z.string().max(100).optional(),
                  studyTitle: z.string().max(300).optional(),
                  includesVerificationProofs: z.boolean(),
                  includesConsentArtefacts: z.boolean(),
                  includesNecessitySummary: z.boolean(),
                  blockCount: z.number().int().gte(0),
                  validVerificationCount: z.number().int().gte(0).optional(),
                  noAnchorCount: z.number().int().gte(0).optional(),
                  mismatchCount: z.number().int().gte(0).optional(),
                  ethicsShareUrl: z.string().url().optional(),
                })
                .passthrough()
                .optional(),
              downloadUrl: z.string().url().optional(),
              failureDetail: z.string().max(2000).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
              readyAt: z.string().datetime({ offset: true }).optional(),
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
const ResearchExportCreate = z
  .object({
    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    blockIds: z.array(z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)).min(1),
    verificationIds: z
      .array(z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    studyId: z.string().max(100).optional(),
    studyTitle: z.string().max(300).optional(),
    allowNoAnchor: z.boolean().optional().default(false),
  })
  .passthrough();
const ResearchExportResponse = z
  .object({
    data: z
      .object({
        exportId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
        consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
        spaceId: z
          .string()
          .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        researcherId: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum(['pending', 'ready', 'failed']),
        blockIds: z.array(z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)),
        verificationIds: z.array(
          z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/)
        ),
        consentArtefacts: z
          .array(
            z
              .object({
                consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                purpose: z.string().max(2000),
                status: z.enum(['active', 'revoked', 'expired']),
                expiresAt: z.string().datetime({ offset: true }).optional(),
                learnerId: z
                  .string()
                  .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
                  .optional(),
                researcherId: z
                  .string()
                  .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                  .optional(),
              })
              .passthrough()
          )
          .optional(),
        necessitySummary: z
          .object({
            necessityDecisionId: z
              .string()
              .regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
            spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
            outcome: z.enum(['permissioned', 'permissionless', 'no_chain']),
            useBlockchain: z.boolean(),
            rationaleExcerpt: z.string().max(500),
            decidedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
        ethicsPackage: z
          .object({
            studyId: z.string().max(100).optional(),
            studyTitle: z.string().max(300).optional(),
            includesVerificationProofs: z.boolean(),
            includesConsentArtefacts: z.boolean(),
            includesNecessitySummary: z.boolean(),
            blockCount: z.number().int().gte(0),
            validVerificationCount: z.number().int().gte(0).optional(),
            noAnchorCount: z.number().int().gte(0).optional(),
            mismatchCount: z.number().int().gte(0).optional(),
            ethicsShareUrl: z.string().url().optional(),
          })
          .passthrough()
          .optional(),
        downloadUrl: z.string().url().optional(),
        failureDetail: z.string().max(2000).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
        readyAt: z.string().datetime({ offset: true }).optional(),
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
  createResearchExport_Body,
  ConsentId,
  ResearchExportStatus,
  Problem,
  ExportId,
  SpaceId,
  UserId,
  BlockId,
  VerificationId,
  LearnerId,
  ConsentArtefactSummary,
  NecessityDecisionId,
  NecessitySummary,
  EthicsPackageSummary,
  ResearchExport,
  ResearchExportListData,
  ResponseMeta,
  ResearchExportListResponse,
  ResearchExportCreate,
  ResearchExportResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/exports',
    alias: 'listResearchExports',
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
        name: 'consentId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['pending', 'ready', 'failed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  exportId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                  spaceId: z
                    .string()
                    .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  researcherId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  status: z.enum(['pending', 'ready', 'failed']),
                  blockIds: z.array(
                    z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
                  verificationIds: z.array(
                    z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
                  consentArtefacts: z
                    .array(
                      z
                        .object({
                          consentId: z
                            .string()
                            .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                          purpose: z.string().max(2000),
                          status: z.enum(['active', 'revoked', 'expired']),
                          expiresAt: z
                            .string()
                            .datetime({ offset: true })
                            .optional(),
                          learnerId: z
                            .string()
                            .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
                            .optional(),
                          researcherId: z
                            .string()
                            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                            .optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  necessitySummary: z
                    .object({
                      necessityDecisionId: z
                        .string()
                        .regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
                      spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
                      outcome: z.enum([
                        'permissioned',
                        'permissionless',
                        'no_chain',
                      ]),
                      useBlockchain: z.boolean(),
                      rationaleExcerpt: z.string().max(500),
                      decidedAt: z.string().datetime({ offset: true }),
                    })
                    .partial()
                    .passthrough()
                    .optional(),
                  ethicsPackage: z
                    .object({
                      studyId: z.string().max(100).optional(),
                      studyTitle: z.string().max(300).optional(),
                      includesVerificationProofs: z.boolean(),
                      includesConsentArtefacts: z.boolean(),
                      includesNecessitySummary: z.boolean(),
                      blockCount: z.number().int().gte(0),
                      validVerificationCount: z
                        .number()
                        .int()
                        .gte(0)
                        .optional(),
                      noAnchorCount: z.number().int().gte(0).optional(),
                      mismatchCount: z.number().int().gte(0).optional(),
                      ethicsShareUrl: z.string().url().optional(),
                    })
                    .passthrough()
                    .optional(),
                  downloadUrl: z.string().url().optional(),
                  failureDetail: z.string().max(2000).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                  readyAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/exports',
    alias: 'createResearchExport',
    description: `Bundle verified blocks with consent artefacts and necessity summary.
Generation is blocked if any selected block failed verification (unless policy allows no_anchor).
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createResearchExport_Body,
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
            exportId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            spaceId: z
              .string()
              .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            researcherId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['pending', 'ready', 'failed']),
            blockIds: z.array(z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)),
            verificationIds: z.array(
              z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            consentArtefacts: z
              .array(
                z
                  .object({
                    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                    purpose: z.string().max(2000),
                    status: z.enum(['active', 'revoked', 'expired']),
                    expiresAt: z.string().datetime({ offset: true }).optional(),
                    learnerId: z
                      .string()
                      .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
                      .optional(),
                    researcherId: z
                      .string()
                      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                      .optional(),
                  })
                  .passthrough()
              )
              .optional(),
            necessitySummary: z
              .object({
                necessityDecisionId: z
                  .string()
                  .regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
                spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
                outcome: z.enum(['permissioned', 'permissionless', 'no_chain']),
                useBlockchain: z.boolean(),
                rationaleExcerpt: z.string().max(500),
                decidedAt: z.string().datetime({ offset: true }),
              })
              .partial()
              .passthrough()
              .optional(),
            ethicsPackage: z
              .object({
                studyId: z.string().max(100).optional(),
                studyTitle: z.string().max(300).optional(),
                includesVerificationProofs: z.boolean(),
                includesConsentArtefacts: z.boolean(),
                includesNecessitySummary: z.boolean(),
                blockCount: z.number().int().gte(0),
                validVerificationCount: z.number().int().gte(0).optional(),
                noAnchorCount: z.number().int().gte(0).optional(),
                mismatchCount: z.number().int().gte(0).optional(),
                ethicsShareUrl: z.string().url().optional(),
              })
              .passthrough()
              .optional(),
            downloadUrl: z.string().url().optional(),
            failureDetail: z.string().max(2000).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            readyAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/exports/:exportId',
    alias: 'getResearchExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'exportId',
        type: 'Path',
        schema: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exportId: z.string().regex(/^exp_[0-9A-HJKMNP-TV-Z]{26}$/),
            consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            spaceId: z
              .string()
              .regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            researcherId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['pending', 'ready', 'failed']),
            blockIds: z.array(z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)),
            verificationIds: z.array(
              z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            consentArtefacts: z
              .array(
                z
                  .object({
                    consentId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                    purpose: z.string().max(2000),
                    status: z.enum(['active', 'revoked', 'expired']),
                    expiresAt: z.string().datetime({ offset: true }).optional(),
                    learnerId: z
                      .string()
                      .regex(/^lrn_[0-9A-HJKMNP-TV-Z]{26}$/)
                      .optional(),
                    researcherId: z
                      .string()
                      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                      .optional(),
                  })
                  .passthrough()
              )
              .optional(),
            necessitySummary: z
              .object({
                necessityDecisionId: z
                  .string()
                  .regex(/^nec_[0-9A-HJKMNP-TV-Z]{26}$/),
                spaceId: z.string().regex(/^spc_[0-9A-HJKMNP-TV-Z]{26}$/),
                outcome: z.enum(['permissioned', 'permissionless', 'no_chain']),
                useBlockchain: z.boolean(),
                rationaleExcerpt: z.string().max(500),
                decidedAt: z.string().datetime({ offset: true }),
              })
              .partial()
              .passthrough()
              .optional(),
            ethicsPackage: z
              .object({
                studyId: z.string().max(100).optional(),
                studyTitle: z.string().max(300).optional(),
                includesVerificationProofs: z.boolean(),
                includesConsentArtefacts: z.boolean(),
                includesNecessitySummary: z.boolean(),
                blockCount: z.number().int().gte(0),
                validVerificationCount: z.number().int().gte(0).optional(),
                noAnchorCount: z.number().int().gte(0).optional(),
                mismatchCount: z.number().int().gte(0).optional(),
                ethicsShareUrl: z.string().url().optional(),
              })
              .passthrough()
              .optional(),
            downloadUrl: z.string().url().optional(),
            failureDetail: z.string().max(2000).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            readyAt: z.string().datetime({ offset: true }).optional(),
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
