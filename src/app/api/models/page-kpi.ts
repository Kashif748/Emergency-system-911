/* tslint:disable */
/* eslint-disable */
import { Kpi } from './kpi';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageKpi {
  content?: Array<Kpi>;
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

