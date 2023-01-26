export interface IncidentFilter {
  id?: number;
  city?: number;
  createdDate?: string;
  emergencylevel?: string;
  filterKpi?: string;
  fromDate?: string;
  isKpiExpired?: boolean;
  offset?: number;
  organization?: { id: number };
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  priority?: string;
  sort?: { sorted: boolean; unsorted: boolean };
  status?: string;
  subject?: string;
  toDate?: string;
  unpaged?: boolean;
  category?: number;
  categoryId?: number;
  reportingVia?: number;
  createdByUser?: number;
  centerId?: number;
  responsibleOrg?: number;
  reporterContact?: string;
}
