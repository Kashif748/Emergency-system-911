/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IncidentTag } from './incident-tag';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { UserDetailsWithoutPhotoOrgProjection } from './user-details-without-photo-org-projection';
import { UserWithoutPhotoMinimunProjection } from './user-without-photo-minimun-projection';
export interface IncidentProjectionMinimum {
  adafsaId?: number;
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
  incidentCategory?: IEntity;
  incidentDate?: string;
  incidentParentCategory?: IEntity;
  incidentRiskImpact?: IEntity;
  incidentTags?: Array<IncidentTag>;
  isExpiry?: boolean;
  isInternal?: boolean;
  kpi?: IEntity;
  locationReachedDate?: string;
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
  serial?: number;
  specialized?: UserWithoutPhotoMinimunProjection;
  specializedEmail?: string;
  specializedMobile?: string;
  status?: IEntity;
  street?: string;
  subject?: string;
  timeTakenPercentage?: number;
  uuid?: string;
  year?: number;
  zone?: number;
}

