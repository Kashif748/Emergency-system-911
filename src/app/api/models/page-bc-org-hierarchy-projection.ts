/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchyProjection } from './bc-org-hierarchy-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcOrgHierarchyProjection {
  content?: Array<BcOrgHierarchyProjection>;
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

