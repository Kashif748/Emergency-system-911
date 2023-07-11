/* tslint:disable */
/* eslint-disable */
import { BcActivityLocations } from './bc-activity-locations';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityLocations {
  content?: Array<BcActivityLocations>;
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

