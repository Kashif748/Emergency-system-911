import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IAuthService } from '@core/services/auth.service';
import { CommonService } from '@core/services/common.service';
import { CommonDataAction } from '@core/states';
import { Store } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private authService: IAuthService,
    private commonService: CommonService,
    private store: Store
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Use this resolver to resolve initial mock-api for the application
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
      // this.authService.loadUserPrivileges(),
      // this.commonService.loadCommonData(),
      this.store.dispatch(new CommonDataAction.Load()),
    ]);
  }
}
