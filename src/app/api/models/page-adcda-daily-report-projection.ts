/* tslint:disable */
/* eslint-disable */
import { AdcdaDailyReportProjection } from './adcda-daily-report-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAdcdaDailyReportProjection {
  content?: Array<AdcdaDailyReportProjection>;
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

