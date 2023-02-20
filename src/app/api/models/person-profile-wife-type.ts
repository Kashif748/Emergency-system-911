/* tslint:disable */
/* eslint-disable */
import { DetailType } from './detail-type';
import { IdentityCardType } from './identity-card-type';
import { PersonNameType } from './person-name-type';
export interface PersonProfileWifeType {
  birthDate?: string;
  identityCard?: IdentityCardType;
  name?: PersonNameType;
  nationality?: DetailType;
  un?: string;
}

