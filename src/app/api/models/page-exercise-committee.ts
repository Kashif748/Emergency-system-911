/* tslint:disable */
/* eslint-disable */
import { ExerciseCommittee } from './exercise-committee';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseCommittee {
  content?: Array<ExerciseCommittee>;
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

