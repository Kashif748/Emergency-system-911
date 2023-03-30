/* tslint:disable */
/* eslint-disable */
import { Exercise } from './exercise';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExercise {
  content?: Array<Exercise>;
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

