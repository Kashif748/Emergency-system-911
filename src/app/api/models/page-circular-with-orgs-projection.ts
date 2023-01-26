/* tslint:disable */
/* eslint-disable */
import { CircularWithOrgsProjection } from './circular-with-orgs-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageCircularWithOrgsProjection {
  content?: Array<CircularWithOrgsProjection>;
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

