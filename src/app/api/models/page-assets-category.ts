/* tslint:disable */
/* eslint-disable */
import { AssetsCategory } from './assets-category';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAssetsCategory {
  content?: Array<AssetsCategory>;
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

