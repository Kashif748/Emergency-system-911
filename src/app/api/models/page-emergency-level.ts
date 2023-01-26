/* tslint:disable */
/* eslint-disable */
import { EmergencyLevel } from './emergency-level';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageEmergencyLevel {
  content?: Array<EmergencyLevel>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}

