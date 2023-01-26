/* tslint:disable */
/* eslint-disable */
import { Exercise } from './exercise';
import { ExerciseCommitteeRole } from './exercise-committee-role';
import { ExerciseMemberRole } from './exercise-member-role';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface ExerciseCommittee {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  exercise?: Exercise;
  exerciseCommitteeRole?: ExerciseCommitteeRole;
  exerciseMemberRole?: ExerciseMemberRole;
  id?: number;
  isActive?: boolean;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  user?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

