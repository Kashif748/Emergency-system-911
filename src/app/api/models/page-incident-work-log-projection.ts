/* tslint:disable */
/* eslint-disable */
import { IncidentWorkLogProjection } from './incident-work-log-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentWorkLogProjection {
  content?: Array<IncidentWorkLogProjection>;
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

