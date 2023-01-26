/* tslint:disable */
/* eslint-disable */
import { IncidentReminderProjection } from './incident-reminder-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentReminderProjection {
  content?: Array<IncidentReminderProjection>;
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

