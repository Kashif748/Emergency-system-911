import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';

import { TranslationService } from 'src/app/modules/i18n/translation.service';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

import { CallDutyService } from '../call-duty.service';

import { SmsModalComponent } from './sms-modal/sms-modal.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { CommonService } from 'src/app/core/services/common.service';
import * as _ from 'lodash';
import { IStorageService } from '@core/services/storage.service';
import { SharedServicesService } from '@shared/shared-services.service';
import { userType } from '../../groups-management/group.model';

@Component({
  selector: 'app-call-duty',
  templateUrl: './call-duty.component.html',
  styleUrls: ['./call-duty.component.scss'],
})
export class CallDutyComponent implements OnInit, OnDestroy {
  @ViewChild('groups') groupsSelection: MatSelectionList;
  @ViewChild('incidents') incidentsSelection: MatSelectionList;
  @ViewChild('users') usersSelection: MatSelectionList;

  DialogRef: MatDialogRef<any>;

  lang = 'en';
  selectAllUsers = false;
  selectAllGroups = false;
  selectAllIncidents = false;

  showErrorMSG = false;
  ProBackstyle: any;
  commonData: any;
  constructor(
    public _matDialog: MatDialog,
    private _callDutyService: CallDutyService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private storageService: IStorageService,
    private sharedService: SharedServicesService
  ) {
    this.commonService.loadCommonData().subscribe((commonData) => {
      if (!_.isEmpty(commonData.result)) {
        this.storageService.setState('commonData', commonData.result);
      }
    });
    this.commonData = this.commonService.getCommonData();
  }

  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  // start groups pagination
  public groups$ = new BehaviorSubject([]);
  private groups = [];
  private groupsPage = 0;
  private completeGroups = false;
  public groupsLoading = false;
  public groupsSearching = false;
  groupsNextPage(event?) {
    this.groupsNextPageStore.next();
  }
  private groupsNextPageStore = new BehaviorSubject<void>(undefined);
  private groupsNextPage$ = this.groupsNextPageStore
    .asObservable()
    .pipe(throttleTime(1000));
  async _groupsNextPage() {
    if (!this.completeGroups) {
      console.log('grousps');

      this.groupsLoading = true;
      this.cdr.detectChanges();
      const groups = await this._callDutyService
        .getAllGroups(this.groupsPage, 30, this.groupsSearch)
        .pipe(
          map((r) => {
            let groups = r.content as any[];
            groups.map((item) => {
              if (item?.users) {
                item['manager'] = item.users.find(
                  (user) => user.type == userType.MANAGER
                )?.user;
              }
              return item;
            });
            return groups;
          })
        )
        .toPromise();
      this.completeGroups = groups?.length == 0;
      this.groups = [...this.groups, ...groups];
      this.groups$.next(this.groups);

      this.groupsPage++;
      this.groupsLoading = false;
      this.cdr.detectChanges();
    }
  }
  private groupsSearch = '';
  async applyGroupsFilter(value) {
    this.groups = [];
    this.groupsPage = 0;
    this.completeGroups = false;
    this.groupsLoading = false;
    this.groupsSearch = value;
    this.groupsSearching = true;
    this.cdr.detectChanges();
    this.groups$.next([]);
    await this.groupsNextPage();
    this.groupsSearching = false;
    this.cdr.detectChanges();
  }
  // end

  // start incidents pagination
  public incidents$ = new BehaviorSubject([]);
  private incidents = [];
  private incidentsPage = 0;
  private completeIncidents = false;
  public incidentsLoading = false;
  public incidentsSearching = false;
  private incidentsNextPageStore = new BehaviorSubject<void>(undefined);
  private incedintsNextPage$ = this.incidentsNextPageStore
    .asObservable()
    .pipe(throttleTime(1000));

  incidentsNextPage(event?) {
    this.incidentsNextPageStore.next();
  }
  async _incidentsNextPage() {
    if (!this.completeIncidents) {
      console.log('incinasd');

      this.incidentsLoading = true;
      this.cdr.detectChanges();
      const incidents = await this._callDutyService
        .getAllIncidents(this.incidentsPage, 30, this.incidentsSearch)
        .toPromise();
      this.completeIncidents = incidents?.length == 0;
      this.incidents = [...this.incidents, ...incidents];
      this.incidents$.next(this.incidents);
      this.incidentsPage++;
      this.incidentsLoading = false;
      this.cdr.detectChanges();
    }
  }
  private incidentsSearch = '';
  async applyIncidentsFilter(value) {
    this.incidents = [];
    this.incidentsPage = 0;
    this.completeIncidents = false;
    this.incidentsLoading = false;
    this.incidentsSearch = value;
    this.incidentsSearching = true;
    this.cdr.detectChanges();
    this.incidents$.next([]);

    await this.incidentsNextPage();
    this.incidentsSearching = false;
    this.cdr.detectChanges();
  }
  // end

  // start users  paination
  public users$ = new BehaviorSubject([]);
  private users = [];
  private usersPage = 0;
  private completeusers = false;
  public usersLoading = false;
  public usersSearching = false;
  private nextPageStore = new BehaviorSubject<void>(undefined);
  private nextPage$ = this.nextPageStore
    .asObservable()
    .pipe(throttleTime(1000));

