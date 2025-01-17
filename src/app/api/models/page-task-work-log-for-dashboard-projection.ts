/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
import { TaskWorkLogForDashboardProjection } from './task-work-log-for-dashboard-projection';
export interface PageTaskWorkLogForDashboardProjection {
  content?: Array<TaskWorkLogForDashboardProjection>;
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

