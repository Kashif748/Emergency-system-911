/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface GetInterimIncidentProjection {
  attachments?: string;
  category?: IEntity;
  city?: IEntity;
  createdOn?: string;
  description?: string;
  id?: number;
  incidentId?: number;
  lastActionBy?: UserIdNameProjection;
  lastActionDate?: string;
  location?: string;
  org?: OrgStructureMinimumProjection;
  reason?: string;
  reporterContact?: string;
  reportingVia?: IEntity;
  serialNo?: number;
  status?: IEntity;
}

