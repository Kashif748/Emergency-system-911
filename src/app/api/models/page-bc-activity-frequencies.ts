/* tslint:disable */
/* eslint-disable */
import { BcActivityFrequencies } from './bc-activity-frequencies';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityFrequencies {
  content?: Array<BcActivityFrequencies>;
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

