export interface Inew {
    id:number;
    body:string;
    title:string;
    type:{id:number,label:string};
    isActive:boolean;
    expireDate:string;
    createdDate:string;
    newsOrgs:Iorginization[];
    createdBy:{id:number,label:string},
}

export interface Iorginization {
    id: number
    newsId: {id: number, label: string}
    orgId: {id: number, label: string}
}