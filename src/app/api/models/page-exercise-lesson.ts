/* tslint:disable */
/* eslint-disable */
import { ExerciseLesson } from './exercise-lesson';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseLesson {
  content?: Array<ExerciseLesson>;
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

