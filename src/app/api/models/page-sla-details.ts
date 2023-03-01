/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SlaDetails } from './sla-details';
import { SortObject } from './sort-object';
export interface PageSlaDetails {
  content?: Array<SlaDetails>;
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

