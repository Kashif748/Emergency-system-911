/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { Reason } from './reason';
import { SortObject } from './sort-object';
export interface PageReason {
  content?: Array<Reason>;
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

