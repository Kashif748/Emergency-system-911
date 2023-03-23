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
    let redirectTo = next.data?.redirectTo;
    if (!!redirectTo) {
      next.paramMap.keys.forEach((k) => {
        redirectTo = redirectTo.replace(`:${k}`, next.params[k]);
      });
      return this.router.parseUrl(redirectTo as string);
    }
    return true;
  }
}
