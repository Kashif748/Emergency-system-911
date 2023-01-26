/* tslint:disable */
/* eslint-disable */
import { NewsProjection } from './news-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageNewsProjection {
  content?: Array<NewsProjection>;
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

