/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
import { BcOrgHierarchy } from './bc-org-hierarchy';
export interface BcActivityDependencyInternal {
  activity: BcActivities;
  createdOn?: string;
  cycle: BcCycles;
  dependencyDetails?: string;
  id?: number;
  isActive: boolean;
  isFound: boolean;
  orderSeq?: number;
  orgHierarchy?: BcOrgHierarchy;
  referenceId?: number;
  relatedActivity?: BcActivities;
}

