/* tslint:disable */
/* eslint-disable */
import { BcActivityAnalysis } from './bc-activity-analysis';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityAnalysis {
  content?: Array<BcActivityAnalysis>;
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

