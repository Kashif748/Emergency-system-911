/* tslint:disable */
/* eslint-disable */
import { AdcdaClassification } from './adcda-classification';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAdcdaClassification {
  content?: Array<AdcdaClassification>;
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

