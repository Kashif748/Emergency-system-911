/* tslint:disable */
/* eslint-disable */
import { City } from './city';
import { EmergencyLevel } from './emergency-level';
import { IncidentCategory } from './incident-category';
import { IncidentEnvironmentImpact } from './incident-environment-impact';
import { IncidentGroup } from './incident-group';
import { IncidentHospital } from './incident-hospital';
import { IncidentOrg } from './incident-org';
import { IncidentReason } from './incident-reason';
import { IncidentRiskImpact } from './incident-risk-impact';
import { IncidentStatus } from './incident-status';
import { IncidentsChallengesReq } from './incidents-challenges-req';
import { Kpi } from './kpi';
import { OrgStructure } from './org-structure';
import { Priority } from './priority';
import { ReportingVia } from './reporting-via';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Incident {
  center?: number;
  centerCategory?: IncidentCategory;
  city: City;
  closedDate?: string;
  containedDate?: string;
  createdBy: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  description?: string;
  emergencyLevel?: EmergencyLevel;
  featureName?: string;
  generalPosition?: string;
  getLocationFromReporter?: boolean;
  id?: number;
  incidentCategory?: IncidentCategory;
  incidentDate: string;
  incidentEnvironmentImpact?: Array<IncidentEnvironmentImpact>;
  incidentGroups?: Array<IncidentGroup>;
  incidentHospitals?: Array<IncidentHospital>;
  incidentOrgs?: Array<IncidentOrg>;
  incidentParentCategory?: IncidentCategory;
  incidentReasons?: Array<IncidentReason>;
  incidentRiskImpact?: IncidentRiskImpact;
  incidentsChallengesReqs?: Array<IncidentsChallengesReq>;
  interimIncident?: number;
  isInternal: boolean;
  kpi?: Kpi;
  locationReachedDate?: string;
  locationUrl?: string;
  notifyReporter: boolean;
  other?: string;
  plot?: string;
  priority: Priority;
  processingTime?: number;
  reportedByEmail?: string;
  reportedByMobile?: string;
  reportedByName: string;
  reportingVia: ReportingVia;
  responsibleOrg?: OrgStructure;
  sector?: number;
  specialized?: (User | UserInappAuthentication | UserMiddlewareAuth);
  specializedEmail?: string;
  specializedMobile?: string;
  status: IncidentStatus;
  street?: string;
  subject: string;
  uuid?: string;
  zone?: number;
}

