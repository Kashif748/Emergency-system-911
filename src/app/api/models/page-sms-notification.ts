/* tslint:disable */
/* eslint-disable */
import { PageableObject } from './pageable-object';
import { SmsNotification } from './sms-notification';
import { SortObject } from './sort-object';
export interface PageSmsNotification {
  content?: Array<SmsNotification>;
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

