/* tslint:disable */
/* eslint-disable */
import { Dms } from './dms';
import { EntityTag } from './entity-tag';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Documents {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  description?: string;
  dms: Dms;
  dmsReference?: string;
  entityTag: EntityTag;
  fileName: string;
  id?: number;
  mimeType: string;
  recordId?: number;
  size: number;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  uuid?: string;
}

