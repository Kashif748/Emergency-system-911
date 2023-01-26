/* tslint:disable */
/* eslint-disable */
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface City {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  id?: number;
  isActive?: boolean;
  municipalityAr?: string;
  municipalityEn?: string;
  nameAr: string;
  nameEn: string;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

