/* tslint:disable */
/* eslint-disable */
import { BcLocationTypes } from './bc-location-types';
import { Geometry } from './geometry';
import { OrgStructure } from './org-structure';
export interface BcLocations {
  geometryLocation?: string;
  id?: number;
  isActive?: boolean;
  latitude?: string;
  location?: Geometry;
  locationType?: BcLocationTypes;
  longitude?: string;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: OrgStructure;
  sector?: number;
  zone?: number;
}

