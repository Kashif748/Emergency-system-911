/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
import { BcPartners } from './bc-partners';
export interface BcActivityDependencyExternal {
  activity: BcActivities;
  createdBy: number;
  createdOn: string;
  cycle: BcCycles;
  dependencyDetails?: string;
  id?: number;
  isActive: boolean;
  isFound: boolean;
  orderSeq?: number;
  partner?: BcPartners;
}

