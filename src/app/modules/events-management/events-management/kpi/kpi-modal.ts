export class KpiModel {
    id: number;
    isActive: boolean;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    orgStructure: any;
    incidentCategory: any;
    group: any;
    period: any;
    priority: any;
  
    constructor(kpi) {
      this.id = kpi.id;
      this.isActive = kpi.isActive;
      this.nameAr = kpi.nameAr;
      this.nameEn = kpi.nameEn; 
      this.descriptionAr = kpi.descriptionAr;
      this.descriptionEn = kpi.descriptionEn;
      this.orgStructure = kpi.orgStructure;
      this.incidentCategory = kpi.incidentCategory;
      this.group = kpi.group;
      this.period = kpi.period;
      this.priority = kpi.priority;
    }
  }
  