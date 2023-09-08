/* tslint:disable */
/* eslint-disable */
import { BcResources } from './bc-resources';
import { BcSystems } from './bc-systems';
export interface BcResourcesAppAndSoftware {
  applicationAndSoftware: BcSystems;
  id?: number;
  isActive?: boolean;
  licenseType?: string;
  minLicenseRequired: string;
  numberOfLicense?: number;
  numberOfUsers?: number;
  purpose?: string;
  resource: BcResources;
}

