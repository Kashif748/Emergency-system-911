/* tslint:disable */
/* eslint-disable */
import { OperationalReportStatus } from './operational-report-status';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface AdcdaAvailabilityReport {
  active?: boolean;
  body: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  id?: number;
  status?: OperationalReportStatus;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

