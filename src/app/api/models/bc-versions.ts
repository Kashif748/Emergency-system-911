/* tslint:disable */
/* eslint-disable */
import { BcVersionsStatus } from './bc-versions-status';
import { OrgStructure } from './org-structure';
export interface BcVersions {
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgStructure: OrgStructure;
  status?: BcVersionsStatus;
}

