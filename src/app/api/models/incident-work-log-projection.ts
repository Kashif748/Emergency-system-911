/* tslint:disable */
/* eslint-disable */
import { Documents } from './documents';
import { IEntity } from './i-entity';
import { PrivateIncidentWorkLogProjection } from './private-incident-work-log-projection';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface IncidentWorkLogProjection {
  attachments?: Array<Documents>;
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  hasAttachments?: boolean;
  id?: number;
  isActive?: boolean;
  isPublic?: boolean;
  modifiable?: boolean;
  notes?: string;
  priority?: IEntity;
  privateIncidentWorkLogList?: Array<PrivateIncidentWorkLogProjection>;
  updated?: boolean;
}

