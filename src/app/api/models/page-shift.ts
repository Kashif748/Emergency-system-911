/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { Shift } from './shift';
import { SortObject } from './sort-object';
export interface PageShift {
  content?: Array<Shift>;
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

