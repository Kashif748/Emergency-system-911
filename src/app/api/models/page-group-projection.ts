/* tslint:disable */
/* eslint-disable */
import { GroupProjection } from './group-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageGroupProjection {
  content?: Array<GroupProjection>;
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

