import {Iconfidentialty, Icorrespondence, Ipriority, ItoList} from './correspondence.interface';

export class Correspondence {
  body: string;
  confidentialty: Iconfidentialty;
  createdOn: string;
  dueDate: string;
  external: boolean;
  id: number;
  incident: { id: number; subject: string };
  isLinkedWithCirular: boolean;
  parent: { id: number };
  priority: Ipriority;
  smsNotification: boolean;
  subject: string;
  toList: ItoList[];
  user: any;
  isActive: boolean;
  readingStatus: boolean;
  commonData: any;
  isRepliedByOther: boolean;

  constructor(correspondence: Icorrespondence) {
    this.commonData = JSON.parse(localStorage.getItem("commonData"));
    this.body = correspondence.body;
    this.confidentialty = this.getConfidentiality(
      correspondence?.confidentialty?.id
    );
    this.createdOn = correspondence.createdOn;
    this.dueDate = correspondence.dueDate;
    this.external = correspondence.external;
    this.id = correspondence.id || 0;
    this.incident = correspondence.incident;
    this.isActive = correspondence.isActive || false;
    this.isLinkedWithCirular = correspondence.isLinkedWithCirular || false;
    this.priority = this.getPriority(correspondence?.priority?.id);
    this.smsNotification = correspondence.smsNotification;
    this.subject = correspondence.subject;
    this.toList = this.prepareToList(correspondence.toList);
    this.user = this.prepareUser(correspondence.user);
    this.readingStatus = this.getReadingStatus(this.toList);
    this.isRepliedByOther = correspondence.isRepliedByOther || false;
  }

  getConfidentiality(id: number) {
   return this.commonData.confidentialties.find(
     (confStatus) => confStatus.id == id
   );
  }

  getPriority(id: number) {
    return this.commonData.priorities.find((pr) => pr.id == id);
  }

  prepareToList(users: ItoList[]) {
    return users.map((user) => {
      user.correspondenceStatus = this.getCorrespondenceStatus(
        user?.correspondenceStatus?.id
      );
      return user;
    });
  }

  getCorrespondenceStatus(id: number) {
   return this.commonData.correspondenceStatus.find(
     (status) => status.id == id
   );
  }

  getReadingStatus(toList: ItoList[]) {
    const orgId = this.commonData?.currentOrgDetails?.id;
    const userId = this.commonData?.currentUserDetails?.id;
    let status = false;
    toList.forEach((user) => {
      let id;

      if (user?.toType?.value == "User") {
        id = userId;
      }
      if (user?.toType?.value == "Organization") {
        id = orgId;
      }

      if (id == user.toId) {
        status = user.correspondenceStatus?.id != 1;
      }
    });

    return status;
  }

  prepareUser(user) {
    user["fullNameAr"] =
      user["firstNameAr"] || "" + " " + user["lastNameAr"] || "";
    user["fullNameEn"] =
      user["firstNameEn"] || "" + " " + user["lastNameEn"] || "";

    return user;
  }
}
