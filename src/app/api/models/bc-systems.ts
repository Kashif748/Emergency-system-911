/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchy } from './bc-org-hierarchy';
import { OrgStructure } from './org-structure';
export interface BcSystems {
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgHierarchy?: BcOrgHierarchy;
  orgStructure: OrgStructure;
}

