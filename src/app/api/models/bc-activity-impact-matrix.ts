/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
import { BcImpactLevel } from './bc-impact-level';
import { BcImpactTypes } from './bc-impact-types';
import { Bcrto } from './bcrto';
export interface BcActivityImpactMatrix {
  activity: BcActivities;
  bcImpactLevel?: BcImpactLevel;
  bcImpactTypes: BcImpactTypes;
  cycle: BcCycles;
  id?: number;
  isActive?: boolean;
  referenceId?: number;
  rto?: Bcrto;
}

