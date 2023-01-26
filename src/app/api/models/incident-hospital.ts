/* tslint:disable */
/* eslint-disable */
import { Hospital } from './hospital';
export interface IncidentHospital {
  deaths?: number;
  hospital: Hospital;
  id?: number;
  logDate?: string;
  majorInjuries?: number;
  minorInjuries?: number;
  normalInjuries?: number;
  staff: boolean;
}

