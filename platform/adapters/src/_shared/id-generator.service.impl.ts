/**
 * ID Generator Service Implementation — Veritrace prefixes.
 */

import type { DomainCode } from '@veritrace/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@veritrace/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@veritrace/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  spcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.spaces);
  }
  blkId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.blocks);
  }
  cmtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.commitments);
  }
  cnsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consents);
  }
  vrfId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.verifications);
  }
  expId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.exports);
  }
  adpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.adapters);
  }
  necId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.necessity);
  }
  acrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.accessRequest);
  }
  tmpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tamper);
  }
  delId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.deletion);
  }
  lbrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.lbr);
  }
  lrnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.learner);
  }
  actId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.activity);
  }
  ldgId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.ledgerAdapter);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