  nextUsersPage(event?) {
    this.nextPageStore.next();
  }
  async _nextPage() {
    if (!this.completeusers) {
      this.usersLoading = true;
      this.cdr.detectChanges();
      console.log('users');

      const users = await this.sharedService
        .getAllUsers(this.usersPage, 30, this.searchUser)
        .toPromise();
      this.completeusers = users?.length == 0;
      this.users = [...this.users, ...users];
      this.users$.next(this.users);
      this.usersPage++;
      this.usersLoading = false;
      this.cdr.detectChanges();
    }
  }

  private searchUser = '';
  private filteringStore = new Subject();

  async applyUsersFilter(value) {
    this.users = [];
    this.usersPage = 0;
    this.completeusers = false;
    this.usersLoading = false;
    this.searchUser = value;
    this.usersSearching = true;
    this.cdr.detectChanges();
    this.users$.next([]);

    await this.nextUsersPage();
    this.usersSearching = false;
    this.cdr.detectChanges();
  }

  // end
  async ngOnInit(): Promise<void> {
    this.lang = this.translationService.getSelectedLanguage();

    let sub = this.incedintsNextPage$.subscribe(async (_) => {
      await this._incidentsNextPage();
    });
    this.subscriptions.push(sub);

    sub = this.groupsNextPage$.subscribe(async (_) => {
      await this._groupsNextPage();
    });
    this.subscriptions.push(sub);

    sub = this.nextPage$.subscribe(async (_) => {
      await this._nextPage();
    });
    this.subscriptions.push(sub);
  }
  openModal() {
    if (this.isValid()) {
      let seletcedOptions = {
        users: this.getSelectedOptions(this.usersSelection, 'obj'),
        groups: this.getSelectedOptions(this.groupsSelection, 'obj'),
        incidents: this.getSelectedOptions(this.incidentsSelection, 'obj'),
      };
      this.DialogRef = this._matDialog.open(SmsModalComponent, {
        disableClose: false,
        panelClass: 'modal',
        data: seletcedOptions,
      });

      this.DialogRef.afterClosed().subscribe((data) => {
        if (data) {
          console.log(data);
          let selectedData = this.getAllSelectedData();

          if (data?.isSms) {
            this._callDutyService.sendSMS({
              ...selectedData,
              body: data?.content,
            });
          } else {
            this._callDutyService.sendEmail({
              users: selectedData.userList.map((item) => item.id),
              incidents: selectedData.incidentList.map((item) => item.id),
              groups: selectedData.groupList.map((item) => item.id),
              ...data,
            });
          }
        }
      });
    } else {
      this.showErrorMSG = true;

      setTimeout(() => {
        this.showErrorMSG = false;
        this.cdr.detectChanges();
      }, 4000);
    }
  }

  getSelectedOptions(list: MatSelectionList, returnType: 'obj' | 'id') {
    return list.selectedOptions.selected.map((item) => {
      if (returnType == 'id') {
        return {
          id: item['value']['id'],
        };
      } else {
        return item['value'];
      }
    });
  }

  openUsersModal(group) {
    this.DialogRef = this._matDialog.open(GroupUsersComponent, {
      disableClose: false,
      panelClass: 'modal',
      maxHeight: '600px',
      data: {
        users: group.users,
      },
    });
  }

  getAllSelectedData() {
    let users = this.getSelectedOptions(this.usersSelection, 'id');
    let groups = this.getSelectedOptions(this.groupsSelection, 'id');
    let incidents = this.getSelectedOptions(this.incidentsSelection, 'id');

    return {
      userList: this.selectAllUsers ? [] : users,
      groupList: this.selectAllGroups ? [] : groups,
      incidentList: this.selectAllIncidents ? [] : incidents,
      toAllUsers: this.selectAllUsers,
      toAllGroups: this.selectAllGroups,
      toAllIncidents: this.selectAllIncidents,
    };
  }
  isValid() {
    if (
      this.usersSelection.selectedOptions.selected.length == 0 &&
      this.groupsSelection.selectedOptions.selected.length == 0 &&
      this.incidentsSelection.selectedOptions.selected.length == 0
    ) {
      return false;
    }
    return true;
  }

  selectionChange(value) {
    this.usersSelection = value.users;
    this.selectAllUsers = value.selectAllUsers;
  }

  // ui
  getPriorityNameId(id) {
    if (!_.isEmpty(this.commonData)) {
      const priority = _.find(this.commonData.priorities, ['id', id]);

      if (priority) {
        if (priority?.nameEn == 'danger' || priority?.nameEn == 'very danger') {
          this.ProBackstyle =
            'text-dark font-weight-500 label label-lg label-light-danger label-inline text-white';
        } else if (priority.nameEn == 'medium') {
          this.ProBackstyle =
            ' font-weight-500 label label-lg label-light-warning label-inline';
        } else {
          this.ProBackstyle =
            'text-dark font-weight-500 label label-lg label-light-primary label-inline';
        }

        return this.lang === 'en' ? priority.nameEn : priority.nameAr;
      }
    }
  }

  getStatusId(id) {
    if (!_.isEmpty(this.commonData)) {
      const status = _.find(this.commonData.incidentStatus, ['id', id]);
      return this.lang === 'en' ? status.nameEn : status.nameAr;
    }
    //return 'abc';
  }

  getCategory(id, isSubCategory: boolean) {
    let categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0 || !id) return;

    const subCategory = categories.find((item) => item.id == id);

    if (isSubCategory)
      return this.lang == 'en' ? subCategory?.nameEn : subCategory?.nameAr;

    const category = categories.find(
      (item) => subCategory?.parent?.id == item.id
    );

    return this.lang == 'en' ? category?.nameEn : category?.nameAr;
  }
}
