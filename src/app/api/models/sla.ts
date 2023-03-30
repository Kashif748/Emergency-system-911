/* tslint:disable */
/* eslint-disable */
import { Group } from './group';
import { Kpi } from './kpi';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Sla {
  centerName: string;
  contractExpiryDate?: string;
  contractNo: string;
  contractor: OrgStructure;
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  group: Group;
  id?: number;
  isActive?: boolean;
  kpi?: Kpi;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

