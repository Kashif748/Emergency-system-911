/* tslint:disable */
/* eslint-disable */
import { KpiV2Response } from './kpi-v-2-response';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageKpiV2Response {
  content?: Array<KpiV2Response>;
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

