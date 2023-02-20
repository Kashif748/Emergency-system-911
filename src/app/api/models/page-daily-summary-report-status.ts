/* tslint:disable */
/* eslint-disable */
import { DailySummaryReportStatus } from './daily-summary-report-status';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageDailySummaryReportStatus {
  content?: Array<DailySummaryReportStatus>;
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

