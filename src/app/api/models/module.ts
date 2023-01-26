/* tslint:disable */
/* eslint-disable */
export interface Module {
  active?: boolean;
  code: string;
  descAr?: string;
  descEn?: string;
  icon?: string;
  id?: number;
  isDefault?: boolean;
  isPublic?: boolean;
  modules?: Array<Module>;
  nameAr: string;
  nameEn: string;
  order?: string;
  parent?: Module;
  routing?: string;
  tableName?: string;
  widget?: boolean;
}

