import { IentityType } from "./entityType.interface";


export class EntityType {

    id: number;
    entityType: string;
    labelAr: string;
    labelEn: string;

    constructor(entity:IentityType) {
        
        this.id = entity.id || null;
        this.entityType = entity.entityType;
        this.labelAr = entity.labelAr;
        this.labelEn = entity.labelEn;

    }

}