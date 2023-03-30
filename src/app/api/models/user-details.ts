/* tslint:disable */
/* eslint-disable */
import { SessionDetails } from './session-details';
export interface UserDetails {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  onLeave?: boolean;
  sessionAudit?: Array<SessionDetails>;
  uuid?: string;
}

