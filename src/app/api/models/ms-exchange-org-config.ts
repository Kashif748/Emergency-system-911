/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface MsExchangeOrgConfig {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  domain: string;
  dueDateShift?: number;
  folderName: string;
  id?: number;
  isActive?: boolean;
  orgStructure: OrgStructure;
  password: string;
  server: string;
  size?: number;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  username: string;
}

