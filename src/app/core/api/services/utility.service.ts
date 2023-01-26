import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncidentFilter } from '../models/filters.model';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }

  convertfiltertoHttpParameter(filter: IncidentFilter): HttpParams{
    const httpParams = new HttpParams();
    Object.getOwnPropertyNames(filter).filter(val => filter[val])
      .forEach(v => { httpParams.append(v, filter[v]) })
    console.log(httpParams);
    return httpParams;
  }
}
