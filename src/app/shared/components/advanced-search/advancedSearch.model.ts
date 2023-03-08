export enum AdvancedSearchFieldsEnum {
  SR_NO = 'id',
  SERIAL ='serial',
  SUBJECT = 'subject',
  CREATED_BY = 'createdByUser',
  STATUS = 'status',
  CREATED_DATE = 'fromDate',
  END_DATE = 'toDate',
  PRIORITY = 'priority',
  CITY = 'city',
  CATEGORY = 'category',
  REPORTING_VIA = 'reportingVia',
  RESPONSIBLE_ORG = 'responsibleOrg',
  IS_KPI_EXPIRED = 'isKpiExpired',
  FILTER_KPI = 'filterKpi',
  DESCRIPTION = 'description',
  INQUIRY = 'subject',
  REPORTING_CONTACT = 'reporterContact',
  LEADING_ORG = 'organization',
  GROUP = 'group',
}

export interface IsExpiredOption {
  value: string | boolean;
  labelKey: string;
}

export const isExpiredFilterOption: IsExpiredOption[] = [
  { value: true, labelKey: 'INCIDENTS.EXPIRED' },
  { value: false, labelKey: 'INCIDENTS.NOT_EXPIRED' },
  { value: 'noKpi', labelKey: 'INCIDENTS.NO_KPI' },
];
