/* tslint:disable */
/* eslint-disable */
import { Module } from './module';
import { OrgStructure } from './org-structure';
export interface ModuleOrg {
  allowToFollow?: boolean;
  enabled?: boolean;
  id?: number;
  modifiable?: boolean;
  module?: Module;
  orgStructure?: OrgStructure;
}

