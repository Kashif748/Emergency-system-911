/* tslint:disable */
/* eslint-disable */
import { BcResourcesNonItInfrastructure } from './bc-resources-non-it-infrastructure';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcResourcesNonItInfrastructure {
  content?: Array<BcResourcesNonItInfrastructure>;
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

