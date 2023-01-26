import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataInquiryService {

  result = new HttpHeaders()
  .set("Content-Type", "application/json")
  .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) {}


  getScadList() {
    return this.http
      .get<any>(`${environment.apiUrl}/scad-koi`, {
        headers: this.result,
      })
      .pipe((scdata) => {
        return scdata;
      });

  }


  getScadKoiDetails(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/scad-koi/${id}`, {
        headers: this.result,
      })
      .pipe(map((scadDetails) => scadDetails.result))
  }

  getScadKoiDetailsFilters(id,filters) {

    return this.http
      .get<any>(`${environment.apiUrl}/scad-koi/${id}?${filters}`, {
        headers: this.result,
      })
      .pipe(map((scadDetails) => scadDetails.result))
  }


  public getMultipleFilterData(code,filter): Observable<any[]>
     {
       var obj = {};

      filter.forEach(element => {
        obj[element] = this.http.get(`${environment.apiUrl}/scad-koi/filters?code=${code}&filter=${element}`);
      });
      return forkJoin(obj);
      }

}
