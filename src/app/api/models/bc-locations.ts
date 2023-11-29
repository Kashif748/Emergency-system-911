/* tslint:disable */
/* eslint-disable */
import { BcLocationTypes } from './bc-location-types';
import { Geometry } from './geometry';
import { LocationInfo } from './location-info';
import { OrgStructure } from './org-structure';
export interface BcLocations {
  district?: LocationInfo;
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
  sequenceNumber?: number;
  zone?: number;
}

