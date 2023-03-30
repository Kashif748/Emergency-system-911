/* tslint:disable */
/* eslint-disable */
import { IncidentSurveyV2Projection } from './incident-survey-v-2-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentSurveyV2Projection {
  content?: Array<IncidentSurveyV2Projection>;
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

