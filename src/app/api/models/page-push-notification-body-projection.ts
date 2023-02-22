/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { PushNotificationBodyProjection } from './push-notification-body-projection';
import { SortObject } from './sort-object';
export interface PagePushNotificationBodyProjection {
  content?: Array<PushNotificationBodyProjection>;
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

