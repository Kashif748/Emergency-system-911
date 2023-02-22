/* tslint:disable */
/* eslint-disable */
import { AddressesTypeInfo } from './addresses-type-info';
import { PersonNameTypeInfo } from './person-name-type-info';
export interface PersonalInfoProfile {
  addresses?: Array<AddressesTypeInfo>;
  personName?: PersonNameTypeInfo;
}

