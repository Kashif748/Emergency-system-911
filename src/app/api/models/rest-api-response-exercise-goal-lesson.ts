/* tslint:disable */
/* eslint-disable */
import { ApiErrorExerciseGoalLesson } from './api-error-exercise-goal-lesson';
import { ExerciseGoalLesson } from './exercise-goal-lesson';
export interface RestApiResponseExerciseGoalLesson {
  error?: ApiErrorExerciseGoalLesson;
  result?: ExerciseGoalLesson;
  status?: boolean;
}

