/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { RoleProjection } from './role-projection';
import { SortObject } from './sort-object';
export interface PageRoleProjection {
  content?: Array<RoleProjection>;
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

