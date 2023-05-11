/* tslint:disable */
/* eslint-disable */
import { Bcrto } from './bcrto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcrto {
  content?: Array<Bcrto>;
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

