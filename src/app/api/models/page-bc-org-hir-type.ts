/* tslint:disable */
/* eslint-disable */
import { BcOrgHirType } from './bc-org-hir-type';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcOrgHirType {
  content?: Array<BcOrgHirType>;
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

