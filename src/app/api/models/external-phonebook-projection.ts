/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
export interface ExternalPhonebookProjection {
  createdAt?: string;
  createdBy?: IEntity;
  id?: number;
  isActive?: boolean;
  isInternal?: boolean;
  jobTitle?: string;
  mobileNumber?: string;
  nameAr?: string;
  nameEn?: string;
  notes?: string;
  orgName?: string;
  orgStructure?: IEntity;
  phoneNumber?: string;
  referenceOrgId?: IEntity;
  title?: string;
  updatedAt?: string;
  updatedBy?: IEntity;
}

