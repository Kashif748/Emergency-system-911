export interface PushInotification {
  id?: number;
  body: string;
  titleEn: string;
  titleAr: string;
  enBody: string;
  createdOn?: string;
  event?: Name;
}
export interface Name {
  id: number;
  moduleId: number;
  name: string;
}

export class PushNotification  {
  id: number;
  body: string;
  enBody: string;
  titleEn: string;
  titleAr: string;
  createdOn: string;
  event?: Name = {
    id: 0,
    moduleId: 0,
    name: "",
  };

  constructor(pushNotification?: PushInotification) {
    this.id = pushNotification ? pushNotification.id : null;
    this.event = pushNotification ? pushNotification.event : null;
    this.createdOn = pushNotification ? pushNotification.createdOn : "";
    this.body = pushNotification ? pushNotification.body : "";
    this.enBody = pushNotification ? pushNotification.enBody : "";
    this.titleEn = pushNotification ? pushNotification.titleEn : "";
    this.titleAr = pushNotification ? pushNotification.titleAr : "";
  }
}
