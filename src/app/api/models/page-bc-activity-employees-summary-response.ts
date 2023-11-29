/* tslint:disable */
/* eslint-disable */
import { BcActivityEmployeesSummaryResponse } from './bc-activity-employees-summary-response';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityEmployeesSummaryResponse {
  content?: Array<BcActivityEmployeesSummaryResponse>;
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

