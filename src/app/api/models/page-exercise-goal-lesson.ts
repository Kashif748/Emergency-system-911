/* tslint:disable */
/* eslint-disable */
import { ExerciseGoalLesson } from './exercise-goal-lesson';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseGoalLesson {
  content?: Array<ExerciseGoalLesson>;
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

