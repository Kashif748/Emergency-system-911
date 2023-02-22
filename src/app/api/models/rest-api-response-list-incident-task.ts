/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentTask } from './api-error-list-incident-task';
import { IncidentTask } from './incident-task';
export interface RestApiResponseListIncidentTask {
  error?: ApiErrorListIncidentTask;
  result?: Array<IncidentTask>;
  status?: boolean;
}

