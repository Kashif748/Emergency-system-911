export interface ICategory {
    id: number;
    isActive: boolean;
    nameAr: string;
    nameEn: string;
    orgStructure: BasicModel;
    parent?: BasicModel;
    serialNumber: number;
  }
  
export interface BasicModel {
    id: number;
    label: string;
  }