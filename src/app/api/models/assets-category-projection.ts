/* tslint:disable */
/* eslint-disable */
import { AdcmcCategoryProjection } from './adcmc-category-projection';
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
export interface AssetsCategoryProjection {
  assetsMainCategory?: AdcmcCategoryProjection;
  color?: string;
  icon?: string;
  id?: number;
  isActive?: boolean;
  localRisks?: Array<IdNameProjection>;
  nameAr?: string;
  nameEn?: string;
  organization?: IEntity;
}

