/* tslint:disable */
/* eslint-disable */
import { BcActivityDependencyOrg } from './bc-activity-dependency-org';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityDependencyOrg {
  content?: Array<BcActivityDependencyOrg>;
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

