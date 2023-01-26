/* tslint:disable */
/* eslint-disable */
import { CorrespondenceProjection } from './correspondence-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageCorrespondenceProjection {
  content?: Array<CorrespondenceProjection>;
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

