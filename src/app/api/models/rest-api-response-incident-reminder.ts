/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentReminder } from './api-error-incident-reminder';
import { IncidentReminder } from './incident-reminder';
export interface RestApiResponseIncidentReminder {
  error?: ApiErrorIncidentReminder;
  result?: IncidentReminder;
  status?: boolean;
}

