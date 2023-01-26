/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SmsNotificationProjection } from './sms-notification-projection';
import { SortObject } from './sort-object';
export interface PageSmsNotificationProjection {
  content?: Array<SmsNotificationProjection>;
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

