/* tslint:disable */
/* eslint-disable */
import { BcResources } from './bc-resources';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResources {
  content?: Array<BcResources>;
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

