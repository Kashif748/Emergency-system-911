/* tslint:disable */
/* eslint-disable */
import { BcPartners } from './bc-partners';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcPartners {
  content?: Array<BcPartners>;
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

