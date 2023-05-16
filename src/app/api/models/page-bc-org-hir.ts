/* tslint:disable */
/* eslint-disable */
import { BcOrgHir } from './bc-org-hir';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcOrgHir {
  content?: Array<BcOrgHir>;
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

