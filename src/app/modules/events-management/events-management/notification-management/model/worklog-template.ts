export interface WorklogITemplate {
  id: number;
  config: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  code: string;
}

export class WorklongTemplate  {
  id: number;
  config: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  code: string;

  constructor(worklog: WorklogITemplate) {
    this.id = worklog ? worklog.id : null;
    this.config = worklog ? worklog.config : "";
    this.nameEn = worklog ? worklog.nameEn : "";
    this.nameAr = worklog ? worklog.nameAr : "";
    this.descriptionEn = worklog ? worklog.descriptionEn : "";
    this.descriptionAr = worklog ? worklog.descriptionAr : "";
    this.code = worklog ? worklog.code : "";
  }
}
