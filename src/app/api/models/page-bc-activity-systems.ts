/* tslint:disable */
/* eslint-disable */
import { BcActivitySystems } from './bc-activity-systems';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivitySystems {
  content?: Array<BcActivitySystems>;
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

