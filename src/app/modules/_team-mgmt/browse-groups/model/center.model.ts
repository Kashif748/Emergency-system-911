export class Center {
  id: number;
  nameAr: string;
  nameEn: string;
  selected: boolean;

  constructor(center) {
    this.id = center.id;
    this.nameAr = center.nameAr;
    this.nameEn = center.nameEn;
    this.selected = false;
  }
}

export class Zone {
  nameAr: string;
  nameEn: string;
  zoneId: string;
  selected = false;
  constructor(zone) {
    this.zoneId = zone.zoneId;
    this.nameAr = zone.nameAr;
    this.nameEn = zone.nameEn;
    this.selected = false;
  }
}

export class AreaItem {
  center: Center;
  zones: Zone[];
  allZones: boolean;
  loadingZones: boolean;
  constructor(center, zones?: any[]) {
    this.center = center;
    this.zones = [];
    this.loadingZones = false;
    this.allZones = false;
  }

  setCenters(center) {
    this.center = center;
  }

  getSelectedZones(): Zone[] {
    return this.zones.filter((item) => item.selected);
  }
}

export interface GroupGeometryLocation {
  groupId: number;
  location: { name: string; geometry: string }[];
  categoryIds: number[];
}

export interface GeometryType {
  type: string;
  points: number[][];
}

export enum IncidentGroupViewsEnum {
  MAP = 'map',
  SELECT = 'select',
}
