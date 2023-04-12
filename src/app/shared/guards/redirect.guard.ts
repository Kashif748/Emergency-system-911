import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let redirectTo = next.data?.redirectTo as string;
    if (!!redirectTo) {
      next.paramMap.keys.forEach((k) => {
        redirectTo = redirectTo.replace(`:${k}`, next.params[k]);
      });
      next.queryParamMap.keys.forEach((k) => {
        redirectTo = redirectTo.replace(`:${k}`, next.queryParams[k]);
      });
      const unmatches = redirectTo.split('&').filter((s) => s.includes('=:'));
      unmatches.forEach((um) => {
        redirectTo = redirectTo.replace(um, '');
      });
      return this.router.parseUrl(redirectTo);
    }
    return true;
  }
}
