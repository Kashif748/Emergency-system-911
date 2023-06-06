/* tslint:disable */
/* eslint-disable */
import { Confidentialty } from './confidentialty';
import { CorrespondenceTo } from './correspondence-to';
import { Incident } from './incident';
import { Priority } from './priority';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Correspondence {
  body: string;
  confidentialty?: Confidentialty;
  createdOn?: string;
  dueDate?: string;
  emailNtfStatus?: number;
  external?: boolean;
  id?: number;
  incident?: Incident;
  isActive?: boolean;
  isLinkedWithCirular?: boolean;
  isRepliedByOther?: boolean;
  parent?: Correspondence;
  priority?: Priority;
  smsNotification?: boolean;
  subject: string;
  toList?: Array<CorrespondenceTo>;
  user?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

