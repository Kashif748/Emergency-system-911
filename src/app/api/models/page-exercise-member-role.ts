/* tslint:disable */
/* eslint-disable */
import { ExerciseMemberRole } from './exercise-member-role';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageExerciseMemberRole {
  content?: Array<ExerciseMemberRole>;
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

