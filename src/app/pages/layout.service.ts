import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';

import { MenuItem } from './_layout/components/header/header-menu/menu-item.model';
import { LiquidCacheService } from 'ngx-liquid-cache';
import { AppCacheKeys } from '@core/constant/AppCacheKeys';

@Injectable()
export class LayoutDataService {
  // Variables
  navigations: MenuItem[] = [];
  onNavigationsChange: BehaviorSubject<any>;
  private currentMenuItem$ = new BehaviorSubject<MenuItem>(null); // {1}
  private isCallingDashboardService = false;

  get currentMenuItem() {
    return this.currentMenuItem$.asObservable(); // {2}
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private apiCache: LiquidCacheService
  ) {
    this.onNavigationsChange = new BehaviorSubject([]);
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getCurrentMenuItem(this.navigations);
      }
    });
  }

  async dashboardService() {
    if (this.isCallingDashboardService) {
      return;
    }

    this.isCallingDashboardService = true;
    const handleResponse = (response: any) => {
      const result = response['result'] as any[];
      console.log('result', result);
      const navsItems = [];
      for (const resultElement of result) {
        const menuItem = new MenuItem(resultElement);
        navsItems.push(menuItem);
      }

      this.navigations = navsItems;
      this.getCurrentMenuItem(this.navigations);
      this.onNavigationsChange.next(this.navigations);
    };

    // check if we loaded module privileges before
    const response = this.apiCache.get(AppCacheKeys.MODULE_PRIVILEGES);
    if (response) {
      handleResponse(response);
      return this.onNavigationsChange;
    }

    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/users/modules-privileges`)
        .subscribe(
          (response: any) => {
            if (!response['status']) {
              this.isCallingDashboardService = false;
              return reject();
            }
            this.apiCache.set(AppCacheKeys.MODULE_PRIVILEGES, response);
            handleResponse(response);
            this.isCallingDashboardService = false;
            resolve(this.onNavigationsChange);
          },
          (e) => {
            this.isCallingDashboardService = false;
            reject(e);
          }
        );
    });
  }

  getCurrentMenuItem(list) {
    const currentRoute = this.router.url;
    list.forEach((item) => {
      if (currentRoute.includes(item.module.routing)) {
        this.currentMenuItem$.next(item);
      } else {
        this.getCurrentMenuItem(item.children);
      }
    });
  }
}
