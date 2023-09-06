/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchyCoordinators } from './bc-org-hierarchy-coordinators';
import { BcOrgHierarchyType } from './bc-org-hierarchy-type';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface BcOrgHierarchy {
  bcOrgHirType?: BcOrgHierarchyType;
  coordinators?: Array<BcOrgHierarchyCoordinators>;
  id?: number;
  isActive?: boolean;
  manager?: (User | UserInappAuthentication | UserMiddlewareAuth);
  nameAr?: string;
  nameEn?: string;
  orgStructure: OrgStructure;
  parentId?: number;
}

