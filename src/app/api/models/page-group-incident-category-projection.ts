/* tslint:disable */
/* eslint-disable */
import { GroupIncidentCategoryProjection } from './group-incident-category-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageGroupIncidentCategoryProjection {
  content?: Array<GroupIncidentCategoryProjection>;
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

