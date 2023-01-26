import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  public getAdcdaReport() {
 
    return this.http.get<any>(`${environment.apiUrl}/reports/adcda`).pipe(
      map((r) => r.result),
      map((reports) => {
        reports.forEach((r) => {
          r["subCategories"] = [];
          r.categories = Object.keys(r.categories).map((k) => {
            r["subCategories"] = [...r["subCategories"], ...r.categories[k]];
            return {
              category: k,
              subCategories: r.categories[k],
            };
          }) as any;
        });
        return reports;
      })
    );
  }
}
