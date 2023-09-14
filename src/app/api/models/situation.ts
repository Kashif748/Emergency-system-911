/* tslint:disable */
/* eslint-disable */
import { AlertnessLevel } from './alertness-level';
import { NewsType } from './news-type';
import { OrgStructure } from './org-structure';
import { SituationMainIncCategory } from './situation-main-inc-category';
import { Theme } from './theme';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Situation {
  alertnessLevel?: AlertnessLevel;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdDate?: string;
  endDate?: string;
  id?: number;
  isActive?: boolean;
  mainIncCategory?: Array<SituationMainIncCategory>;
  nameAr?: string;
  nameEn?: string;
  newsId?: number;
  newsType?: NewsType;
  orgStructure?: OrgStructure;
  startDate: string;
  status?: string;
  statusId?: number;
  theme?: number;
  themeType?: Theme;
  type: number;
}

