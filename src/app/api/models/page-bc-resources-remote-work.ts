/* tslint:disable */
/* eslint-disable */
import { BcResourcesRemoteWork } from './bc-resources-remote-work';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResourcesRemoteWork {
  content?: Array<BcResourcesRemoteWork>;
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

