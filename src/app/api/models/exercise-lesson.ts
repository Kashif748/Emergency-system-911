/* tslint:disable */
/* eslint-disable */
import { Exercise } from './exercise';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface ExerciseLesson {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  exercise?: Exercise;
  exerciseLesson?: ExerciseLesson;
  id?: number;
  isActive?: boolean;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

