/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
import { UserAndRoleProjection } from './user-and-role-projection';
export interface PageUserAndRoleProjection {
  content?: Array<UserAndRoleProjection>;
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

