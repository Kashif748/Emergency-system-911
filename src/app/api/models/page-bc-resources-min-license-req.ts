/* tslint:disable */
/* eslint-disable */
import { BcResourcesMinLicenseReq } from './bc-resources-min-license-req';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResourcesMinLicenseReq {
  content?: Array<BcResourcesMinLicenseReq>;
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

