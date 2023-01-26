/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface GroupZonesProjection {
  groups?: IdNameProjection;
  orgStructure?: OrgStructureMinimumProjection;
  zones?: Array<number>;
}

