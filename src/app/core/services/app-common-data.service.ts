import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {AppCommonData} from '@core/entities/AppCommonData';
import {AppCacheKeys} from '@core/constant/AppCacheKeys';
import {IStorageService} from '@core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppCommonDataService {
  // Variables
  private commonData: AppCommonData;

  constructor(private readonly storageService: IStorageService) {
  }

  getCommonData(): AppCommonData {
    if (!this.commonData) {
      this.commonData = this.storageService.getItem<AppCommonData>(AppCacheKeys.COMMON_DATA);
    }
    return this.commonData;
  }

  get(key: string) {
    return this.getCommonData()[key];
  }


  findElementInArray(arrayName: string, keyName: string, keyValue: any) {
    const array = this.getCommonData()[arrayName];
    if (array) {
      return _.find(array, [keyName, keyValue]);
    }
    return null;
  }

  set(data: string) {
    this.storageService.setItem(AppCacheKeys.COMMON_DATA, data);
  }

}
