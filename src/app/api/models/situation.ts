/* tslint:disable */
/* eslint-disable */
import { NewsType } from './news-type';
import { OrgStructure } from './org-structure';
import { Theme } from './theme';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Situation {
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdDate?: string;
  endDate?: string;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  newsId?: number;
  newsType?: NewsType;
  orgStructure?: OrgStructure;
  startDate: string;
  status?: string;
  statusId?: number;
  theme: number;
  themeType?: Theme;
  type: number;
}

