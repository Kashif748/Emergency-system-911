/* tslint:disable */
/* eslint-disable */
import { BcResources } from './bc-resources';
export interface BcResourcesRecords {
  alternateSource?: string;
  id?: number;
  isActive?: boolean;
  isCritical?: boolean;
  location?: string;
  recordCustodian?: string;
  recordName: string;
  recordType: string;
  resource: BcResources;
}

