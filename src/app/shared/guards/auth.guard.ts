import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map } from 'rxjs/operators';

import { IAuthService } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: IAuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const code = route.queryParams['code'];
    if (code) {
      try {
        await this.authService.loginUaePass({ code, appId: 'ECMS_WEB' });
        if (await this.authService.isAuthorizedAsync()) {
          return this.authService
            .loadUserPrivileges()
            .pipe(map(() => this.router.createUrlTree(['/dashboard'])))
            .toPromise();
        }
      } catch {}
    }
    if (await this.authService.isAuthorizedAsync()) {
      return this.authService
        .loadUserPrivileges()
        .pipe(map(() => true))
        .toPromise();
    } else {
      return this.router.createUrlTree(['/auth/login'], {
        queryParams: { _redirect: state.url },
      });
    }
  }
}
