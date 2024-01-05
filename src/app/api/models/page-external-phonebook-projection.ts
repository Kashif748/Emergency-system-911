/* tslint:disable */
/* eslint-disable */
import { ExternalPhonebookProjection } from './external-phonebook-projection';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExternalPhonebookProjection {
  content?: Array<ExternalPhonebookProjection>;
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

