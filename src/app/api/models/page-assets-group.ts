/* tslint:disable */
/* eslint-disable */
import { AssetsGroup } from './assets-group';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAssetsGroup {
  content?: Array<AssetsGroup>;
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

