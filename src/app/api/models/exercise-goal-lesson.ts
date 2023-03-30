/* tslint:disable */
/* eslint-disable */
import { ExerciseGoal } from './exercise-goal';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface ExerciseGoalLesson {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  desc?: string;
  exerciseGoal?: ExerciseGoal;
  id?: number;
  isActive?: boolean;
  nameAr: string;
  nameEn: string;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

