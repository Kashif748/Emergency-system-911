/* tslint:disable */
/* eslint-disable */
import { UserEmailNameProjection } from './user-email-name-projection';
export interface UserSessionAuditProjection {
  id?: number;
  time?: string;
  type?: 'LOGIN' | 'LOGOUT';
  user?: UserEmailNameProjection;
}

