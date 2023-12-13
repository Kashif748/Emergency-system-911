/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
export interface OrgMapGisLayer {
  id?: number;
  isActive?: boolean;
  layerId?: number;
  nameAr: string;
  nameEn: string;
  orgStructure?: OrgStructure;
  url?: string;
  useCase?: string;
}

