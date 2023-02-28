/* tslint:disable */
/* eslint-disable */
import { IncidentRiskImpact } from './incident-risk-impact';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageIncidentRiskImpact {
  content?: Array<IncidentRiskImpact>;
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

