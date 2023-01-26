
import { Injectable } from '@angular/core';
import { DataSourceService } from '../../services/data-source/data-source.service';

const baseUrl:string = "orgs/entity-types";

@Injectable({
  providedIn: 'root'
})
export class EntityTypesService extends DataSourceService{

  constructor() {
    
    super(baseUrl);

  }

}
