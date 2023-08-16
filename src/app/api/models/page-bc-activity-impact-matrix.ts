/* tslint:disable */
/* eslint-disable */
import { BcActivityImpactMatrix } from './bc-activity-impact-matrix';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcActivityImpactMatrix {
  content?: Array<BcActivityImpactMatrix>;
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

