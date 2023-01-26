/* tslint:disable */
/* eslint-disable */
export interface EventsConfig {
  active?: boolean;
  code: 'C_TASK' | 'U_TASK' | 'C_CORR' | 'S_CIR' | 'C_INC_WL' | 'C_INC' | 'U_INC' | 'CLOSE_INC' | 'C_TASK_WL' | 'D_METRICS' | 'NOT_INC_REP_ON_CRE' | 'NOT_INC_REP_ON_CLS' | 'TASK_STATUS_CHNG' | 'TASK_REASSIGNED_TEAM' | 'C_INTERIM_INC' | 'DECLINE_INTERIM_INC' | 'NOTIFY_INCIDENT_REPORTER' | 'INCIDENT_REMINDER_NTF' | 'NOTIFY_INCIDENT_SALAMA_USER' | 'FORGET_PASSWORD' | 'CALL_FOR_DUTY' | 'C_USER';
  emailNotif?: boolean;
  id?: number;
  lastModified?: string;
  moduleId?: number;
  name: string;
  pushNotif?: boolean;
  smsNotif?: boolean;
}

