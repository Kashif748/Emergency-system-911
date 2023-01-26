/* tslint:disable */
/* eslint-disable */
import { Group } from './group';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageGroup {
  content?: Array<Group>;
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

