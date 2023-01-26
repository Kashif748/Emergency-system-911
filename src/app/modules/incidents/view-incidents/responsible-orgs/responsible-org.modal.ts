export class ResponsibleOrgsModel {
    id: number;
    nameAr: string;
    nameEn: string;
    code : string;
    tradeLicense : string;
    photo : string;
  
    constructor(orgs) {
      this.id = orgs.id;
      this.nameAr = orgs.nameAr;
      this.nameEn = orgs.nameEn; 
      this.code = orgs.code;
      this.photo = orgs.photo;
      this.tradeLicense = orgs.tradeLicense;
    }
  }