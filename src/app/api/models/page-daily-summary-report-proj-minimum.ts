/* tslint:disable */
/* eslint-disable */
import { DailySummaryReportProjMinimum } from './daily-summary-report-proj-minimum';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageDailySummaryReportProjMinimum {
  content?: Array<DailySummaryReportProjMinimum>;
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

