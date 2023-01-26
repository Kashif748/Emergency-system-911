import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
  Router,
} from '@angular/router';

import { IStorageService } from '@core/services/storage.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirstLoginGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private sotrageService: IStorageService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkFirstLogin();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkFirstLogin();
  }

  private checkFirstLogin() {
    const firstLogin = this.sotrageService.getItem('firstLogin');
    if (firstLogin) {
      this.router.navigate(['auth/reset-password']);
    }
    return !firstLogin;
  }
}
