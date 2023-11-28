/* tslint:disable */
/* eslint-disable */
import { BcActivitySystemsSummaryResponse } from './bc-activity-systems-summary-response';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivitySystemsSummaryResponse {
  content?: Array<BcActivitySystemsSummaryResponse>;
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

