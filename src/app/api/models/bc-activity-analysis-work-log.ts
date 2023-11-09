/* tslint:disable */
/* eslint-disable */
import { BcActivityAnalysis } from './bc-activity-analysis';
import { BcAnalysisStatus } from './bc-analysis-status';
import { BcResources } from './bc-resources';
import { BcWorkLogTypes } from './bc-work-log-types';
import { Documents } from './documents';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface BcActivityAnalysisWorkLog {
  actionType?: BcWorkLogTypes;
  activityAnalysis?: BcActivityAnalysis;
  activityAnalysisStatus?: BcAnalysisStatus;
  attachments?: Array<Documents>;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  hasAttachments?: boolean;
  id?: number;
  isActive?: boolean;
  notes: string;
  resource?: BcResources;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  updatedOn?: string;
}

