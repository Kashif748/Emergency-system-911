export enum IncidentViewsEnum {
  IN_PROGRESS_INCIDENTS = 1,
  INTERIM_INCIDENTS,
  COMPLETED_INCIDENTS,
  REJECTED_INCIDENTS,
  INQUIRIES,
  ALL_INCIDENTS,
}

export enum RowValueEnum {
  SR_NO = 'id',
  SERIAL ='serial',
  YEAR ='year',
  SUBJECT = 'subject',
  INCIDENT_DATE = 'incidentDate',
  CREATED_BY = 'createdByUser',
  STATUS = 'status',
  PRIORITY = 'priority',
  CITY = 'city',
  CENTER = 'center',
  MAIN_CATEGORY = 'incidentParentCategory',
  REPORTING_VIA = 'reportingVia',
  RESPONSIBLE_ORG = 'responsibleOrg',
  IS_KPI_EXPIRED = 'isKpiExpired',
  FILTER_KPI = 'filterKpi',
  DESCRIPTION = 'description',
  INQUIRY = 'subject',
  REPORTING_CONTACT = 'reportedByMobile',
  LEADING_ORG = 'organization',
  CREATED_DATE = 'createdDate',
  CREATED_ON = 'createdOn',
  GROUPS = 'incidentGroups',
  REPORTER_CONTANCT = 'reporterContact',
  PARENT_ORG = 'incidentOrgs',
  TASKS = 'tasks',
}

export const COLUMNS = {
  Incidents: [
    // { name: 'INCIDENTS.SR_NO', value: 'id', order: 1 },
    { name: 'INCIDENTS.SERIAL', value: 'serial', order: 1 },
    {
      name: 'INCIDENTS.INCIDENT_SUBJECT',
      value: 'subject',
      order: 2,
    },
    { name: 'INCIDENTS.DATE', value: 'incidentDate', order: 3 },
    { name: 'INCIDENTS.PRIORITY', value: 'priority', order: 4 },
    {
      name: 'INCIDENTS.MAIN_CATEGORY',
      value: 'incidentParentCategory',
      order: 5,
    },
    {
      name: 'INCIDENTS.GEOGHRAPICAL_CENTER',
      value: 'center',
      order: 6,
    },
    { name: 'INCIDENTS.GROUPS', value: 'incidentGroups', order: 7 },
    { name: 'INCIDENTS.RESPONSIBLE_ORG', value: 'responsibleOrg', order: 8 },
    { name: 'INCIDENTS.SPECIALIZED_CENTER', value: 'incidentOrgs', order: 9 },
    { name: 'INCIDENTS.TASKS', value: 'tasks', order: 10 },
  ],
  Inquiries: [
    // { value: 'id', name: 'INCIDENTS.INQUIRIES.ID', order: 1 },
    { name: 'INCIDENTS.SR_NO', value: 'id', order: 1 },
    { value: 'subject', name: 'INCIDENTS.INQUIRIES.SUBJECT', order: 2 },
    {
      value: 'createdDate',
      name: 'INCIDENTS.INQUIRIES.CREATED_DATE',
      order: 3,
    },
    {
      value: 'reportedByMobile',
      name: 'INCIDENTS.INQUIRIES.REPORTER_PHONE',
      order: 4,
    },
  ],
  InterimIncidents: [
    { name: 'INCIDENTS.SERIAL', value: 'serial', order: 1 },
    // { name: 'INCIDENTS.SR_NO', value: 'serial', order: 1 },
    {
      name: 'INCIDENTS.INCIDENT_SUBJECT',
      value: 'description',
      order: 2,
    },
    { name: 'INCIDENTS.DATE', value: 'createdOn', order: 3 },
    {
      value: 'reporterContact',
      name: 'INCIDENTS.INQUIRIES.REPORTER_PHONE',
      order: 4,
    },
    {
      value: 'reportingVia',
      name: 'INCIDENTS.REPORTINGVIA',
      order: 5,
    },
    {
      value: 'status',
      name: 'INCIDENTS.STATUS',
      order: 6,
    },
  ],
};

export enum IncidentViewNavigation {
  VIEW_INCIDENT,
  VIEW_INQURY,
  VIEW_INTERIM_INCIDENT,
  ADD_INCIDENT,
  APPROVE_INTERIM_INCIDENT,
  APPROVE_INTERIM,
}

export const INTERIM_STATUS = [
  {
    id: 0,
    nameEn: 'Under Evaluation',
    nameAr: 'تحت التقييم',
    value: 'UNDER_EVALUATION',
  },
  { id: 1, nameEn: 'Approved', nameAr: 'معتمد', value: 'APPROVED' },
  { id: 2, nameEn: 'Declined', nameAr: 'مرفوض', value: 'DECLINED' },
  { id: 3, nameEn: 'Transferred', nameAr: 'تحويل', value: 'TRANSFERRED' },
];

export interface DisplayedColumn {
  name: string;
  value: string;
  key?: string;
}

export enum DashboardModules {
  INCIDENTS = 'incidents',
  INTERIM_INCIDENTS = 'interimIncidents',
  INQUIRIES = 'inquiry',
}
