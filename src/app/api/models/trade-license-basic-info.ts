/* tslint:disable */
/* eslint-disable */
import { BusinessLicenseStatus } from './business-license-status';
import { EstablishmentCountry } from './establishment-country';
import { IssuePlace } from './issue-place';
import { LegalForm } from './legal-form';
import { LicenseTypeCode } from './license-type-code';
export interface TradeLicenseBasicInfo {
  ADCCIUnifiedID?: number;
  BuildingNumber?: number;
  BusinessLicenseAddressArb?: string;
  BusinessLicenseAddressEng?: string;
  BusinessLicenseBranchFlag?: boolean;
  BusinessLicenseExpiryDate?: string;
  BusinessLicenseIssueDate?: string;
  BusinessLicenseStatus?: BusinessLicenseStatus;
  BusinessNameArb?: string;
  BusinessNameEng?: string;
  BusinesslicenseCityArb?: string;
  BusinesslicenseCityEng?: string;
  CoordinatesX?: number;
  CoordinatesY?: number;
  EstablishmentCountry?: EstablishmentCountry;
  EstablishmentDate?: string;
  IssuePlace?: IssuePlace;
  LegalForm?: LegalForm;
  LicenseRemarks?: string;
  LicenseTypeCode?: LicenseTypeCode;
  PROMobileNumber?: number;
  TradeLicenseNumber?: string;
}

