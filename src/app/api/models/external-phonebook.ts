/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface ExternalPhonebook {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  firstName: string;
  id?: number;
  isActive?: boolean;
  jobTitle?: string;
  lastName: string;
  middleName?: string;
  mobileNumber: string;
  orgName: string;
  orgStructure?: OrgStructure;
  phoneNumber?: string;
  title?: string;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

