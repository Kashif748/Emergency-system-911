/* tslint:disable */
/* eslint-disable */
import { BcActivityAnalysis } from './bc-activity-analysis';
import { BcAnalysisStatus } from './bc-analysis-status';
import { BcResources } from './bc-resources';
import { BcWorkLogTypes } from './bc-work-log-types';
import { Documents } from './documents';
export interface BcActivityAnalysisWorkLog {
  actionType?: BcWorkLogTypes;
  activityAnalysis?: BcActivityAnalysis;
  activityAnalysisStatus?: BcAnalysisStatus;
  attachments?: Array<Documents>;
  createdBy?: { [key: string]: {  } };
  createdOn?: string;
  hasAttachments?: boolean;
  id?: number;
  isActive?: boolean;
  notes: string;
  resource?: BcResources;
  updatedBy?: { [key: string]: {  } };
  updatedOn?: string;
}

