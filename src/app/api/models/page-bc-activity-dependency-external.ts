/* tslint:disable */
/* eslint-disable */
import { BcActivityDependencyExternal } from './bc-activity-dependency-external';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityDependencyExternal {
  content?: Array<BcActivityDependencyExternal>;
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

