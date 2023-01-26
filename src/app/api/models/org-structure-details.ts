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
  entityType?: EntityType;
  id?: number;
  internal?: boolean;
  isActive?: boolean;
  location?: string;
  loginCaptcha?: boolean;
  loginOtp?: boolean;
  loginUaePass?: boolean;
  managerId?: number;
  mobno?: string;
  municipalityCode?: string;
  nameAr: string;
  nameEn: string;
  officialEmail?: string;
  parentOrg?: OrgStructure;
  radioFreq?: string;
  sector?: AdcdaSector;
  smsGateway?: string;
  specialistId?: number;
  tradeLicense?: string;
  type: string;
  useParentLogo?: boolean;
}

