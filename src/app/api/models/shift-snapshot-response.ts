/* tslint:disable */
/* eslint-disable */
import { UserDetails } from './user-details';
export interface ShiftSnapshotResponse {
  durationInHours?: number;
  endDate?: string;
  id?: number;
  name?: string;
  seq?: number;
  startTime?: string;
  users?: Array<UserDetails>;
}

