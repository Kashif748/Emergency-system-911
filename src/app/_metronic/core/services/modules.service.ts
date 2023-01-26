import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  constructor(private http: HttpClient) {

  }

  getModules() {
    return this.http
      .get<any>(environment.apiUrl + '/modules')
      .pipe(map((corr) => corr.result));
  }

  getPrivilage() {
    return this.http
      .get<any>(environment.apiUrl + '/privileges')
      .pipe(map((corr) => corr.result));
  }

  getById(id) {
    return this.http
      .get<any>(environment.apiUrl + '/modules/' + id)
      .pipe(map((corr) => corr.result));
  }

  getByOrgId(id) {
    return this.http
      .get<any>(environment.apiUrl + '/module-org/organization/' + id)
      .pipe(map((corr) => corr.result));
  }

  create(value) {
    return this.http
      .post<any>(environment.apiUrl + '/assets', value)
      .subscribe((x) => console.log);
  }

  update() {
    return this.http
      .get<any>(environment.apiUrl + '/correspondences')
      .pipe((correspondence) => {
        return correspondence;
      });
  }

  private flatModule(m: { modules: any[] }, acc: any[]) {
    acc.push(m);
    if (m.modules?.length > 0) {
      m.modules.forEach((sm) => {
        this.flatModule(sm, acc);
      });
    }
  }

  getFlatModules() {
    return this.http
      .get<any>(environment.apiUrl + '/modules')
      .pipe(
        map((res) => {
          const flatedModules = [];
          this.flatModules(res.result, flatedModules);
          return flatedModules;
        })
      );
  }

  private flatModules(ms: { modules: any[] }[], acc: any[]) {
    ms.forEach((m) => {
      this.flatModule(m, acc);
    });
  }
}
