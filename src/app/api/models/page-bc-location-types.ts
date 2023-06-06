/* tslint:disable */
/* eslint-disable */
import { BcLocationTypes } from './bc-location-types';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcLocationTypes {
  content?: Array<BcLocationTypes>;
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

