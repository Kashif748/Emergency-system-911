import { IncidentViewsEnum } from './new-incidents-view/const';

export interface PageConfig {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  id: string;
  sort: string;
  active: string;
}

export enum INCIDENTS_TABS {
  REPORTED_INCIDENT_TAB = 0,
  INTERIM_INCIDENT_TAB,
  CLOSED_INCIDENT_TAB,
  INQUIRY_TAB,
}

export enum INCIDENT_STATUS {
  IN_PROCESSING = '1',
  DONE = '2',
  REJECTED= '3',
  DELETED= '4',
  DRAFT ='5'
}

export interface DisplayColumn {
  id: string;
  keyTranslate: string;
}
