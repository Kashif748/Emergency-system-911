/* tslint:disable */
/* eslint-disable */
import { Inspection } from './inspection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageListInspection {
  content?: Array<Array<Inspection>>;
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

