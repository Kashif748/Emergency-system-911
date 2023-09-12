/* tslint:disable */
/* eslint-disable */
import { BcResourcesAppAndSoftware } from './bc-resources-app-and-software';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResourcesAppAndSoftware {
  content?: Array<BcResourcesAppAndSoftware>;
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

