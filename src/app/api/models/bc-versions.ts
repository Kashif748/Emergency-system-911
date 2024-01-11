/* tslint:disable */
/* eslint-disable */
import { BcVersionsStatus } from './bc-versions-status';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface BcVersions {
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgStructure: OrgStructure;
  referenceId?: number;
  status?: BcVersionsStatus;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  updatedOn?: string;
}

