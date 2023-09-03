/* tslint:disable */
/* eslint-disable */
import { BcResources } from './bc-resources';
import { BcResourcesDesignation } from './bc-resources-designation';
import { BcResourcesRemoteWorkSystems } from './bc-resources-remote-work-systems';
import { BcWorkImportanceLevels } from './bc-work-importance-levels';
export interface BcResourcesRemoteWork {
  id?: number;
  importantLevel: BcWorkImportanceLevels;
  isActive?: boolean;
  notes?: string;
  resource: BcResources;
  resourceDesignation: BcResourcesDesignation;
  resourcesRemoteWorkSystems?: Array<BcResourcesRemoteWorkSystems>;
  skillsNeeded?: string;
  staffDistributionIn?: number;
  staffDistributionOut?: number;
}

