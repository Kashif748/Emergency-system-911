/* tslint:disable */
/* eslint-disable */
import { IncidentTask } from './incident-task';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentTask {
  content?: Array<IncidentTask>;
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

