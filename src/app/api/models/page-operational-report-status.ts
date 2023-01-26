/* tslint:disable */
/* eslint-disable */
import { OperationalReportStatus } from './operational-report-status';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageOperationalReportStatus {
  content?: Array<OperationalReportStatus>;
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

