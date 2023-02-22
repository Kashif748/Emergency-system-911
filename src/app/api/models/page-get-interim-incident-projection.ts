/* tslint:disable */
/* eslint-disable */
import { GetInterimIncidentProjection } from './get-interim-incident-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageGetInterimIncidentProjection {
  content?: Array<GetInterimIncidentProjection>;
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

