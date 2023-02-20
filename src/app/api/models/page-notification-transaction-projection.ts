/* tslint:disable */
/* eslint-disable */
import { NotificationTransactionProjection } from './notification-transaction-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageNotificationTransactionProjection {
  content?: Array<NotificationTransactionProjection>;
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

