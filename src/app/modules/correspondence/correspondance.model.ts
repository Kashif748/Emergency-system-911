
import { Type } from "@angular/core";
import { User } from "@core/api/models/suggestion.models";
import { Priority } from "@core/entities/AppCommonData";
import { Incident } from "../incidents/specific-org-forms/incident.modal";


export interface CorrespondenceReq {
    confidentialty: Confidentialty;
    incident: Incident;
    subject: string;
    smsNotification: boolean;
    dueDate: string;
    body: string;
    toList: CorrespondanceTo[];
    priority: Priority;
    createdOn?: string;
    external?: boolean;
    isLinkedWithCircular?: boolean;
    isRepliedByOther?: boolean;
    user?: any; // User
}

export interface CorrespondanceTo {
    copied: boolean;
    correspondenceStatus: any;
    id: number;
    seenBy: any; //User
    seenDate: string;
    toId: number;
    toNameAr: string;
    toNameEn: string;
    toType: TO_TYPE;
}

export enum TO_TYPE {
    ORGANIZATION = 'ORGANIZATION',
    USER = 'USER',
    GROUP = 'GROUP',
}



interface Confidentialty {
    createAt: string;
    createdBy: any;
    id: number;
    isActive: boolean;
    nameAr: string;
    nameEn: string;
    updatedAt: string;
    updatedBy: any;
}



export enum CorrespondanceForm {
    SUBJECT = 'subject',
    BODY = 'body',
    DUE_DATE = 'dueDate',
    USERS = 'users',
    ORGS = 'orgs',
    CC_USERS = 'ccUsers',
    CC_ORGS = 'ccOrgs',
    INCIDENT = 'incident',
    IS_ACTIVE = 'isActive',
    SMS_NOTIFICATION = 'smsNotification',
    CONFIDENTIALTY = 'confidentialty',
    PRIORITY = 'priority'
}

export enum ORGANIZATION_TYPE {
    EXTERNAL = 'external',
    INTERNAL = 'internal'
}