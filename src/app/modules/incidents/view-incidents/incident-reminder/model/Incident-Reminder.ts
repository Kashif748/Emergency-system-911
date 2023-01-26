export interface Ireminder {
  id?: number;
  description: string;
  createdOn?: string;
  reminderDate: string;
  status?: string;
  isActive?: boolean;
  createdBy?: Createdby;
}

export interface Rincident {
  id: number;
}

export interface Createdby {
  id: number;
  firstNameAr: string;
  lastNameAr: string;
  firstNameEn: string;
  lastNameEn: string;
  middleNameAr: string;
  middleNameEn: string;
}

export class Reminder  {
  id: number;
  description: string;
  reminderDate: string;
  isActive: boolean;
  status: string
  incident: Rincident = { id: 0};
  createdOn: string;
  createdBy?: Createdby = {
    id: 0,
  firstNameAr: "",
  lastNameAr: "",
  firstNameEn: "",
  lastNameEn: "",
  middleNameAr: "",
  middleNameEn: "",
  };

  constructor(reminder: Ireminder, incident?: number, isActive?: boolean) {
    this.id = reminder ? reminder.id : null;
    this.createdBy = reminder ? reminder.createdBy : null;
    this.createdOn = reminder ? reminder.createdOn : "";
    this.description = reminder ? reminder.description : "";
    this.reminderDate = reminder ? reminder.reminderDate :  "";
    this.incident.id = incident ? incident : 0 ;
    this.isActive = isActive;
    this.status = reminder ? reminder.status : "";
  }
}
