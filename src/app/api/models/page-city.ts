/* tslint:disable */
/* eslint-disable */
import { City } from './city';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageCity {
  content?: Array<City>;
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

