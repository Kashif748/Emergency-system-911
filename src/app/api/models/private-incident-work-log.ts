/* tslint:disable */
/* eslint-disable */
import { IncidentsWorkLog } from './incidents-work-log';
import { OrgStructure } from './org-structure';
export interface PrivateIncidentWorkLog {
  id?: number;
  incidentWorkLog?: IncidentsWorkLog;
  orgStructure: OrgStructure;
}

