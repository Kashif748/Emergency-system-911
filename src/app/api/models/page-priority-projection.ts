/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { PriorityProjection } from './priority-projection';
import { SortObject } from './sort-object';
export interface PagePriorityProjection {
  content?: Array<PriorityProjection>;
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

