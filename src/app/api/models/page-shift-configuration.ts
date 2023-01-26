/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { ShiftConfiguration } from './shift-configuration';
import { SortObject } from './sort-object';
export interface PageShiftConfiguration {
  content?: Array<ShiftConfiguration>;
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

