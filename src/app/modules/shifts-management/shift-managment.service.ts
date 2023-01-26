import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftManagmentService {
  result = new HttpHeaders()
  .set("Content-Type", "application/json")
  .set("Authorization", "Bearer " + localStorage.getItem("jwt"));
  constructor(private http: HttpClient) { }


  
  getShiftReport(name:string, page:number, size:number ){


    //   let httpParams = new HttpParams()
    //   .append("page", page.toString())
    //   .append("size", "10");
    //   if (sort) {
    //   httpParams = httpParams.append(
    //     "sort",
    //     sort.active 
    //   );
    // }

    return this.http.get<any>(`${environment.apiUrl}/user/audit/shifts`,{
      headers: this.result,
      params: new HttpParams()
          .set("name", name)
          .set("pageNumber", page.toString())
          .set("pageSize", size.toString())
          
     
    }).pipe(map(r=>r.result));
  }
}
