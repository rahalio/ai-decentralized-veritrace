/**
 * IdGeneratorService Port — Veritrace prefixes.
 */

import type { DomainCode } from '@veritrace/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  spcId(): string;
  blkId(): string;
  cmtId(): string;
  cnsId(): string;
  vrfId(): string;
  expId(): string;
  adpId(): string;
  necId(): string;
  acrId(): string;
  tmpId(): string;
  delId(): string;
  lbrId(): string;
  lrnId(): string;
  actId(): string;
  ldgId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
