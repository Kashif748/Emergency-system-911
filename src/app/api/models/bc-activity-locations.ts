/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
import { BcLocations } from './bc-locations';
export interface BcActivityLocations {
  activity: BcActivities;
  cycle: BcCycles;
  id?: number;
  isActive?: boolean;
  location?: BcLocations;
  referenceId?: number;
  sequenceNumber?: number;
}

