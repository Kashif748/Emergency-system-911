/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
export interface BcActivityEmployees {
  activity: BcActivities;
  cycle: BcCycles;
  email?: string;
  employeeNameAr?: string;
  employeeNameEn?: string;
  id?: number;
  isActive?: boolean;
  isPrimary?: boolean;
  mobileNumber?: string;
  orderSequence?: number;
  phoneNumber?: string;
  referenceId?: number;
  secondNumber?: string;
  sequenceNumber?: number;
}

