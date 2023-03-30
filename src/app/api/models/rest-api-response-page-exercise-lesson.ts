/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageExerciseLesson } from './api-error-page-exercise-lesson';
import { PageExerciseLesson } from './page-exercise-lesson';
export interface RestApiResponsePageExerciseLesson {
  error?: ApiErrorPageExerciseLesson;
  result?: PageExerciseLesson;
  status?: boolean;
}

