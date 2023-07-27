/* tslint:disable */
/* eslint-disable */
export interface TaskMetricsDetails {
  averageNumberOfTasksPerHour?: number;
  closeRateWithinTheSpecificTime?: number;
  numberOfTasksPerEachCategory?: Array<{ [key: string]: {  } }>;
  priority?: Array<{ [key: string]: {  } }>;
  taskStatus?: Array<{ [key: string]: {  } }>;
  taskType?: Array<{ [key: string]: {  } }>;
  totalTask?: number;
  totalTaskPerEachZone?: Array<{ [key: string]: {  } }>;
}

