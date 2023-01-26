import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  // Variables
  private baseUrl = `${environment.apiUrl}/assets`;

  constructor(private http: HttpClient) {
  }

  create(asset: any) {
    return this.http.post(`${this.baseUrl}`, asset);
  }

  update(asset: any) {
    return this.http.put(`${this.baseUrl}`, HTMLTableRowElement);
  }

  getAll() {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  delete(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  statistics() {
    return this.http.get<any>(`${this.baseUrl}/statistics`);
  }

  getCategories() {
    return this.http.get<any>(`${this.baseUrl}-category`);
  }
}
