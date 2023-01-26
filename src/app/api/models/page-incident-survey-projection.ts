/* tslint:disable */
/* eslint-disable */
import { IncidentSurveyProjection } from './incident-survey-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentSurveyProjection {
  content?: Array<IncidentSurveyProjection>;
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

