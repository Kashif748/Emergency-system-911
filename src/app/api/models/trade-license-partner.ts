/* tslint:disable */
/* eslint-disable */
import { LicenseRelationshipCode } from './license-relationship-code';
import { PartnerNationalityCode } from './partner-nationality-code';
export interface TradeLicensePartner {
  LicenseRelationshipCode?: LicenseRelationshipCode;
  PartnerNameArb?: string;
  PartnerNameEng?: string;
  PartnerNationalityCode?: PartnerNationalityCode;
  PartnerSharePercentage?: number;
}

