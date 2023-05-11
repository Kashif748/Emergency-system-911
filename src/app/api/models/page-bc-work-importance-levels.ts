/* tslint:disable */
/* eslint-disable */
import { BcWorkImportanceLevels } from './bc-work-importance-levels';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcWorkImportanceLevels {
  content?: Array<BcWorkImportanceLevels>;
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

