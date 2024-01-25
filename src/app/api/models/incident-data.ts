/* tslint:disable */
/* eslint-disable */
import { CategoryData } from './category-data';
import { CenterData } from './center-data';
import { PriorityData } from './priority-data';
import { TotalData } from './total-data';
export interface IncidentData {
  categoryData?: Array<CategoryData>;
  centerData?: Array<CenterData>;
  completed?: TotalData;
  draft?: TotalData;
  inProgress?: TotalData;
  priorityData?: Array<PriorityData>;
  rejected?: TotalData;
  total?: number;
}

