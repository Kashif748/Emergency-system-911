export enum userType {
  MANAGER = 1,
  MEMBER,
  ENGINEER,
}

export class GroupModel {
  id: number;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  orgStructure: { id: number; label: string; name: string };
  users: {
    id: number;
    type: userType;
    user: { id: number; label: string };
  }[];
  isActive: boolean;
  constructor(groupItem: any) {
    this.id = groupItem.id;
    this.nameAr = groupItem.nameAr;
    this.nameEn = groupItem.nameEn;
    this.descAr = groupItem.descAr;
    this.descEn = groupItem.descEn;
    this.orgStructure = groupItem.orgStructure;
    this.users = groupItem.users;
    this.isActive = groupItem.isActive;
  }

  setUsers(users: any[]) {
    this.users = users;
  }
}
