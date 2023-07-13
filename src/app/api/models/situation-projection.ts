/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
import { Theme } from './theme';
export interface SituationProjection {
  alertnessLevel?: IEntity;
  createdBy?: IEntity;
  createdDate?: string;
  endDate?: string;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  newsId?: number;
  newsType?: IdNameProjection;
  orgStructure?: IEntity;
  startDate?: string;
  status?: string;
  themeType?: Theme;
}

