/* tslint:disable */
/* eslint-disable */
import { ApiErrorListShiftSnapshotResponse } from './api-error-list-shift-snapshot-response';
import { ShiftSnapshotResponse } from './shift-snapshot-response';
export interface RestApiResponseListShiftSnapshotResponse {
  error?: ApiErrorListShiftSnapshotResponse;
  result?: Array<ShiftSnapshotResponse>;
  status?: boolean;
}

