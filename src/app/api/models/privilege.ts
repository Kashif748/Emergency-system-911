/* tslint:disable */
/* eslint-disable */
export interface Privilege {
  actiontypeId?: number;
  active: boolean;
  code: string;
  descAr: string;
  descEn: string;
  id?: number;
  moduleId?: number;
  nameAr: string;
  nameEn: string;
  parentPrivilage?: Privilege;
}

