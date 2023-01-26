/* tslint:disable */
/* eslint-disable */
import { Hospital } from './hospital';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageHospital {
  content?: Array<Hospital>;
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

