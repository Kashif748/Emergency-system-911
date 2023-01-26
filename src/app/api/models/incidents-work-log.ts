/* tslint:disable */
/* eslint-disable */
import { Priority } from './priority';
import { PrivateIncidentWorkLog } from './private-incident-work-log';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface IncidentsWorkLog {
  auto?: boolean;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn: string;
  id?: number;
  isActive?: boolean;
  isPublic?: boolean;
  modifiable?: boolean;
  notes?: string;
  priority: Priority;
  privateIncidentWorkLogList?: Array<PrivateIncidentWorkLog>;
  updated?: boolean;
}

