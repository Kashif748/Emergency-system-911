/* tslint:disable */
/* eslint-disable */
import { BcImpactTypesMatrix } from './bc-impact-types-matrix';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcImpactTypesMatrix {
  content?: Array<BcImpactTypesMatrix>;
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

