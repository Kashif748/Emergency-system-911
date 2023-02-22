/* tslint:disable */
/* eslint-disable */
import { Centers } from './centers';
import { IdNameProjection } from './id-name-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface GroupCentersProjection {
  centers?: Array<Centers>;
  groups?: IdNameProjection;
  orgStructure?: OrgStructureMinimumProjection;
}

