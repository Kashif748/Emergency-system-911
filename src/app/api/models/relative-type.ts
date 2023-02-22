/* tslint:disable */
/* eslint-disable */
import { DetailType } from './detail-type';
import { IdentityCardType } from './identity-card-type';
import { PersonNameType } from './person-name-type';
export interface RelativeType {
  birthDate?: string;
  identityCard?: IdentityCardType;
  name?: PersonNameType;
  nationality?: DetailType;
  relation?: DetailType;
  un?: string;
}

