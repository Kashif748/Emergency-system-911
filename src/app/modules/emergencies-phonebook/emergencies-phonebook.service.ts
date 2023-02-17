import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { DataSourceService } from 'src/app/modules/services/data-source/data-source.service';
import { environment } from 'src/environments/environment';
const baseUrl = 'phonebook';
@Injectable()
export class EmergenciesPhonebookService extends DataSourceService {
  phonebook: any[];
  phonebookChange$: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  paginatorChange$: BehaviorSubject<PageEvent> = new BehaviorSubject(null);

  constructor() {
    super(baseUrl);
  }

  getPhonebook(size?, page?, filters?: any) {
    return this.getAll<any>('', {
      size: size ?? '10',
      page: page ?? '0',
      name: filters?.name ?? '',
      orgName: filters?.orgName ?? '',
      mobileNumber: filters?.mobileNumber ?? '',
    }).pipe(
      tap((res) => {
        this.phonebook = res.content;
        this.phonebookChange$.next(this.phonebook);
        this.paginatorChange$.next({
          pageIndex: page,
          pageSize: size,
          length: res?.totalElements,
        });
      })
    );
  }

  createPhoneItem(data) {
    return this.post<any>(data).pipe(
      filter((res) => !!res),
      switchMap((res) => this.getPhonebook()),
      tap((res) => {
        console.log(res);
      })
    );
  }
  updatePhoneItem(data) {
    return this.put<any>(data).pipe(
      tap((res) => {
        console.log(res);
        if (res) {
          this.phonebook = this.phonebook.map((item) => {
            if (item?.id === data?.id) return res;
            else return item;
          });
          this.phonebookChange$.next(this.phonebook);
        }
      })
    );
  }
  deletePhoneItem(id) {
    return this.http.delete<any>(`${environment.apiUrl}/${baseUrl}/${id}`).pipe(
      tap((res) => {
        if (res) {
          this.phonebook = this.phonebook.filter((item) => item?.id !== id);
          this.phonebookChange$.next(this.phonebook);
        }
      })
    );
  }
}
