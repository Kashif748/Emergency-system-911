/* tslint:disable */
/* eslint-disable */
import { TradeLicenseActivity } from './trade-license-activity';
import { TradeLicenseBasicInfo } from './trade-license-basic-info';
import { TradeLicensePartner } from './trade-license-partner';
export interface Contents {
  TradeLicenseActivities?: Array<TradeLicenseActivity>;
  TradeLicenseBasicInfo?: TradeLicenseBasicInfo;
  TradeLicensePartners?: Array<TradeLicensePartner>;
}

