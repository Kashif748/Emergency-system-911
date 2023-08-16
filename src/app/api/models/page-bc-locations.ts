/* tslint:disable */
/* eslint-disable */
import { BcLocations } from './bc-locations';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcLocations {
  content?: Array<BcLocations>;
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

