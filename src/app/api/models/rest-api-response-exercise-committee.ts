/* tslint:disable */
/* eslint-disable */
import { ApiErrorExerciseCommittee } from './api-error-exercise-committee';
import { ExerciseCommittee } from './exercise-committee';
export interface RestApiResponseExerciseCommittee {
  error?: ApiErrorExerciseCommittee;
  result?: ExerciseCommittee;
  status?: boolean;
}

