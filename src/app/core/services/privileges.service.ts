import {Injectable} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {IStorageService} from '@core/services/storage.service';
import {AppCacheKeys} from '@core/constant/AppCacheKeys';

@Injectable({
  providedIn: 'root',
})
export class PrivilegesService {
  privileges: { [propName: string]: boolean };

  constructor(private storageService: IStorageService) {
    this.privileges = this.preparePrivileges(storageService.getItem(AppCacheKeys.USER_PRIVILEGES));
  }

  preparePrivileges(privileges: string[]): { [propName: string]: boolean } {
    const previousPrivileges = {};
    privileges.forEach((item) => {
      previousPrivileges[item] = true;
    });
    return previousPrivileges;
  }

  checkActionPrivileges(privileges: string | string[]) {
    if (typeof privileges === 'string') {
      return this.checkActionPrivilege(privileges);
    }
    return privileges.some((item) => this.checkActionPrivilege(item));
  }

  checkActionPrivilege(privilege: string) {
    return this.privileges[privilege];
  }

}
