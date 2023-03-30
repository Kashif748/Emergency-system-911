/* tslint:disable */
/* eslint-disable */
import { Confidentialty } from './confidentialty';
import { Incident } from './incident';
import { OperationalReportStatus } from './operational-report-status';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface OperationalReport {
  confidentialty: Confidentialty;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn: string;
  id?: number;
  incident: Incident;
  operationHistory?: string;
  operationUpdate?: string;
  status?: OperationalReportStatus;
}

