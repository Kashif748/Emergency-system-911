/* tslint:disable */
/* eslint-disable */
import { ModuleOrgProjection } from './module-org-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageModuleOrgProjection {
  content?: Array<ModuleOrgProjection>;
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

