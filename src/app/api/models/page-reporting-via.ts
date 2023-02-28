/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { ReportingVia } from './reporting-via';
import { SortObject } from './sort-object';
export interface PageReportingVia {
  content?: Array<ReportingVia>;
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

