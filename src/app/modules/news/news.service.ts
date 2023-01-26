import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataSourceService } from '../services/data-source/data-source.service';

import { Response } from '../../core/api/models/response.model';
import { Inew } from './models/new.interface';
import { New } from './models/new.model';

const baseUrl: string = 'news';

@Injectable({
  providedIn: 'root',
})
export class NewsService extends DataSourceService {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.resolve(this.getContent()).then((content) => {
        resolve(content);
      }, reject);
    });
  }

  private news: any[];
  newsChanged$: BehaviorSubject<New[]> = new BehaviorSubject([]);
  //newsPaginationConfig: PaginationC

  constructor() {
    super(baseUrl);
  }

  getContent(): Promise<any[]> {
    return new Promise((reslove, reject) => {
      this.getAll<any>('', { newsActive: true }).subscribe(
        (data) => {
          this.news = data['content'];
          this.newsChanged$.next(this.news);

          reslove(this.news);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getNew(id: number) {
    // const index = this.checkIfExist(id);

    // if(index!==-1) {
    //   return new Promise((resolve,reject)=>{
    //     resolve(this.news[index]);
    //   });
    // }

    return new Promise((resolve, reject) => {
      this.get<Inew>(id)
        .pipe(
          map((data) => {
            return new New(data);
          })
        )
        .subscribe(
          (data) => {
            // this.news.push(data);
            this.newsChanged$.next(this.news);
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  add(_new: Inew) {
    return new Promise((reslove, reject) => {
      this.post(_new).subscribe(
        async (data) => {
          // const newObj = new New(data['result']);
          // this.news.unshift(newObj);
          // this.newsChanged$.next(this.news);
          await this.getContent();
          reslove(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  update(id: number, _new: Inew) {
    return new Promise((reslove, reject) => {
      this.put<Inew>(_new).subscribe(
        (data) => {
          const newObj = new New(data);
          if (newObj.isActive) {
            this.news = this.news?.map((n) => {
              if (n.id == newObj.id) {
                return newObj;
              }
              return n;
            });
          } else {
            this.news = this.news.filter((n) => n.id != newObj.id);
          }
          this.newsChanged$.next(this.news);

          reslove(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteNew(id: number) {
    return new Promise((reslove, reject) => {
      this.delete(id).subscribe(
        (data) => {
          const index = this.news.findIndex((_new) => _new.id === id);
          index !== -1 ? this.news.splice(index, 1) : null;
          this.newsChanged$.next(this.news);

          reslove(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  checkIfExist(id: number) {
    if (this.news && this.news.length != 0) {
      return this.news.findIndex((item) => item.id === id);
    }
    return -1;
  }

  protected handleError(error: Response<Error>) {
    if (error instanceof HttpErrorResponse) {
      return throwError(error);
    }
    return throwError('Error');
  }

  protected prepareData<T>(response: Response<T>): T {
    return response.result;
  }
}
