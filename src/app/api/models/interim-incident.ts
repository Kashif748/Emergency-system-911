/* tslint:disable */
/* eslint-disable */
import { City } from './city';
import { IncidentCategory } from './incident-category';
import { InterimIncidentStatuses } from './interim-incident-statuses';
import { OrgStructure } from './org-structure';
import { ReportingVia } from './reporting-via';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface InterimIncident {
  attachments?: string;
  category?: IncidentCategory;
  city?: City;
  createdOn?: string;
  description?: string;
  id?: number;
  incidentId?: number;
  lastActionBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  lastActionDate?: string;
  location?: string;
  org: OrgStructure;
  reason?: string;
  reporterContact?: string;
  reportingVia: ReportingVia;
  serialNo?: number;
  status?: InterimIncidentStatuses;
  'x'?: number;
  'y'?: number;
}

