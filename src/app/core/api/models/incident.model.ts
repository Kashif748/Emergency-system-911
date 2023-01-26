export interface ReportItem {
  key: string;
  count: number;
}
export interface IncidentReport {
  totalCount: number;
  emergencyLevel: ReportItem[]; //
  priority: ReportItem[]; //
  status: ReportItem[]; //
  city: ReportItem[];
  riskImpact: ReportItem[]; //
  category: ReportItem[]; //
  kpi: ReportItem[];
}

export interface IncidentStatistics {
  incidents?: {
    total: number;
    inProgress: IncidentStatisticsDetails;
    completed: IncidentStatisticsDetails;
  };
  inquiry?: { total: number };
  interimIncidents?: {
    total: number;
    underEvaluation: IncidentStatisticsDetails;
  };
}

export interface IncidentStatisticsDetails {
  total: number;
  id: number;
  descAr: string;
  descEn: string;
}
