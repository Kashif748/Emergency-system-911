import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsLogService implements Resolve<any> {
  result = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  incidents: any[] = [];
  onIncidentsChange: BehaviorSubject<any>;
  isLastPage = false;
  onCurrentLogChange: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    this.onIncidentsChange = new BehaviorSubject([]);
    this.onCurrentLogChange = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      Promise.all([this.getIncidentsByPage(0)]).then(([files]) => {
        resolve(files);
      }, reject);
    });
  }

  getLogForIncident(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/incidents/${id}/logs`, {
          headers: this.result,
        })
        .subscribe(
          (response: any) => {
            if (response && response['status']) {
              const currentLog = response['result']['content'];
              this.onCurrentLogChange.next(currentLog);
              resolve(true);
            }
          },
          (err) => {
            reject();
          }
        );
    });
  }

  getIncidentsByPage(page) {
    return new Promise((resolve, reject) => {
      if (this.isLastPage) {
        resolve({last: true});
      }
      this.httpClient
        .get<any>(`${environment.apiUrl}/incidents?page=${page}&size=20`, {
          headers: this.result,
        })
        .subscribe(
          (response: any) => {
            if (response && response['status']) {
              this.isLastPage = response['result']['last'];
              const incidents = response['result']['content'];
              this.incidents.push(...incidents);
              this.onIncidentsChange.next(this.incidents);
              if (page == 0) {
                this.getLogForIncident(this.incidents[0].id);
              }
              resolve({last: false});
            }
          },
          (err) => {
            reject();
          }
        );
    });
  }

  filterIncidents(queryParams: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/incidents`, {
          headers: this.result,
          params: queryParams
        })
        .subscribe(
          (response: any) => {
            if (response && response['status']) {
              const isLastPage = response['result']['last'];
              const incidents = response['result']['content'];
              const isFirstPage = queryParams.page === 0;
              if (isFirstPage) {
                this.incidents = incidents;
              } else {
                this.incidents.push(...incidents);
              }

              this.onIncidentsChange.next(this.incidents);
              if (isFirstPage && this.incidents.length > 0) {
                this.getLogForIncident(this.incidents[0].id);
              } else {
                this.onCurrentLogChange.next([]);
              }
              resolve({last: isLastPage});
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
