/* tslint:disable */
/* eslint-disable */
import { LeaveCalendar } from './leave-calendar';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageLeaveCalendar {
  content?: Array<LeaveCalendar>;
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

