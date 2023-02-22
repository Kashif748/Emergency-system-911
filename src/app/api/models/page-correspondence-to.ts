/* tslint:disable */
/* eslint-disable */
import { CorrespondenceTo } from './correspondence-to';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageCorrespondenceTo {
  content?: Array<CorrespondenceTo>;
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

