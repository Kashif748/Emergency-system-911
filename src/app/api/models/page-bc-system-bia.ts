/* tslint:disable */
/* eslint-disable */
import { BcSystemBia } from './bc-system-bia';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcSystemBia {
  content?: Array<BcSystemBia>;
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

