/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { Scheduler } from './scheduler';
import { SortObject } from './sort-object';
export interface PageScheduler {
  content?: Array<Scheduler>;
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

