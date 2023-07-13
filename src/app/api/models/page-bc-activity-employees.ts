/* tslint:disable */
/* eslint-disable */
import { BcActivityEmployees } from './bc-activity-employees';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityEmployees {
  content?: Array<BcActivityEmployees>;
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

