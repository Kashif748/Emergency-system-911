/* tslint:disable */
/* eslint-disable */
import { ApiErrorListAttachmentsWorkLogModel } from './api-error-list-attachments-work-log-model';
import { AttachmentsWorkLogModel } from './attachments-work-log-model';
export interface RestApiResponseListAttachmentsWorkLogModel {
  error?: ApiErrorListAttachmentsWorkLogModel;
  result?: Array<AttachmentsWorkLogModel>;
  status?: boolean;
}

