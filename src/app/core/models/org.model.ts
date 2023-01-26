import {
  AdcdaArea,
  AdcdaClassification,
  AdcdaSector,
  EntityType,
  Geometry,
  OrgStructure,
  OrgStructureProjection,
} from 'src/app/api/models';
import { TreeModel } from './tree.model';

export class OrgModel implements TreeModel {
  adcdaClassifcation?: AdcdaClassification;
  area?: AdcdaArea;
  code: string;
  internal: boolean;
  isActive: boolean;
  location?: Geometry;
  loginNormal?: boolean;
  nameAr: string;
  nameEn: string;
  newsId?: number;
  radioFreq?: string;
  realId?: number;
  repGrpId?: number;
  sector?: AdcdaSector;
  smsGateway?: 'ETISALAT' | 'MIDDLEWARE';
  smsMunicipalityCode?: string;
  theme?: 'GOLD' | 'SILVER' | 'BRONZE' | number;
  themeReason?: string;
  tradeLicense?: string;
  id: number;
  logo: string;
  parent: OrgModel;
  entityType: EntityType;
  managerGroupId: number;
  representativeGroupId: any;
  officialEmail: string;
  mobno: string;
  adcdaPrimary: boolean;
  loginUaePass: boolean;
  systemUser: boolean;
  ldapUser: boolean;
  ldapOrgId: number;
  center: number;
  loginOtp: boolean;
  loginCaptcha: boolean;
  contractorExpDate: Date;
  contractorContractNo: string;
  specialistId: number;
  managerId: number;
  collapse: boolean;
  children: OrgModel[];

  constructor(org: OrgStructure & OrgStructureProjection) {
    this.id = org.id || null;
    this.code = org.code || '';
    this.entityType = org.entityType;
    this.managerGroupId = org.managerGroupId;
    this.nameAr = org.nameAr;
    this.nameEn = org.nameEn;
    this.representativeGroupId = org.representativeGroupId;
    this.logo = './assets/logos/ar_logo.jpg';
    this.officialEmail = org.officialEmail;
    this.mobno = org.mobno || org['officialMobile'];
    this.isActive = org.isActive;
    this.internal = org.internal;
    this.center = org.center;
    this.area = org?.area;
    this.adcdaClassifcation = org?.adcdaClassifcation;
    this.sector = org?.sector;
    this.adcdaPrimary = org?.adcdaPrimary;

    this.loginCaptcha = org?.loginCaptcha;
    this.loginOtp = org?.loginOtp;
    this.ldapOrgId = org?.ldapOrgId;
    this.ldapUser = ![undefined, null].includes(org?.ldapOrgId);
    this.systemUser = !this.ldapUser;
    this.loginUaePass = org?.loginUaePass;
    this.collapse = true;

    this.contractorContractNo = org.contractorContractNo;
    this.contractorExpDate = new Date(org.contractorExpDate);

    this.managerId = org.managerId;
    this.specialistId = org.specialistId;

    this.location = org.location;
  }
}
