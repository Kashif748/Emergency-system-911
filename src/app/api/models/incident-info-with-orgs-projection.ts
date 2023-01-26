/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
import { IncidentGroupProjection } from './incident-group-projection';
import { IncidentOrgProjection } from './incident-org-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { TotalTasks } from './total-tasks';
import { UserDetailsWithoutPhotoOrgProjection } from './user-details-without-photo-org-projection';
import { UserWithoutPhotoMinimunProjection } from './user-without-photo-minimun-projection';
export interface IncidentInfoWithOrgsProjection {
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
  incidentGroups?: Array<IncidentGroupProjection>;
  incidentOrgs?: Array<IncidentOrgProjection>;
  incidentParentCategory?: IdNameProjection;
  incidentRiskImpact?: IEntity;
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
  reminders?: Array<number>;
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
  tasks?: TotalTasks;
  timeTakenPercentage?: number;
  uuid?: string;
  zone?: number;
}

