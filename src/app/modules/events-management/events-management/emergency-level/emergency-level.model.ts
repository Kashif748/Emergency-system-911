export class EmergencyLevelModel {
  id: number;
  isActive: boolean;
  level: string;
  constructor(report) {
    this.id = report.id;
    this.isActive = report.isActive;
    this.level = report.level;
     
  }
}
