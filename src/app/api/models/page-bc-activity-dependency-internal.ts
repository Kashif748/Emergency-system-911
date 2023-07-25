/* tslint:disable */
/* eslint-disable */
import { BcActivityDependencyInternal } from './bc-activity-dependency-internal';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityDependencyInternal {
  content?: Array<BcActivityDependencyInternal>;
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
