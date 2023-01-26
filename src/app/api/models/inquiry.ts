/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
import { ReportingVia } from './reporting-via';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Inquiry {
  answer?: string;
  callDurationInMinutes?: number;
  createdDate?: string;
  id?: number;
  isActive?: boolean;
  orgStructure?: OrgStructure;
  reportedByMobile: number;
  reporterEmail?: string;
  reporterName?: string;
  reportingVia: ReportingVia;
  subject?: string;
  user?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

