/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
export interface PriorityProjection {
  colorHexa: string;
  color?: string;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: IdNameProjection;
}
