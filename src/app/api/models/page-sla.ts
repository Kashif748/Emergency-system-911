/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { Sla } from './sla';
import { SortObject } from './sort-object';
export interface PageSla {
  content?: Array<Sla>;
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

