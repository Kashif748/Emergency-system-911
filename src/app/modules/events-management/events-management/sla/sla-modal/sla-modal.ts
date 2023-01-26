export class Sla {
  id: number;
  centerName: string;
  contractExpiryDate: string;
  contractNo: string;
  contractor: S_contractor;
  group: S_group;
  isActive: boolean;

  constructor(sla: Isla) {
    this.id = sla?.id || null;
    this.centerName = sla?.centerName || null;
    this.contractExpiryDate = sla?.contractExpiryDate || null;
    this.contractNo = sla?.contractNo || null;
    this.contractor = sla?.orgStructure || null;
    this.group = sla?.group || null;
    this.isActive = sla.isActive;
  }
}

export interface Isla {
  centerName: string;
  contractExpiryDate: string;
  contractNo: string;
  orgStructure: S_contractor;
  group: S_group;
  id: number;
  isActive: boolean;
}

interface S_kpi {
  id: number;
}

interface S_priority {
  id: number;
}

interface S_sla {
  id: number;
}

interface S_contractor {
  id: number;
}
interface S_group {
  id: number;
}
