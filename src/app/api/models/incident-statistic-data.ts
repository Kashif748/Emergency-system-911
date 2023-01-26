/* tslint:disable */
/* eslint-disable */
import { IncidentData } from './incident-data';
import { InquiryData } from './inquiry-data';
import { InterimIncidentData } from './interim-incident-data';
export interface IncidentStatisticData {
  incidents?: IncidentData;
  inquiry?: InquiryData;
  interimIncidents?: InterimIncidentData;
}

