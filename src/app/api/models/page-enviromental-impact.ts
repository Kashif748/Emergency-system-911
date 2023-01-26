/* tslint:disable */
/* eslint-disable */
import { EnviromentalImpact } from './enviromental-impact';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageEnviromentalImpact {
  content?: Array<EnviromentalImpact>;
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

