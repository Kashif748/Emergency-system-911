/* tslint:disable */
/* eslint-disable */
import { BcCycleStatus } from './bc-cycle-status';
import { BcVersions } from './bc-versions';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface BcCycles {
  bcVersions?: BcVersions;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  dueDate?: string;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: OrgStructure;
  status?: BcCycleStatus;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  updatedOn?: string;
  versionId?: number;
  year?: number;
}

