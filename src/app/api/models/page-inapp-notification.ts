/* tslint:disable */
/* eslint-disable */
import { InappNotification } from './inapp-notification';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageInappNotification {
  content?: Array<InappNotification>;
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

