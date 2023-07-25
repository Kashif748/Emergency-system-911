/* tslint:disable */
/* eslint-disable */
import { BcActivityAnalysis } from './bc-activity-analysis';
import { Documents } from './documents';
export interface BcActivityAnalysisWorkLog {
  activityAnalysis?: BcActivityAnalysis;
  attachments?: Array<Documents>;
  auto?: boolean;
  createdBy?: { [key: string]: {  } };
  createdOn?: string;
  hasAttachments?: boolean;
  id?: number;
  isActive?: boolean;
  notes?: string;
  updatedBy?: { [key: string]: {  } };
  updatedOn?: string;
}

