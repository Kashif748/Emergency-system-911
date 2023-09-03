/* tslint:disable */
/* eslint-disable */
import { BcAnalysisStatus } from './bc-analysis-status';
import { BcCycles } from './bc-cycles';
import { BcOrgHierarchy } from './bc-org-hierarchy';
export interface BcResources {
  createdBy?: number;
  createdOn?: string;
  cycle: BcCycles;
  id?: number;
  isActive?: boolean;
  orgHierarchy: BcOrgHierarchy;
  status: BcAnalysisStatus;
}

