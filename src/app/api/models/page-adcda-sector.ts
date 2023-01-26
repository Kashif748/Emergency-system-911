/* tslint:disable */
/* eslint-disable */
import { AdcdaSector } from './adcda-sector';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAdcdaSector {
  content?: Array<AdcdaSector>;
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

