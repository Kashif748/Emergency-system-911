/* tslint:disable */
/* eslint-disable */
import { AssetsCategoryProjection } from './assets-category-projection';
import { Geometry } from './geometry';
import { IEntity } from './i-entity';
import { MeasuringType } from './measuring-type';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface OrgAssetsProjection {
  area?: string;
  assetMeasuringType?: MeasuringType;
  assetsGroup?: IEntity;
  availableQuantity?: number;
  category?: AssetsCategoryProjection;
  createdBy?: IEntity;
  createdDate?: string;
  description?: string;
  id?: number;
  isActive?: boolean;
  lastUpdatedDate?: string;
  location?: Geometry;
  mainOrganization?: OrgStructureMinimumProjection;
  nameAr?: string;
  nameEn?: string;
  organization?: OrgStructureMinimumProjection;
  quantity?: number;
  serialNo?: string;
}

