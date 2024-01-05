/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface ExternalPhonebook {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  id?: number;
  isActive?: boolean;
  isInternal?: boolean;
  jobTitle?: string;
  mobileNumber: string;
  nameAr?: string;
  nameEn?: string;
  notes?: string;
  orgName: string;
  orgStructure?: OrgStructure;
  phoneNumber?: string;
  referenceOrgId?: OrgStructure;
  title?: string;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

