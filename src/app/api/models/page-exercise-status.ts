/* tslint:disable */
/* eslint-disable */
import { ExerciseStatus } from './exercise-status';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseStatus {
  content?: Array<ExerciseStatus>;
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

