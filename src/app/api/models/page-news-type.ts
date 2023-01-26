/* tslint:disable */
/* eslint-disable */
import { NewsType } from './news-type';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageNewsType {
  content?: Array<NewsType>;
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

