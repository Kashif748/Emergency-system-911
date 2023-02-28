/* tslint:disable */
/* eslint-disable */
import { DashboardCard } from './dashboard-card';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageDashboardCard {
  content?: Array<DashboardCard>;
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

