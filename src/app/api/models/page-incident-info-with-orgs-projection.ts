/* tslint:disable */
/* eslint-disable */
import { IncidentInfoWithOrgsProjection } from './incident-info-with-orgs-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentInfoWithOrgsProjection {
  content?: Array<IncidentInfoWithOrgsProjection>;
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

