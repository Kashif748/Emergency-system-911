/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { PushNotificationBody } from './push-notification-body';
import { SortObject } from './sort-object';
export interface PagePushNotificationBody {
  content?: Array<PushNotificationBody>;
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

