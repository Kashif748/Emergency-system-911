/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchy } from './bc-org-hierarchy';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface BcOrgHierarchyCoordinators {
  id?: number;
  orgHierarchy?: BcOrgHierarchy;
  user?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

