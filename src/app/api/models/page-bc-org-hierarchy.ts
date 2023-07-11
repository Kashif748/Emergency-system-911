/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchy } from './bc-org-hierarchy';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcOrgHierarchy {
  content?: Array<BcOrgHierarchy>;
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

