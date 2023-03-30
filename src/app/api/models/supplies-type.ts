/* tslint:disable */
/* eslint-disable */
import { TaskAssetsDetails } from './task-assets-details';
import { TaskTypeFamily } from './task-type-family';
export interface SuppliesType extends TaskTypeFamily {
  asset?: TaskAssetsDetails;
  desc?: string;
  provisionedQuantity?: number;
  requestQuantity?: number;
}

