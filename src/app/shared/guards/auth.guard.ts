import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { IAuthService } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: IAuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const code = route.queryParams['code'];
    if (code) {
      try {
        await this.authService.loginUaePass({ code, appId: 'ECMS_WEB' });
        if (await this.authService.isAuthorizedAsync()) {
          this.router.navigate(['/dashboard']);
          return true;
        }
      } catch {}
    }
    if (await this.authService.isAuthorizedAsync()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
