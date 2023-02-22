/* tslint:disable */
/* eslint-disable */
import { ExternalPhonebook } from './external-phonebook';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExternalPhonebook {
  content?: Array<ExternalPhonebook>;
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

