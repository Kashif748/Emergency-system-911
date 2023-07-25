/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchyType } from './bc-org-hierarchy-type';
import { OrgStructure } from './org-structure';
export interface BcOrgHierarchy {
  bcOrgHirType?: BcOrgHierarchyType;
  coordinatorId?: number;
  id?: number;
  isActive?: boolean;
  managerId?: number;
  nameAr?: string;
  nameEn?: string;
  orgStructure: OrgStructure;
  parentId?: number;
}

