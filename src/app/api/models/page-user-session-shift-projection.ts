/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
import { UserSessionShiftProjection } from './user-session-shift-projection';
export interface PageUserSessionShiftProjection {
  content?: Array<UserSessionShiftProjection>;
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

