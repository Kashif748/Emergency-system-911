/* tslint:disable */
/* eslint-disable */
import { ExerciseGoal } from './exercise-goal';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseGoal {
  content?: Array<ExerciseGoal>;
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

