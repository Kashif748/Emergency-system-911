/* tslint:disable */
/* eslint-disable */
import { ApiErrorExerciseLesson } from './api-error-exercise-lesson';
import { ExerciseLesson } from './exercise-lesson';
export interface RestApiResponseExerciseLesson {
  error?: ApiErrorExerciseLesson;
  result?: ExerciseLesson;
  status?: boolean;
}

