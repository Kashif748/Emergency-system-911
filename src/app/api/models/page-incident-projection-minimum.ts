/* tslint:disable */
/* eslint-disable */
import { IncidentProjectionMinimum } from './incident-projection-minimum';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentProjectionMinimum {
  content?: Array<IncidentProjectionMinimum>;
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

