/* tslint:disable */
/* eslint-disable */
import { BcImpactLevel } from './bc-impact-level';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcImpactLevel {
  content?: Array<BcImpactLevel>;
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

