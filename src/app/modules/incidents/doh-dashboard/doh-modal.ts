export class DohModal {
  
    dataid: string;
    fullName: string;
    gender: string;
    email: string;
    nationality: string;
    mobile: string;
    interest: string;
  
  constructor(dohData) {
    this.dataid = dohData.dataid;
    this.fullName = dohData.fullName;
    this.gender = dohData.gender;
    this.email = dohData.email;
    this.nationality = dohData.nationality;
    this.mobile = dohData.mobile;
    this.interest = dohData.interest;

  }

}

export class BedModal {
  
    BedCapacityId: string;
    BedTypeAgeName: string;
    Occupied: string;
    AvailableBeds: string;
    FacilityName: string;
    Region: string;
    LastUpdateDate: string;
  
  constructor(bedData) {
    this.BedCapacityId = bedData.BedCapacityId;
    this.BedTypeAgeName = bedData.BedTypeAgeName;
    this.Occupied = bedData.Occupied;
    this.AvailableBeds = bedData.AvailableBeds;
    this.FacilityName = bedData.FacilityName;
    this.Region = bedData.Region;
    this.LastUpdateDate = bedData.LastUpdateDate;

  }

}

export class EventInfoModal {
  
    dataid: string;
    record_number: string;
    IncidentName: string;
    InsertedEmployeeNAme: string;
    InsertedPositionName: string;
    ContactPhoneNumber: string;
    EventStatus: string;
    AssignedDepartment: string;
    Region: string;
    EventDateTime: string;
  
  constructor(sharedData) {
    this.dataid = sharedData.dataid;
    this.record_number = sharedData.record_number;
    this.IncidentName = sharedData.IncidentName;
    this.InsertedEmployeeNAme = sharedData.InsertedEmployeeNAme;
    this.ContactPhoneNumber = sharedData.ContactPhoneNumber;
    this.EventStatus = sharedData.EventStatus;
    this.AssignedDepartment = sharedData.AssignedDepartment;
    this.Region = sharedData.Region;
    this.EventDateTime = sharedData.EventDateTime;

  }

}
