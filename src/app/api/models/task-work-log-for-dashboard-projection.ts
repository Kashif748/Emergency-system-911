/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface TaskWorkLogForDashboardProjection {
  auto?: boolean;
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  id?: number;
  isActive?: boolean;
  modifiable?: boolean;
  notes?: string;
  taskId?: IEntity;
  updated?: boolean;
}

