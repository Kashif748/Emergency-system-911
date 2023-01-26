/* tslint:disable */
/* eslint-disable */
import { IncidentStatus } from './incident-status';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentStatus {
  content?: Array<IncidentStatus>;
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

