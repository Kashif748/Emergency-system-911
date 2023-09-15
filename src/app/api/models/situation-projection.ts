/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
import { SituationMainIncCatProjection } from './situation-main-inc-cat-projection';
import { Theme } from './theme';
export interface SituationProjection {
  alertnessLevel?: IdNameProjection;
  createdBy?: IEntity;
  createdDate?: string;
  endDate?: string;
  id?: number;
  isActive?: boolean;
  mainIncCategory?: Array<SituationMainIncCatProjection>;
  nameAr?: string;
  nameEn?: string;
  newsId?: number;
  newsType?: IdNameProjection;
  orgStructure?: IEntity;
  startDate?: string;
  status?: string;
  themeType?: Theme;
}

