/* tslint:disable */
/* eslint-disable */
import { BcCycles } from './bc-cycles';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcCycles {
  content?: Array<BcCycles>;
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

