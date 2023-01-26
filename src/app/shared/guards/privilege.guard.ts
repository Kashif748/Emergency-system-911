import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PrivilegesService} from '@core/services/privileges.service';


/*
data = {
  name:string // the name of the permission's group
  permission:string || string[] // the type of the permission such as View,Add,Edit,Delete,
  type:"And" | "Or"
  // this represent the type of the relationship between the permissions
  types such as you want this gurad to check "Add" and "Edit" permission you use
  "And operator" and the same gose for "Or" operation
}
*/


@Injectable({
  providedIn: 'root'
})
export class PrivilegeGuard implements CanActivate {

  constructor(private privilegesService: PrivilegesService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermission(next, state);
  }

  canLoad(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.checkPermission(next, state);
  }

  checkPermission(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If you don't pass a data property the guard will lower its guard "Pass"
    if (!next.data || !next.data['permission']) {
      return true;
    }
    // Get new permissions from the server side
    // Get permission types
    const options = this.checkOptionsType(next.data['permission']);
    // Get permission types from the permission object based on the name that you have passed in the data objcet
    const required = {
      type: next.data['type'], // the type of the comparison
      options // the required permissions
    };
    const pass = this.checkActions(required);
    // Get the result of the comparison
    if (pass) {
      // Pass the guard
      return true;
    } else {
      // Send the user to the login page
      this.router.navigate(['/error/403']);
      return false;
    }

  }

  checkOptionsType(options: any) {
    // Default value for the permission (if you dont pass a permission object the guard will check the view permission)
    if (!options) {
      return ['View'];
    }
    // If the permission object was an array it will be returned as it is
    if (Array.isArray(options)) {
      return options;
    }
    // If the permission was a string it will be converted to an array
    const newOptions = [];
    newOptions.push(options);
    return newOptions;
  }

  checkActions(required: { type: string, options: string[] }) {
    if (!required.type) {
      required.type = 'and';
    }
    if (required.type == 'and') {
      return required.options.every(item => {
        return this.privilegesService.checkActionPrivilege(item);
      });

    } else if (required.type == 'or') {
      return required.options.some(item => {
        return this.privilegesService.checkActionPrivilege(item);
      });
    }
  }

}
