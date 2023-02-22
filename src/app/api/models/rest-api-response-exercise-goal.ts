/* tslint:disable */
/* eslint-disable */
import { ApiErrorExerciseGoal } from './api-error-exercise-goal';
import { ExerciseGoal } from './exercise-goal';
export interface RestApiResponseExerciseGoal {
  error?: ApiErrorExerciseGoal;
  result?: ExerciseGoal;
  status?: boolean;
}

