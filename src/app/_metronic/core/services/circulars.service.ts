import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CircularsService implements Resolve<any> {
  loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  onPaginationConfigChange: BehaviorSubject<any>;

  circulars: any[] = [];
  onCircularsChange: BehaviorSubject<any>;

  private managers: any[] = [];
  onManagersChange: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.onCircularsChange = new BehaviorSubject([]);
    this.onManagersChange = new BehaviorSubject([]);
    this.onPaginationConfigChange = new BehaviorSubject({});
  }
  result = new HttpHeaders()

    .set('Content-Type', 'application/json')

    // TODO: Move adding token to intercept.service.ts

    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
  // getCirculars() {
  //     return this.http.get<any>(environment.apiUrl + '/circulars',{headers:this.result}).pipe(map(corr=>corr.result))
  // }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.loadingSubject.next(true);

    return new Promise((resolve, reject) => {
      Promise.all([this.getCirculars(0, 10, 'desc'), this.getManagers()]).then(
        ([files]) => {
          resolve(files);
          this.loadingSubject.next(false);
        },
        (err) => {
          this.loadingSubject.next(false);
          reject;
        }
      );
    });
  }

  getCirculars(page, size, direction, filter?: string) {
    this.loadingSubject.next(true);

    return this.http
      .get<any>(environment.apiUrl + '/circulars', {
        headers: this.result,
        params: new HttpParams()
          .set('number', filter ?? '')
          // .set('status', filter ?? '')
          .set('page', page.toString())
          .set('size', size.toString())
          .set('sort', `date,${direction}`),
      })
      .subscribe(
        (corr) => {
          this.onPaginationConfigChange.next({
            itemsPerPage: size,
            currentPage: page,
            totalItems: corr.result.totalElements,
          });
          this.circulars = corr.result.content;

          this.onCircularsChange.next(this.circulars);
          this.loadingSubject.next(false);
        },
        (err) => {
          this.loadingSubject.next(false);
        }
      );
  }

  getSortedCirculars(
    page: number,
    sort?: { active: string; direction: 'desc' | 'asc' }
  ) {
    this.loadingSubject.next(true);

    let httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', '10');
    if (sort) {
      httpParams = httpParams.append(
        'sort',
        sort.active + ',' + sort.direction
      );
    }
    return this.http
      .get<any>(`${environment.apiUrl}/circulars`, {
        headers: this.result,
        params: httpParams,
      })
      .subscribe(
        (data) => {
          this.circulars = data.result.content;

          this.onCircularsChange.next(this.circulars);
          this.loadingSubject.next(false);
        },
        (err) => {
          this.loadingSubject.next(false);
        }
      );
  }

  getManagers() {
    return this.http
      .get<any>(environment.apiUrl + '/users/circular-managers', {
        headers: this.result,
      })
      .subscribe((res) => {
        this.managers = res.result;
        this.onManagersChange.next(this.managers);
      });
  }

  getSendingCorrespondences() {
    return this.http
      .get<any>(environment.apiUrl + '/correspondences/sending', {
        headers: this.result,
      })
      .pipe(map((corr) => corr.result));
  }

  getById(id = 0) {
    return this.http
      .get<any>(environment.apiUrl + '/circulars/' + id, {
        headers: this.result,
      })
      .pipe(map((corr) => corr.result));
  }

  create(value) {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(environment.apiUrl + '/circulars', value, {
          headers: this.result,
        })
        .subscribe((response: any) => {
          if (!response || !response['status']) reject;
          let content = response['result'];
          this.circulars = [content, ...this.circulars];
          this.onCircularsChange.next(this.circulars);
          resolve(response);
        }, reject);
    });
  }
  update(value) {
    return new Promise((resolve, reject) => {
      this.http
        .put<any>(environment.apiUrl + '/circulars', value, {
          headers: this.result,
        })
        .subscribe((response: any) => {
          if (!response || !response['status']) reject;
          let content = response['result'];
          this.updateItem(content);
          resolve(response);
        }, reject);
    });
  }
  review(id) {
    const uploadHeaders = new HttpHeaders()
      // TODO: Move adding token to intercept.service.
      .set('Content-Type', 'application/pdf')
      .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

    return this.http.get<any>(environment.apiUrl + '/circulars/review/' + id, {
      headers: uploadHeaders,
      responseType: 'blob' as 'json',
    });
  }

  publish(id) {
    return new Promise((resolve, reject) => {
      let httpParams = new HttpParams()
        .append('id', id)
        .append('withArch', 'true');

      this.http
        .get<any>(environment.apiUrl + '/circulars/publish/' + id, {
          params: httpParams,
          headers: this.result,
        })
        .subscribe(
          (response: any) => {
            if (!response || !response['status']) reject();
            let temp;
            this.circulars = this.circulars.map((item) => {
              if (item['id'] == id) {
                item['status']['id'] = response['result'];
                temp = item;
              }
              return item;
            });
            this.onCircularsChange.next(this.circulars);
            resolve(temp);
          },
          (err) => {
            reject();
          }
        );
    });
  }

  approval(id) {
    return this.http.get<any>(environment.apiUrl + '/circulars/approve/' + id, {
      headers: this.result,
    });
  }

  archive(id) {
    return this.http.get<any>(environment.apiUrl + '/circulars/archive/' + id, {
      headers: this.result,
    });
  }

  reject(id) {
    return this.http.get<any>(environment.apiUrl + '/circulars/reject/' + id, {
      headers: this.result,
    });
  }

  sendCircular(id, managerId) {
    return this.http.get<any>(
      environment.apiUrl + '/circulars/send/' + id + '?manager=' + managerId,
      {
        headers: this.result,
      }
    );
  }

  getCircularNumber() {
    return this.http.get<any>(environment.apiUrl + '/circulars/number', {
      headers: this.result,
    });
  }

  updateItem(newItem) {
    this.circulars = this.circulars.map((item) => {
      if (item['id'] == newItem['id']) {
        return newItem;
      } else return item;
    });

    this.onCircularsChange.next(this.circulars);
  }
}
