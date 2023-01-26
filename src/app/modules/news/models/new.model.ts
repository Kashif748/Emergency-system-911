import { Inew, Iorginization } from "./new.interface";

export class New {

    id:number;
    body:string;
    type:number;
    title:string;
    isActive:boolean;
    expireDate:string;
    createdDate:string;
    newsOrgs:number[];
    createdBy:{id:number,label:string};

    constructor(obj:Inew) {
        
        //console.log(obj);
        this.id = obj?.id || null;
        this.body = obj?.body || "";
        this.title = obj?.title || "";
        this.type = obj?.type?.id || null;
        this.isActive = obj?.isActive || false;
        this.expireDate = obj?.expireDate || "";
        this.createdDate = obj?.createdDate || "";
        this.newsOrgs = obj?.newsOrgs?.map(org=>org.orgId.id) || [];       
         
    }

}