import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppCommonData } from '@core/entities/AppCommonData';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inew } from 'src/app/modules/news/models/new.interface';
import { New } from 'src/app/modules/news/models/new.model';
import { DashboardService } from 'src/app/pages/dashboard/dashboard.service';
import { environment } from 'src/environments/environment';
import { CommonDataModel, CommonService } from './common.service';
export type SysStatus = 'golden' | 'silver' | 'bronze';
export interface SysStatusModel {
  status?: SysStatus;
  reason?: string;
}
@Injectable({
  providedIn: 'root',
})
export class SysStatusService {
  private themeMap = {
    golden: 0,
    silver: 1,
    bronze: 2,
  };
  private reverseThemeMap = {
    0: 'golden',
    1: 'silver',
    2: 'bronze',
  };
  private state: SysStatusModel = {};
  private store = new BehaviorSubject<SysStatusModel>(this.state);
  public vm$ = this.store.asObservable();

  constructor(private commonService: CommonService, private http: HttpClient,
    private dasboardService: DashboardService) {
    this.commonService.getCommonDataState().subscribe((d) => {
      this.state.status = this.reverseThemeMap[d?.currentOrgDetails?.theme];
      this.setStatus(this.reverseThemeMap[d?.currentOrgDetails?.theme]);
    });
  }
  public get sanpshot() {
    return { ...this.state };
  }

  public setStatus(status: SysStatus) {
    this.updateState({ ...this.state, status });
  }

  public setReason(reason: string) {
    this.updateState({ ...this.state, reason });
  }

  public getReverseThemeMap(id: number){
    return this.reverseThemeMap[id];
  }

  public saveChanges() {
    return this.http.put(`${environment.apiUrl}/organizations/update/theme`, {
      theme: this.themeMap[this.sanpshot.status] ?? null,
      themeReason: this.sanpshot.reason,
    }).pipe(
      tap(v => {
        this.dasboardService.getContent();
        let commonData: AppCommonData = JSON.parse(localStorage.getItem('commonData'));
        commonData.currentOrgDetails['theme'] = this.themeMap[this.sanpshot.status];
        localStorage.setItem('commonData', JSON.stringify(commonData));
      })
    );
  }

  private updateState(state: SysStatusModel) {
    this.state = { ...state };
    this.store.next(this.state);
  }
}
