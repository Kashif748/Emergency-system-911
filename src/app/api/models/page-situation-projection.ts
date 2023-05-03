/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SituationProjection } from './situation-projection';
import { SortObject } from './sort-object';
export interface PageSituationProjection {
  content?: Array<SituationProjection>;
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

