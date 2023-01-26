export enum NOTIFICATION_TABLE_TYPES {
  SMS,
  EMAIL,
  PUSH,
}
export const NOTIFICATION_TABLE_COLUMNS = {
  SMS_TABLE: ['id', 'mobile', 'createdOn', 'sms', 'status'],
  EMAILS_TABLE: ['id', 'to', 'cc', 'createdOn', 'subject', 'body', 'status'],
  PUSH_TABLE: ['id', 'user', 'createdOn', 'title', 'sms', 'status'],
};

export enum NOTIFICATION_STATUS {
  IN_PROCESS = 'IN_PROCESS',
  SENT = 'SENT',
  FAILED = 'FAILED',
  WARNING = 'WARNING',
  READ = 'READ',
  NOT_READ = 'NOT_READ',
}
