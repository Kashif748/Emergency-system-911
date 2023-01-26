/* tslint:disable */
/* eslint-disable */
import { HospitalProjection } from './hospital-projection';
export interface IncidentHospitalProjection {
  deaths?: number;
  hospital?: HospitalProjection;
  id?: number;
  logDate?: string;
  majorInjuries?: number;
  minorInjuries?: number;
  normalInjuries?: number;
  staff?: boolean;
}

