/* tslint:disable */
/* eslint-disable */
import { AttachmentPerSituationResponse } from './attachment-per-situation-response';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageAttachmentPerSituationResponse {
  content?: Array<AttachmentPerSituationResponse>;
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

