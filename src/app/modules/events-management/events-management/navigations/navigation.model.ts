export class NavigationItem {
  id: number;
  active: boolean;
  isPublic: boolean;
  code: string;
  icon: string;
  order: string;
  routing: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;

  parent: any;
  tableName: string;
  widget: boolean;
  selected: boolean;

  modules: NavigationItem[];

  constructor(item) {
    this.id = item.id;
    this.nameAr = item.nameAr;
    this.nameEn = item.nameEn;

    this.descAr = item?.descAr;
    this.descEn = item?.descEn;
    this.code = item.code;
    this.icon = item?.icon;
    this.active = item?.active;
    this.isPublic = item?.isPublic;
    this.order = item?.order;
    this.routing = item?.routing;
    this.selected = false;

    this.parent = item.parent == null ? null : new Parent(item.parent);

    if (item["modules"]) {
      this.modules = item["modules"].map((level) => {
        return new NavigationItem(level);
      });
    }
  }
}

class Parent {
  id: number;
  label: string;

  constructor(item) {
    this.id = item?.id;
    this.label = item?.label;
  }
}
