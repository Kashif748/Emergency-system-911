export class IncidentsCategoryModel {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  serialNumber: number;
  orgStructure: any;
  parent: any;
  chatBotEnabled: boolean;

  constructor(category) {
    this.id = category.id;
    this.isActive = category.isActive;
    this.nameAr = category.nameAr;
    this.nameEn = category.nameEn;
    this.serialNumber = category.serialNumber;
    this.orgStructure = category.orgStructure;
    this.chatBotEnabled = category.chatBotEnabled;
    this.parent = category.parent;
  }
}
