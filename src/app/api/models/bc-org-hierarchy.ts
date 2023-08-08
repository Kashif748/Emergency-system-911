/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchyType } from './bc-org-hierarchy-type';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface BcOrgHierarchy {
  bcOrgHirType?: BcOrgHierarchyType;
  coordinator?: (User | UserInappAuthentication | UserMiddlewareAuth);
  id?: number;
  isActive?: boolean;
  manager?: (User | UserInappAuthentication | UserMiddlewareAuth);
  nameAr?: string;
  nameEn?: string;
  orgStructure: OrgStructure;
  parentId?: number;
}

