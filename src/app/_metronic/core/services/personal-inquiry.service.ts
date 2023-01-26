import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

/**
 * @author osmam
 *
 */
@Injectable({
  providedIn: "root",
})
export class PersonalInquiryService {
  constructor(private http: HttpClient) {}

  result = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  getPersonalInfo(eid: String) {

    return this.http.post<any>(
      `${environment.apiUrl}/personal-info`, eid,
      {
        headers: this.result,
      }
    );
  }
}
