/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
import { IncidentEnvironmentImpactProjection } from './incident-environment-impact-projection';
import { IncidentGroupProjection } from './incident-group-projection';
import { IncidentHospitalProjection } from './incident-hospital-projection';
import { IncidentOrgProjection } from './incident-org-projection';
import { IncidentReasonProjection } from './incident-reason-projection';
import { IncidentsChallengesReq } from './incidents-challenges-req';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { UserDetailsWithoutPhotoOrgProjection } from './user-details-without-photo-org-projection';
import { UserWithoutPhotoMinimunProjection } from './user-without-photo-minimun-projection';
export interface IncidentProjection {
  center?: number;
  centerCategory?: IEntity;
  city?: IEntity;
  closedDate?: string;
  containedDate?: string;
  createdBy?: UserDetailsWithoutPhotoOrgProjection;
  createdOn?: string;
  description?: string;
  emergencyLevel?: IEntity;
  featureName?: string;
  generalPosition?: string;
  getLocationFromReporter?: boolean;
  id?: number;
  incidentCategory?: IdNameProjection;
  incidentDate?: string;
  incidentEnvironmentImpact?: Array<IncidentEnvironmentImpactProjection>;
  incidentGroups?: Array<IncidentGroupProjection>;
  incidentHospitals?: Array<IncidentHospitalProjection>;
  incidentOrgs?: Array<IncidentOrgProjection>;
  incidentParentCategory?: IdNameProjection;
  incidentReasons?: Array<IncidentReasonProjection>;
  incidentRiskImpact?: IEntity;
  incidentsChallengesReqs?: Array<IncidentsChallengesReq>;
  isExpiry?: boolean;
  isInternal?: boolean;
  kpi?: IEntity;
  locationReachedDate?: string;
  locationUrl?: string;
  notifyReporter?: boolean;
  other?: string;
  plot?: string;
  priority?: IEntity;
  processingTime?: number;
  reportedByEmail?: string;
  reportedByMobile?: string;
  reportedByName?: string;
  reportingVia?: IEntity;
  responsibleOrg?: OrgStructureMinimumProjection;
  sector?: number;
  specialized?: UserWithoutPhotoMinimunProjection;
  specializedEmail?: string;
  specializedMobile?: string;
  status?: IEntity;
  street?: string;
  subject?: string;
  timeTakenPercentage?: number;
  uuid?: string;
  zone?: number;
}

