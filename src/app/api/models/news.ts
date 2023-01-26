/* tslint:disable */
/* eslint-disable */
import { NewsOrg } from './news-org';
import { NewsType } from './news-type';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface News {
  body: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdDate?: string;
  expireDate?: string;
  id?: number;
  isActive: boolean;
  newsOrgs?: Array<NewsOrg>;
  title: string;
  type?: NewsType;
}

