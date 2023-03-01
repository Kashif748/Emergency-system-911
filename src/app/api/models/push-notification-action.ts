/* tslint:disable */
/* eslint-disable */
import { PushNotificationBody } from './push-notification-body';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface PushNotificationAction {
  code: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  id?: number;
  isActive?: boolean;
  nameAr: string;
  nameEn: string;
  pushNotificationBody: PushNotificationBody;
  routing?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  updatedOn?: string;
}

