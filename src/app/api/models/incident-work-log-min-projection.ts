/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { PrivateIncidentWorkLogProjection } from './private-incident-work-log-projection';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface IncidentWorkLogMinProjection {
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  id?: number;
  isActive?: boolean;
  isPublic?: boolean;
  notes?: string;
  priority?: IEntity;
  privateIncidentWorkLogList?: Array<PrivateIncidentWorkLogProjection>;
  updated?: boolean;
}

