/* tslint:disable */
/* eslint-disable */
import { BaseLibraryProjection } from './base-library-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBaseLibraryProjection {
  content?: Array<BaseLibraryProjection>;
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

