/* tslint:disable */
/* eslint-disable */
import { AssetsCategory } from './assets-category';
import { Incident } from './incident';
import { OrgAsset } from './org-asset';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface IncidentsAssets {
  asset: OrgAsset;
  category: AssetsCategory;
  createdBy: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  id?: number;
  incident: Incident;
  isActive?: boolean;
  orgStructure?: OrgStructure;
  quantity?: number;
}

