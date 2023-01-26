/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentReminderProjection } from './api-error-incident-reminder-projection';
import { IncidentReminderProjection } from './incident-reminder-projection';
export interface RestApiResponseIncidentReminderProjection {
  error?: ApiErrorIncidentReminderProjection;
  result?: IncidentReminderProjection;
  status?: boolean;
}

