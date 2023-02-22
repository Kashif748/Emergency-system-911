/* tslint:disable */
/* eslint-disable */
import { InappNotificationProjection } from './inapp-notification-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageInappNotificationProjection {
  content?: Array<InappNotificationProjection>;
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

