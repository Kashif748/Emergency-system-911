/* tslint:disable */
/* eslint-disable */
import { EventsConfig } from './events-config';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageEventsConfig {
  content?: Array<EventsConfig>;
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

