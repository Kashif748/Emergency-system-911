/* tslint:disable */
/* eslint-disable */
import { IncidentTask } from './incident-task';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface TaskWorkLog {
  auto?: boolean;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  id?: number;
  isActive?: boolean;
  modifiable?: boolean;
  notes?: string;
  taskId?: IncidentTask;
  updated?: boolean;
}

