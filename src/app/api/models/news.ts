/* tslint:disable */
/* eslint-disable */
import { NewsOrg } from './news-org';
import { NewsType } from './news-type';
import { Theme } from './theme';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface News {
  body: string;
  bodyEn?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdDate?: string;
  expireDate?: string;
  id?: number;
  isActive: boolean;
  isSituation?: boolean;
  newsOrgs?: Array<NewsOrg>;
  startDate?: string;
  themeType?: Theme;
  title: string;
  titleEn?: string;
  type?: NewsType;
}

