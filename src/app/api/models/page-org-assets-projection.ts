/* tslint:disable */
/* eslint-disable */
import { OrgAssetsProjection } from './org-assets-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageOrgAssetsProjection {
  content?: Array<OrgAssetsProjection>;
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

