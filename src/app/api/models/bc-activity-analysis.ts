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
  cycle: BcCycles;
  id?: number;
  isActive?: boolean;
  recoveryPriority?: BcRecoveryPriorities;
  remote?: boolean;
  rto?: Bcrto;
  skills?: string;
  spof?: string;
  status?: BcAnalysisStatus;
}

