/* tslint:disable */
/* eslint-disable */
import { AdcdaArea } from './adcda-area';
import { AdcdaClassification } from './adcda-classification';
import { AdcdaSector } from './adcda-sector';
import { EntityType } from './entity-type';
import { OrgStructure } from './org-structure';
export interface OrgStructureDetails {
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
  internal?: boolean;
  isActive?: boolean;
  location?: string;
  loginCaptcha?: boolean;
  loginOtp?: boolean;
  loginUaePass?: boolean;
  managerId?: number;
  mapGisLayer?: string;
  mobno?: string;
  municipalityCode?: string;
  nameAr: string;
  nameEn: string;
  nationalCompliance?: number;
  officialEmail?: string;
  operationNumbers?: number;
  parentOrg?: OrgStructure;
  radioFreq?: string;
  sector?: AdcdaSector;
  smsGateway?: string;
  specialistId?: number;
  tradeLicense?: string;
  type: string;
  useParentLogo?: boolean;
}

