/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface NewsOrgProjection {
  id?: number;
  newsId?: IEntity;
  orgId?: OrgStructureMinimumProjection;
}

