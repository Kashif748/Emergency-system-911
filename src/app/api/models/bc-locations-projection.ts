/* tslint:disable */
/* eslint-disable */
import { Geometry } from './geometry';
import { IdNameProjection } from './id-name-projection';
export interface BcLocationsProjection {
  district?: IdNameProjection;
  getisActive?: boolean;
  id?: number;
  latitude?: string;
  location?: Geometry;
  locationType?: IdNameProjection;
  longitude?: string;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: IdNameProjection;
}

