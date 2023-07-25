/* tslint:disable */
/* eslint-disable */
import { BcActivityAnalysis } from './bc-activity-analysis';
import { BcAnalysisStatus } from './bc-analysis-status';
export interface BcActivityAnalysisWorkflow {
  activityAnalysis: BcActivityAnalysis;
  createdBy?: number;
  createdOn?: string;
  id?: number;
  notes?: string;
  status: BcAnalysisStatus;
}

