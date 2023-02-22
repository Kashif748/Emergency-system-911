/* tslint:disable */
/* eslint-disable */
import { IncidentWorkLogForDashboardProjection } from './incident-work-log-for-dashboard-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentWorkLogForDashboardProjection {
  content?: Array<IncidentWorkLogForDashboardProjection>;
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

