/* tslint:disable */
/* eslint-disable */
import { BcActivities } from './bc-activities';
import { BcCycles } from './bc-cycles';
export interface  BcActivityEmployees {
  activity: BcActivities;
  cycle: BcCycles;
  employeeNameAr?: string;
  employeeNameEn?: string;
  id?: number;
  isActive?: boolean;
  isPrimary?: boolean;
  mobileNumber?: string;
  orderSequence?: number;
  phoneNumber?: string;
  secondNumber?: string;
}

