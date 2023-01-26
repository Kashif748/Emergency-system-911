/* tslint:disable */
/* eslint-disable */
import { Documents } from './documents';
import { IncidentTaskShortProjection } from './incident-task-short-projection';
export interface AttachmentsWorkLogModel {
  documents?: Documents;
  incidentTaskList?: Array<IncidentTaskShortProjection>;
}

