/* tslint:disable */
/* eslint-disable */
import { CircularCc } from './circular-cc';
import { CircularOrg } from './circular-org';
import { CircularStatus } from './circular-status';
import { Confidentialty } from './confidentialty';
import { Correspondence } from './correspondence';
import { Incident } from './incident';
import { OrgStructure } from './org-structure';
import { Priority } from './priority';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Circular {
  cc?: Array<CircularCc>;
  confidentialty: Confidentialty;
  coordinatorMail: string;
  coordinatorMobil: string;
  coordinatorPhone: string;
  correspondence?: Correspondence;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdDate: string;
  createdOrg: OrgStructure;
  date: string;
  id?: number;
  incident?: Incident;
  manager: (User | UserInappAuthentication | UserMiddlewareAuth);
  number: string;
  orgs?: Array<CircularOrg>;
  posission: string;
  priority: Priority;
  procedure: string;
  sentDate: string;
  status?: CircularStatus;
  subject: string;
}

