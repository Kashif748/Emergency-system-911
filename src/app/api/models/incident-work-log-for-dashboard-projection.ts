/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface IncidentWorkLogForDashboardProjection {
  auto?: boolean;
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  id?: number;
  incident?: IEntity;
  isActive?: boolean;
  isPublic?: boolean;
  modifiable?: boolean;
  notes?: string;
  updated?: boolean;
}

