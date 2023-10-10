/* tslint:disable */
/* eslint-disable */
import { BcActivityAnalysisSummaryResponse } from './bc-activity-analysis-summary-response';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityAnalysisSummaryResponse {
  content?: Array<BcActivityAnalysisSummaryResponse>;
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

