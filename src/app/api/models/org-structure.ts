/* tslint:disable */
/* eslint-disable */
import { AdcdaArea } from './adcda-area';
import { AdcdaClassification } from './adcda-classification';
import { AdcdaSector } from './adcda-sector';
import { EntityType } from './entity-type';
import { Geometry } from './geometry';
export interface OrgStructure {
  adcdaClassifcation?: AdcdaClassification;
  adcdaPrimary?: boolean;
  area?: AdcdaArea;
  center?: number;
  code: string;
  contractorContractNo?: string;
  contractorExpDate?: string;
  currentSerial?: number;
  description?: string;
  employeeNumbers?: number;
  entityType?: EntityType;
  id?: number;
  initialSerial?: number;
  internal: boolean;
  isActive: boolean;
  location?: Geometry;
  loginCaptcha?: boolean;
  loginNormal?: boolean;
  loginOtp?: boolean;
  loginUaePass?: boolean;
  managerGroupId?: number;
  managerId?: number;
  mobno?: string;
  nameAr: string;
  nameEn: string;
  nationalCompliance?: number;
  newsId?: number;
  officialEmail?: string;
  operationNumbers?: number;
  parentOrg: OrgStructure;
  radioFreq?: string;
  realId?: number;
  repGrpId?: number;
  sector?: AdcdaSector;
  smsGateway?: 'ETISALAT' | 'MIDDLEWARE';
  smsMunicipalityCode?: string;
  specialistId?: number;
  theme?: 'STRATEGIC_LEVEL_GOLD' | 'OPERATIONAL_LEVEL_SILVER' | 'TACTICAL_LEVEL_BRONZE';
  themeReason?: string;
  tradeLicense?: string;
}

