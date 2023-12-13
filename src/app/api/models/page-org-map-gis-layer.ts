/* tslint:disable */
/* eslint-disable */
import { OrgMapGisLayer } from './org-map-gis-layer';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageOrgMapGisLayer {
  content?: Array<OrgMapGisLayer>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}

