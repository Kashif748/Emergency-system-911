/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { ServiceCenterArea } from './service-center-area';
import { SortObject } from './sort-object';
export interface PageServiceCenterArea {
  content?: Array<ServiceCenterArea>;
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

