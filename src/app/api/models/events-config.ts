/* tslint:disable */
/* eslint-disable */
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface EventsConfig {
  active?: boolean;
  code: 'C_TASK' | 'U_TASK' | 'C_CORR' | 'S_CIR' | 'C_INC_WL' | 'C_INC' | 'U_INC' | 'CLOSE_INC' | 'C_TASK_WL' | 'D_METRICS' | 'NOT_INC_REP_ON_CRE' | 'NOT_INC_REP_ON_CLS' | 'TASK_STATUS_CHNG' | 'TASK_REASSIGNED_TEAM' | 'C_INTERIM_INC' | 'DECLINE_INTERIM_INC' | 'NOTIFY_INCIDENT_REPORTER' | 'INCIDENT_REMINDER_NTF' | 'NOTIFY_INCIDENT_SALAMA_USER' | 'FORGET_PASSWORD' | 'CALL_FOR_DUTY' | 'C_USER' | 'CREATE_AVAYA' | 'U_INC_O' | 'CLOSE_TASK' | 'CREATE_NEWS_FOR_SITUATION' | 'CREATE_BC_LISTS_VERSION' | 'BC_VERSION_LISTS_UNDER_APPROVE' | 'BC_VERSION_LISTS_APPROVE' | 'BC_VERSION_LISTS_MODIFICATIONS' | 'BC_CYCLE_LISTS_UNDER_APPROVE' | 'BC_CYCLE_LISTS_APPROVE' | 'BC_CYCLE_LISTS_MODIFICATIONS' | 'C_ANALYSIS_CYCLE';
  emailNotif?: boolean;
  id?: number;
  lastModified?: string;
  moduleId?: number;
  name: string;
  popup?: boolean;
  pushNotif?: boolean;
  smsNotif?: boolean;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

