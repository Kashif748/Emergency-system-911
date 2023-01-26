/* tslint:disable */
/* eslint-disable */
import { IncidentsChallengesReq } from './incidents-challenges-req';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentsChallengesReq {
  content?: Array<IncidentsChallengesReq>;
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

