/* tslint:disable */
/* eslint-disable */
import { NotificationPlaceholder } from './notification-placeholder';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageNotificationPlaceholder {
  content?: Array<NotificationPlaceholder>;
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

