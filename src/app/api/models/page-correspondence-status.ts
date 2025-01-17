/* tslint:disable */
/* eslint-disable */
import { CorrespondenceStatus } from './correspondence-status';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageCorrespondenceStatus {
  content?: Array<CorrespondenceStatus>;
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

