/* tslint:disable */
/* eslint-disable */
import { BcResourcesMinPersonnelReq } from './bc-resources-min-personnel-req';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResourcesMinPersonnelReq {
  content?: Array<BcResourcesMinPersonnelReq>;
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

