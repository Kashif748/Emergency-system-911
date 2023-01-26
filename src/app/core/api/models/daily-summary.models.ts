export interface Reporter {
  id?: number;
  firstNameAr?: string;
  firstNameEn?: string;
  lastNameAr?: string;
  lastNameEn?: string;
  middleNameAr?: string;
  middleNameEn?: string;
}

export interface Status {
  id?: number;
}

export interface Report {
  id?: number;
  description?: string;
}

export interface DailySummary {
  id?: number;
  createdBy?: Reporter;
  createdOn?: Date;
  dailySumariesReportCitySecurity?: Report[];
  dailySumariesReportOpt?: Report[];
  dailySummariesReportNews?: Report[];
  status?: Status;
}
