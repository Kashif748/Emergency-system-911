/* tslint:disable */
/* eslint-disable */
import { OrgQuickLink } from './org-quick-link';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageOrgQuickLink {
  content?: Array<OrgQuickLink>;
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

