import { Iorganization } from './organization.interface';
import { EntityType } from './entityType.model';
export class Organization {
  id: number;
  code: string;
  logo: string;
  nameAr: string;
  nameEn: string;
  parent: number;
  isActive: boolean;
  internal: boolean;
  entityType: EntityType;
  managerGroupId: number;
  representativeGroupId: any;
  pid: number;
  officialEmail: string;
  // antoher name for the parent obj
  parentOrg: number;
  mobno: string;

  area?: { id: string };
  adcdaClassifcation?: { id: string };
  sector?: { id: string };
  adcdaPrimary: boolean;

  loginUaePass: boolean;
  systemUser: boolean;

  ldapUser: boolean;
  ldapOrgId: number;
  center: number;
  loginOtp: boolean;
  loginCaptcha: boolean;
  // useParentLogo: boolean;
  children: Organization[];
  contractorExpDate: Date;
  contractorContractNo: string;
  specialistId: number;
  managerId: number;
  collapse: boolean;
  parentNode: Organization;
  location: string;
  constructor(org: Iorganization) {
    this.id = org.id || null;
    this.code = org.code || '';
    this.entityType = new EntityType(org.entityType);
    this.managerGroupId = org.managerGroupId;
    this.nameAr = org.nameAr;
    this.nameEn = org.nameEn;
    this.parent = org.parent ? org.parent.id : null;
    this.representativeGroupId = org.representativeGroupId;
    this.parentOrg = org.parentOrg ? org.parentOrg.id : null;
    this.pid = this.parent || this.parentOrg;
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
    // this.useParentLogo = org?.useParentLogo;
    this.loginOtp = org?.loginOtp;
    this.ldapOrgId = org?.ldapOrgId;
    this.ldapUser = org?.ldapUser;
    this.systemUser = org?.systemUser || true;
    this.loginUaePass = org?.loginUaePass;
    this.children = null;

    this.collapse = true;

    this.contractorContractNo = org.contractorContractNo;
    this.contractorExpDate = org.contractorExpDate;

    this.managerId = org.managerId;
    this.specialistId = org.specialistId;

    this.location = org.location;
  }
}

export interface IOrganization {
  adcdaClassification: ForeignModel;
  adcdaPrimary: boolean;
  area: ForeignModel;
  center: number;
  code: string;
  contractorContractNo: string;
  contractorExpDate: string;
  entityType: SimpleForeignModel;
  internal: number;
  isActive: boolean;
  location: string;
  loginCaptcha: boolean;
  loginOtp: boolean;
  loginUaePass: boolean;
  managerId: number;
  mobno: string;
  municipalityCode: string;
  nameAr: string;
  nameEn: string;
  officialEmail: string;
  parentOrg: Organization;
  radioFreq: string;
  sector: ForeignModel;
  smsGateway: string;
  specialistId: number;
  tradeLicense: string;
  useParentLogo: boolean;
}

export interface ForeignModel {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

interface SimpleForeignModel {
  id: number;
}

export interface JGeometryType {
  geometry: JGeometry;
  mutable: boolean;
}

interface JGeometry {
  circle?: boolean;
  dimensions?: number;
  elemInfo?: number[];
  firstPoint?: number[];
  geodeticMBR?: boolean;
  javaPoint?: Point2D; 
  javaPoints? : Point2D[];
  labelPoint?: Point2D;
  lastPoint?: number[];
  lrsgeometry?: boolean;
  mbr?: number[];
  multiPoint?: boolean;
  numPoints?: number[];
  ordinatesArray?: number[];
  ordinatesOfElements?: [];
  point: number[];
  rectangle?: boolean;
  size?: number;
  srid: number;
  type: number;
}

interface Point2D {
  location: {}; 
  x: number;
  y: number;
}
