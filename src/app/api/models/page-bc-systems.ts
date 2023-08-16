/* tslint:disable */
/* eslint-disable */
import { BcSystems } from './bc-systems';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcSystems {
  content?: Array<BcSystems>;
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

