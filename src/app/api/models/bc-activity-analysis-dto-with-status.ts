/* tslint:disable */
/* eslint-disable */
import { ActivityAnalysisStatusAction } from './activity-analysis-status-action';
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
import { Bcrto } from './bcrto';
import { BcRecoveryPriorities } from './bc-recovery-priorities';
export interface BcActivityAnalysisDtoWithStatus {
  activity?: BcActivities;
  capacity?: number;
  createdBy?: number;
  createdOn?: string;
  cycle?: BcCycles;
  id?: number;
  isActive?: boolean;
  recoveryPriority?: BcRecoveryPriorities;
  remote?: boolean;
  rto?: Bcrto;
  skills?: string;
  spof?: string;
  status?: ActivityAnalysisStatusAction;
  updatedBy?: number;
  updatedOn?: string;
}

