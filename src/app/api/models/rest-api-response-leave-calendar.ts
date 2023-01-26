/* tslint:disable */
/* eslint-disable */
import { ApiErrorLeaveCalendar } from './api-error-leave-calendar';
import { LeaveCalendar } from './leave-calendar';
export interface RestApiResponseLeaveCalendar {
  error?: ApiErrorLeaveCalendar;
  result?: LeaveCalendar;
  status?: boolean;
}

