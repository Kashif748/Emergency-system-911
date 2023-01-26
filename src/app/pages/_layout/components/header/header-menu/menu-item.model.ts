export class MenuItem {
  children: MenuItem[] = [];
  module: MenuModule;
  privileges: any;
  id: number;
  selected: boolean;
  parent?: MenuItem;
  isEnabled?: boolean;
  indeterminate: boolean; // is some  childrens  selected
  constructor(item, parent?) {
    this.selected = false;
    this.module = new MenuModule(item['module']);
    this.id = this.module.id;
    this.privileges = item['privileges'];
    this.parent = parent;
    this.isEnabled = item.isEnabled;
    this.indeterminate = false;
    if (item['children']) {
      this.children = item['children'].map((level) => {
        return new MenuItem(level, this);
      });
    }
  }
}

class MenuModule {
  id: number;
  code: string;
  nameAr: string;
  nameEn: string;
  icon?: string;
  routing: string;
  descAr: string;
  descEn: string;

  constructor(item) {
    this.id = item.id;
    this.nameAr = item.nameAr;
    this.nameEn = item.nameEn;
    this.descAr = item?.descAr;
    this.descEn = item?.descEn;
    this.routing = item?.routing;
    this.code = item.code;
    this.icon = item?.icon;
  }
}
