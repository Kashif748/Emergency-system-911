/* tslint:disable */
/* eslint-disable */
import { Confidentialty } from './confidentialty';
import { ExerciseStatus } from './exercise-status';
import { ExerciseType } from './exercise-type';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Exercise {
  code?: string;
  confidentialty?: Confidentialty;
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  deputy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  desc?: string;
  director?: (User | UserInappAuthentication | UserMiddlewareAuth);
  executionDate?: string;
  executiveDirectorWord?: string;
  generalExecutionInstructions?: string;
  healthSaftyInstructions?: string;
  id?: number;
  isActive?: boolean;
  location?: string;
  nameAr: string;
  nameEn: string;
  status?: ExerciseStatus;
  type?: ExerciseType;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

