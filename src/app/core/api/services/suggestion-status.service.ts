import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { SuggestionStatus } from "../models/suggestion-models";

@Injectable({
  providedIn: "root",
})
export class SuggestionStatusService {
  private baseUrl = `${environment.apiUrl}/suggestionStatus`;

  private httpHeader = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) {}

  create(status: SuggestionStatus) {
    return this.http.post(`${this.baseUrl}/create`, status, {
      headers: this.httpHeader,
    });
  }

  update(status: SuggestionStatus) {
    return this.http.put(`${this.baseUrl}/update`, status, {
      headers: this.httpHeader,
    });
  }

  getAll() {
    return this.http.get<any>(`${this.baseUrl}/getAll`, {
      headers: this.httpHeader,
    });
  }
  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`, {
      headers: this.httpHeader,
    });
  }
}
