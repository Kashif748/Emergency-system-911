/* tslint:disable */
/* eslint-disable */
import { EntityTypeProjection } from './entity-type-projection';
import { Geometry } from './geometry';
import { IEntity } from './i-entity';
export interface OrgStructureProjection {
  adcdaClassifcation?: IEntity;
  adcdaPrimary?: boolean;
  area?: IEntity;
  center?: number;
  code?: string;
  contractorContractNo?: string;
  contractorExpDate?: string;
  entityType?: EntityTypeProjection;
  id?: number;
  ldapOrgId?: number;
  location?: Geometry;
  loginCaptcha?: boolean;
  loginNormal?: boolean;
  loginOtp?: boolean;
  loginUaePass?: boolean;
  managerGroupId?: number;
  managerId?: number;
  nameAr?: string;
  nameEn?: string;
  parent?: IEntity;
  representativeGroupId?: number;
  sector?: IEntity;
  specialistId?: number;
  theme?: number;
  themeReason?: string;
  tradeLicense?: string;
}

