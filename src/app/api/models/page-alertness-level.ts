/* tslint:disable */
/* eslint-disable */
import { AlertnessLevel } from './alertness-level';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAlertnessLevel {
  content?: Array<AlertnessLevel>;
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

