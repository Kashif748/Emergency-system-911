/* tslint:disable */
/* eslint-disable */
import { CorrespondenceStatus } from './correspondence-status';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface CorrespondenceTo {
  copied?: boolean;
  correspondenceStatus?: CorrespondenceStatus;
  id?: number;
  seenBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  seenDate?: string;
  toId?: number;
  toNameAr?: string;
  toNameEn?: string;
  toType?: 'ORGANIZATION' | 'USER' | 'GROUP';
}

