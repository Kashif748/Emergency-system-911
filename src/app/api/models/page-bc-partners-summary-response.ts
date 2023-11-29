/* tslint:disable */
/* eslint-disable */
import { BcPartnersSummaryResponse } from './bc-partners-summary-response';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageBcPartnersSummaryResponse {
  content?: Array<BcPartnersSummaryResponse>;
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

