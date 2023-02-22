/* tslint:disable */
/* eslint-disable */
import { IncidentTaskProjection } from './incident-task-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentTaskProjection {
  content?: Array<IncidentTaskProjection>;
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

