export interface Icorrespondence {
    body: string;
    confidentialty: {id: number};
    createdOn: string;
    dueDate: string;
    external: boolean;
    id: number;
    incident: {id: number, subject: string};
    isActive: boolean;
    isLinkedWithCirular: boolean;
    priority: {id: number};
    smsNotification: boolean;
    subject: string;
    toList: ItoList[];
    user: {id: number};
    isRepliedByOther: boolean;
}



export interface Iconfidentialty {
    id: number;
    isActive: boolean;
    nameAr: string;
    nameEn: string;
}

export interface Ipriority {
    id: number;
    isActive: boolean;
    nameAr: string;
    nameEn: string;
}

export interface ItoList {
    copied: boolean;
    correspondenceStatus: Icorrespondence;
    id: number;
    seenBy: {id: number};
    seenDate: string;
    toId: number;
    toNameAr: string;
    toNameEn: string;
    toType: {value: "Organization" | "User"};
}
