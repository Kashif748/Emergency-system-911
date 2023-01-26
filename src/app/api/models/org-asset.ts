/* tslint:disable */
/* eslint-disable */
import { AssetsCategory } from './assets-category';
import { AssetsGroup } from './assets-group';
import { Geometry } from './geometry';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface OrgAsset {
  area?: string;
  assetsGroup?: AssetsGroup;
  availableQuantity?: number;
  category?: AssetsCategory;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdDate?: string;
  description?: string;
  geometryLocation?: string;
  id?: number;
  isSameOrgLocation?: boolean;
  lastUpdatedDate?: string;
  location?: Geometry;
  mainOrganization?: OrgStructure;
  measuringType: string;
  nameAr: string;
  nameEn: string;
  organization?: OrgStructure;
  quantity: number;
  serialNo?: string;
}

