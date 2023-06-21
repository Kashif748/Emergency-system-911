/* tslint:disable */
/* eslint-disable */
import { BcVersionsStatus } from './bc-versions-status';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcVersionsStatus {
  content?: Array<BcVersionsStatus>;
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

