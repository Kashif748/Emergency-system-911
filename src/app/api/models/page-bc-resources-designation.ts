/* tslint:disable */
/* eslint-disable */
import { BcResourcesDesignation } from './bc-resources-designation';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResourcesDesignation {
  content?: Array<BcResourcesDesignation>;
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

