import { BehaviorSubject } from "rxjs";

export class EntityModel {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  order?: number;
  orgId?: any;
  plotNumber?: string;
  serialNumber?: string;
  parent?: any;
  constructor(report) {
    this.id = report.id;
    this.isActive = report.isActive;
    this.nameAr = report.nameAr ?? report.nameAR;
    this.nameEn = report.nameEn ?? report.nameEN;
    this.order = report.order;
    this.orgId = report.orgStructure;
    this.plotNumber = report.plotNumber;
    this.serialNumber = report.serialNumber;
    this.parent = report.parent;
    Object.keys(report)
      .filter((v) => !Object.keys(this).find((ik) => ik === v))
      .forEach((k) => {
        this[k] = report[k];
      });
  }
  [key: string]: any;
}

export class ControllerModel {
  value: EntityModel[];
  public onValueChanged: BehaviorSubject<any>;
  name: string;

  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  // pageable: {sort: {…}, pageNumber: 0, pageSize: 20, offset: 0, unpaged: false, …}
  size: number;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  totalElements: number;
  totalPages: number;

  constructor(model, name: string) {
    this.value = model.map((item) => {
      return new EntityModel(item);
    });

    this.onValueChanged = new BehaviorSubject(this.value);
    this.name = name;
    this.totalPages = model["totalPages"];
    this.totalElements = model["totalElements"];
    this.size = model["size"];
  }

  addItem(item) {
    const newReport = new EntityModel(item);
    this.value.push(newReport);
    this.onValueChanged.next(this.value);
    this.totalElements++;
  }

  deleteItem(id) {
    this.value = this.value.filter((item) => {
      return item.id !== id;
    });
    this.onValueChanged.next(this.value);
    this.totalElements--;
  }
  updateItem(item) {
    this.value = this.value.map((el) => {
      if (el.id == item.id) {
        return new EntityModel(item);
      } else return el;
    });
    this.onValueChanged.next(this.value);
  }
}
