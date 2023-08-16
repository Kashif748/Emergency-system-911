/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivities {
  content?: Array<BcActivities>;
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

