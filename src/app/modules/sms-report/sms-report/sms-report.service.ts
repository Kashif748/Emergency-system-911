import { R } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsReportService {
  result = new HttpHeaders()
  .set("Content-Type", "application/json")
  .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) { }

  getSmsReport() {
    return this.http.get<any>(`${environment.apiUrl}/notification`, {
      headers: this.result,
    }).pipe(map(r => r.result));
  }

  ResendSmsReport(id, body){
    return this.http.put<any>(`${environment.apiUrl}/notification/sms/${id}`,body);
  }

}
