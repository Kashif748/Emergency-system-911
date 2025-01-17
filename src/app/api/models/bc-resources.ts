/* tslint:disable */
/* eslint-disable */
import { BcAnalysisStatus } from './bc-analysis-status';
import { BcCycles } from './bc-cycles';
import { BcOrgHierarchy } from './bc-org-hierarchy';
export interface BcResources {
  createdBy?: { [key: string]: {  } };
  createdOn?: string;
  cycle?: BcCycles;
  id?: number;
  isActive?: boolean;
  orgHierarchy?: BcOrgHierarchy;
  staffOnSite?: number;
  staffRemotely?: number;
  status?: BcAnalysisStatus;
}

