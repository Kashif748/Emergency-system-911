export interface Inotification {
  id?: number;
  template: string;
  createdOn?: string;
  event?: Name;
  updatedOn: string;
  isActive?: boolean;
}

export interface Name {
  id: number;
  moduleId: number;
  name: string;
}
export class Notification  {
  id: number;
  template: string;
  isActive: boolean;
  updatedOn: string;
  createdOn: string;
  event?: Name = {
    id: 0,
    moduleId: 0,
    name: "",
  };


  constructor(notification: Inotification) {
    this.id = notification ? notification.id : null;
    this.event = notification ? notification.event : null;
    this.createdOn = notification ? notification.createdOn : "";
    this.template = notification ? notification.template : "";
  }
}
