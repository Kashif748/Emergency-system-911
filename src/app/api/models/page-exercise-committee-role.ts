/* tslint:disable */
/* eslint-disable */
import { ExerciseCommitteeRole } from './exercise-committee-role';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseCommitteeRole {
  content?: Array<ExerciseCommitteeRole>;
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

