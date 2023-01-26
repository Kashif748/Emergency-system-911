import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

/**
 * @author osamam
 */
@Injectable({
  providedIn: "root",
})
export class TradeLicenseService {
  constructor(private http: HttpClient) {}

  result = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  getLicenseDetails(cn: number) {
    //console.log("calling trade license for", cn);
    return this.http
                .get<any>(`${environment.apiUrl}/company/${cn}`, 
                            {
                              headers: this.result,
                            });
  }
}
