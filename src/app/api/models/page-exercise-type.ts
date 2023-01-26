/* tslint:disable */
/* eslint-disable */
import { ExerciseType } from './exercise-type';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseType {
  content?: Array<ExerciseType>;
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

