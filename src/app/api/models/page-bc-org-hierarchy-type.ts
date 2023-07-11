/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchyType } from './bc-org-hierarchy-type';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcOrgHierarchyType {
  content?: Array<BcOrgHierarchyType>;
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

