/* tslint:disable */
/* eslint-disable */
import { EventsConfigSmsProjection } from './events-config-sms-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageEventsConfigSmsProjection {
  content?: Array<EventsConfigSmsProjection>;
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

