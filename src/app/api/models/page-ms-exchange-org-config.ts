/* tslint:disable */
/* eslint-disable */
import { MsExchangeOrgConfig } from './ms-exchange-org-config';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageMsExchangeOrgConfig {
  content?: Array<MsExchangeOrgConfig>;
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

