/* tslint:disable */
/* eslint-disable */
import { AssetsCategoryProjection } from './assets-category-projection';
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { UserMinimunProjection } from './user-minimun-projection';
export interface IncidentAssetsProjection {
  asset?: IdNameProjection;
  category?: AssetsCategoryProjection;
  createdBy?: UserMinimunProjection;
  createdOn?: string;
  id?: number;
  incident?: IEntity;
  isActive?: boolean;
  orgStructure?: OrgStructureMinimumProjection;
  quantity?: number;
}

