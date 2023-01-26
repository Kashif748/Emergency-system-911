import { IentityType } from './entityType.interface';

export interface Iorganization {
  id?: number;
  code?: string;
  isActive?: boolean;
  internal?: boolean;
  entityType?: IentityType;
  managerGroupId?: number;
  nameAr?: string;
  nameEn?: string;
  parent?: { id: number };
  parentOrg?: { id: number };
  representativeGroupId?: any;
  officialEmail?: string;
  mobno?: string;
  loginUaePass?: boolean;
  systemUser?: boolean;
  useParentLogo?: boolean;
  center: number;
  area?: { id: string };
  adcdaClassifcation?: { id: string };
  sector?: { id: string };
  adcdaPrimary?: boolean;

  ldapUser?: boolean;
  ldapOrgId?: number;

  loginOtp?: boolean;
  loginCaptcha?: boolean;
  children?: Iorganization[];

  contractorExpDate: Date;
  contractorContractNo: string;

  specialistId: number;
  managerId: number;
  location: string;
}
