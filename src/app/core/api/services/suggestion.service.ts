import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { Suggestion } from "../models/suggestion-models";

@Injectable({
  providedIn: "root",
})
export class SuggestionService {
  private baseUrl = `${environment.apiUrl}/suggestion`;

  httpHeader = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) {}

  create(suggestion: Suggestion) {
    return this.http.post(`${this.baseUrl}`, suggestion, {
      headers: this.httpHeader,
    });
  }

  update(suggestion: Suggestion) {
    return this.http.put(`${this.baseUrl}`, suggestion, {
      headers: this.httpHeader,
    });
  }

  getAll(pageSize?, pageNumber?, sort?, title?) {
    return this.http.get<any>(`${this.baseUrl}`, {
      headers: this.httpHeader,
      params: { size: pageSize, page: pageNumber, sort: sort, title: title ?? "" },
    });
  }

  getAttachments(suggId) {
    return this.http.get<any>(`${environment.apiUrl}/dms/tag`, {
      headers: this.httpHeader,
      params: {
        entityId: suggId,
        entityTagId : "20"
        // entityLabel: "Suggestions",
        // tag: "att"
      },
    });
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.httpHeader,
    });
  }
}
