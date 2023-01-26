/* tslint:disable */
/* eslint-disable */
import { DailySummaryReportOptType } from './daily-summary-report-opt-type';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageDailySummaryReportOptType {
  content?: Array<DailySummaryReportOptType>;
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

