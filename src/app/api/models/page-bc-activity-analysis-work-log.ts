/* tslint:disable */
/* eslint-disable */
import { BcActivityAnalysisWorkLog } from './bc-activity-analysis-work-log';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityAnalysisWorkLog {
  content?: Array<BcActivityAnalysisWorkLog>;
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

