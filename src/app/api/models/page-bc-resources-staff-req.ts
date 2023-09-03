/* tslint:disable */
/* eslint-disable */
import { BcResourcesStaffReq } from './bc-resources-staff-req';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResourcesStaffReq {
  content?: Array<BcResourcesStaffReq>;
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

