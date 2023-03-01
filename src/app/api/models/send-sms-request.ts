/* tslint:disable */
/* eslint-disable */
import { Group } from './group';
import { Incident } from './incident';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface SendSmsRequest {
  body?: string;
  groupList?: Array<Group>;
  incidentList?: Array<Incident>;
  toAllGroups?: boolean;
  toAllIncidents?: boolean;
  toAllUsers?: boolean;
  userList?: Array<(User | UserInappAuthentication | UserMiddlewareAuth)>;
}

