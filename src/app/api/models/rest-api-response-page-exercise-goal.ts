/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageExerciseGoal } from './api-error-page-exercise-goal';
import { PageExerciseGoal } from './page-exercise-goal';
export interface RestApiResponsePageExerciseGoal {
  error?: ApiErrorPageExerciseGoal;
  result?: PageExerciseGoal;
  status?: boolean;
}

