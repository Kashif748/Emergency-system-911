export class AssetsMoal {
  id: number;
  isActive: boolean;
  nameAR: string;
  nameEN: string;
  plotNumber: string;
  constructor(report) {
    this.id = report.id;
    this.isActive = report.isActive;
    this.nameAR = report.nameAR;
    this.nameEN = report.nameEN;
    this.plotNumber = report.plotNumber;
  }
}
