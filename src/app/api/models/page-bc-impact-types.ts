/* tslint:disable */
/* eslint-disable */
import { BcImpactTypes } from './bc-impact-types';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcImpactTypes {
  content?: Array<BcImpactTypes>;
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

