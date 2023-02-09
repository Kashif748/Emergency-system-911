export interface InotificationPlaceholder {
  id?: number;
  code: string;
  value: string;
  entityTableName: string;
}

export class NotificationPlaceholder {
  id: number;
  code: string;
  value: string;
  entityTableName: string;


  constructor(placeholder: InotificationPlaceholder) {
    this.id = placeholder ? placeholder.id : null;
    this.code = placeholder ? placeholder.code : "";
    this.value = placeholder ? placeholder.value : "";
    this.entityTableName = placeholder ? placeholder.entityTableName : "";
  }
}
