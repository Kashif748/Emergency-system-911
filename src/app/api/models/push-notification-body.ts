/* tslint:disable */
/* eslint-disable */
import { EventsConfig } from './events-config';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface PushNotificationBody {
  body: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  enBody?: string;
  event: EventsConfig;
  id?: number;
  isActive?: boolean;
  titleAr?: string;
  titleEn?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  updatedOn?: string;
}

