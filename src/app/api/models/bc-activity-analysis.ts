/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcAnalysisStatus } from './bc-analysis-status';
import { BcCycles } from './bc-cycles';
import { Bcrto } from './bcrto';
import { BcRecoveryPriorities } from './bc-recovery-priorities';
export interface BcActivityAnalysis {
  activity: BcActivities;
  capacity?: number;
  createdBy?: { [key: string]: {  } };
  cycle: BcCycles;
  id?: number;
  isActive?: boolean;
  recoveryPriority?: BcRecoveryPriorities;
  referenceId?: number;
  remote?: boolean;
  rto?: Bcrto;
  sequenceNumber?: number;
  skills?: string;
  spof?: string;
  status: BcAnalysisStatus;
}

