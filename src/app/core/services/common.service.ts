import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {isEmpty} from 'lodash';
import {Observable, of} from 'rxjs';
import {IStorageService} from './storage.service';
import {AppCommonDataService} from '@core/services/app-common-data.service';
import {AppCacheKeys} from '@core/constant/AppCacheKeys';
import {AppCommonData} from '@core/entities/AppCommonData';
import {LiquidCacheService} from 'ngx-liquid-cache';

export interface AssetCategory {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  color: string;
  icon: string;
}

export interface CommonDataModel {
  priorities: any[];
  incidentCategories: any[];
  currentOrgDetails: any;
  assetsCategory: AssetCategory[];

  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private http: HttpClient,
    private storageService: IStorageService,
    private readonly appCommonDataService: AppCommonDataService,
    private readonly apiCache: LiquidCacheService) {
  }

  getCities() {
    return this.http.get<any>(`${environment.apiUrl}/cities`);
  }

  loadCommonData() {
    const result = this.apiCache.get(AppCacheKeys.COMMON_DATA);
    if (result) {
      return of(result);
    }

    return this.http.get<any>(`${environment.apiUrl}/common/data`, {}).pipe(
      tap((commonData) => {
        if (!isEmpty(commonData.result)) {
          this.storageService.setState(AppCacheKeys.COMMON_DATA, commonData.result);
          this.apiCache.set(AppCacheKeys.COMMON_DATA, commonData);
        }
      })
    );
  }

  getCommonData(): AppCommonData {
    return this.appCommonDataService.getCommonData();
  }

  getCommonDataState(): Observable<any> {
    return this.storageService.getState('commonData');
  }

}
