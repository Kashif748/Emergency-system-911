/* tslint:disable */
/* eslint-disable */
import { Documents } from './documents';
import { IEntity } from './i-entity';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface TaskWorkLogProjection {
  attachments?: Array<Documents>;
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  hasAttachments?: boolean;
  id?: number;
  isActive?: boolean;
  modifiable?: boolean;
  notes?: string;
  taskId?: IEntity;
  updated?: boolean;
}

