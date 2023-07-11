/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
import { BcSystems } from './bc-systems';
export interface BcActivitySystems {
  activity: BcActivities;
  cycle: BcCycles;
  id?: number;
  isActive?: boolean;
  system?: BcSystems;
}

