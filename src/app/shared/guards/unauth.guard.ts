import { Injectable } from "@angular/core";
import {
  CanLoad,
  UrlSegment,
  Route,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from "@angular/router";

import { IStorageService } from "@core/services/storage.service";

import { IAuthService } from "../../core/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class UnauthGuard implements CanLoad, CanActivate, CanActivateChild {
  /**
   *
   */
  constructor(
    private router: Router,
    private authService: IAuthService,
    private storageService: IStorageService
  ) {}

  private async processUaePass(route: ActivatedRouteSnapshot) {
    const code = route?.queryParams["code"];
    if (code) {
      try {
        await this.authService.loginUaePass({ code, appId: "ECMS_WEB" });
      } catch {}
    }
  }

  private async guard(
    urlSegments: UrlSegment[],
    route?: ActivatedRouteSnapshot
  ): Promise<boolean> {
    await this.processUaePass(route);
    const isAuthorized = await this.authService.isAuthorizedAsync();
    if (isAuthorized) {
      this.router.navigate(["/dashboard"]);
    }
    return !isAuthorized;
  }

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuthorized = await this.guard(childRoute.url, childRoute);

    return isAuthorized;
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuthorized = await this.guard(route.url, route);

    return isAuthorized;
  }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const isAuthorized = await this.guard(segments);

    return isAuthorized;
  }
}
