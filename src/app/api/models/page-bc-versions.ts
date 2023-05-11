/* tslint:disable */
/* eslint-disable */
import { BcVersions } from './bc-versions';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcVersions {
  content?: Array<BcVersions>;
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

