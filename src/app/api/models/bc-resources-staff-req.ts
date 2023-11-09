/* tslint:disable */
/* eslint-disable */
import { BcResources } from './bc-resources';
import { BcResourcesDesignation } from './bc-resources-designation';
export interface BcResourcesStaffReq {
  bauReqs?: string;
  id?: number;
  isActive?: boolean;
  keyResponsibilities?: string;
  minPersonnelRequired: string;
  primaryEmpName?: string;
  resource: BcResources;
  resourceDesignation: BcResourcesDesignation;
  secondaryEmp1Name?: string;
  secondaryEmp2Name?: string;
}

