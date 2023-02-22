/* tslint:disable */
/* eslint-disable */
import { ApiErrorListGroupIncidentCategory } from './api-error-list-group-incident-category';
import { GroupIncidentCategory } from './group-incident-category';
export interface RestApiResponseListGroupIncidentCategory {
  error?: ApiErrorListGroupIncidentCategory;
  result?: Array<GroupIncidentCategory>;
  status?: boolean;
}

