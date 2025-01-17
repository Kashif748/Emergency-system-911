/* tslint:disable */
/* eslint-disable */
import { AdcdaArea } from './adcda-area';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAdcdaArea {
  content?: Array<AdcdaArea>;
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

