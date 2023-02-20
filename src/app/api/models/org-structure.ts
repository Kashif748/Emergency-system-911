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
  newsId?: number;
  officialEmail?: string;
  parentOrg: OrgStructure;
  radioFreq?: string;
  realId?: number;
  repGrpId?: number;
  sector?: AdcdaSector;
  smsGateway?: 'ETISALAT' | 'MIDDLEWARE';
  smsMunicipalityCode?: string;
  specialistId?: number;
  theme?: 'GOLD' | 'SILVER' | 'BRONZE';
  themeReason?: string;
  tradeLicense?: string;
}

