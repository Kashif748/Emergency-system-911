/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { ScadKoiDetail } from './scad-koi-detail';
import { SortObject } from './sort-object';
export interface PageScadKoiDetail {
  content?: Array<ScadKoiDetail>;
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

