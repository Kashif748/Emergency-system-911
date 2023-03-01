/* tslint:disable */
/* eslint-disable */
import { Version } from './version';
export interface VersionWithLastSupported {
  lastSupportedVersion?: number;
  totalElements?: number;
  totalPage?: number;
  versions?: Array<Version>;
}

