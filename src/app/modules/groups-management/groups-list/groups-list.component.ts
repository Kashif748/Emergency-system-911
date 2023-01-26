import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { DialogService } from 'src/app/core/services/dialog.service';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { GroupModel, userType } from '../group.model';
import { GroupsManagementService } from '../groups-management.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { GroupIncidentsCategroiesComponent } from '../group-incidents-categroies/group-incidents-categroies.component';
import { map, throttleTime } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { PickUsersComponent } from '@shared/pick-users/pick-users.component';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from '@core/api/services/role.service';
import { IStorageService } from '@core/services/storage.service';
import { EventsManagementService } from '../../events-management/events-management.service';
import { CommonService } from '@core/services/common.service';
import { PickOrgComponent } from '@shared/components/pick-org/pick-org.component';
import { AreaItem } from '../group-incidents-categroies/center.model';
import { IncidentsService } from '@core/api/services/incident.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit, OnDestroy {
  // UI
  dialogRef: any;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  panelOpenState = false;
  form: FormGroup = this.fb.group({
    orgId: [''],
    name: [''],
    incidentLocation: [''],
    incidentCategoryId: [''],
    hasMembers: [null],
  });
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  // Variables

  public orgs$: Observable<any>;
  centers: any[] = [];
  categories = [];
  groups: GroupModel[] = [];
  displayedColumns: string[] = [
    'nameAr',
    'nameEn',
    'Organization',
    'Manager',
    'usersNumber',
    'actions',
  ];
  paginationState: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    previousPageIndex: 0,
  };
  lang = 'en';
  private readonly subscriptions: Subscription[] = [];
  public groups$ = new BehaviorSubject([]);
  public groupsLoading = false;
  public groupsSearching = false;
  private groupsNextPageStore = new BehaviorSubject<void>(undefined);
  private groupsNextPage$ = this.groupsNextPageStore
    .asObservable()
    .pipe(throttleTime(1000));

  constructor(
    private groupsManagementService: GroupsManagementService,
    private router: Router,
    private route: ActivatedRoute,
    public matDialog: MatDialog,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private storageService: IStorageService,
    private eventsService: EventsManagementService,
    private readonly commonService: CommonService,
    private readonly incidentsService: IncidentsService
  ) {}

  ngOnInit(): void {
    const currentOrg = this.commonService.getCommonData().currentOrgDetails;
    this.lang = this.translationService.getSelectedLanguage();
    this.groupsNextPage$.subscribe(async (_) => {
      await this._groupsNextPage();
    });
    this.categories = this.getChildrenCategories();
    this.incidentsService.getCenters().subscribe((data) => {
        if (data) { this.centers = data['result'];}
      },(error) => {}
    );
    this.orgs$ = this.roleService
      .getOrgById(currentOrg?.id)
      .pipe(map((r) => r.result));
  }

  addGroup() {
    this.router.navigate(['/groups-management/groups/add'], {
      relativeTo: this.route,
    });
  }

  editGroup(userId) {
    this.router.navigate(['/groups-management/groups/edit/' + userId], {
      relativeTo: this.route,
    });
  }

  deleteGroup(group) {
    const sub = this.dialogService.deleteConfirm().subscribe((confirm) => {
      if (confirm) {
        this.groupsManagementService
          .updateGroup(group?.id, { ...group, isActive: false })
          .then(
            (ok) => {
              this.alertService.openSuccessSnackBar();
              this._groupsNextPage();
            },
            (err) => this.alertService.openFailureSnackBar()
          );
      }
    });
    this.subscriptions.push(sub);
  }

  pageChanged(event: PageEvent) {
    this.paginationState = event;
    this.groupsNextPageStore.next();
  }

  openModal(itemId) {
    this.matDialog.open(GroupIncidentsCategroiesComponent, {
      disableClose: false,
      panelClass: 'modal',
      data: { id: itemId },
    });
  }

  openUsersModal(group: GroupModel) {
    const manager = group.users.filter((item) => item.type == userType.MANAGER);
    const members = group.users.filter((item) => item.type == userType.MEMBER);

    const dialog = this.matDialog.open(PickUsersComponent, {
      disableClose: false,
      panelClass: 'pick-user-modal',
      data: {
        recivers: members.map((item) => item.user),
        disabledUsers: manager.map((item) => item.user),
        correrspondenceMode: false,
      },
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        const ids = data?.map((item) => item.id);
        if (manager.length > 0) {
          ids.push(manager[0].user.id);
        }

        this.groupsManagementService.updateUsers(group.id, ids ?? []).subscribe(
          (res) => {
            group.users = data.map((item) => {
              return {
                user: item,
                id: 0,
                type: userType.MEMBER,
              };
            });
            group.users.push(manager[0]);
            this.alertService.openSuccessSnackBar();
            this.cdr.detectChanges();
          },
          (err) => {
            this.alertService.openFailureSnackBar();
          }
        );
      }
    });
  }

  groupsNextPage(event?) {
    this.groupsNextPageStore.next();
  }

  async _groupsNextPage() {
    this.groupsLoading = true;
    this.cdr.detectChanges();
    this.groups = await this.groupsManagementService
      .getAllGroups(this.paginationState, this.form.value)
      .pipe(
        map((r) => {
          const groups = r.content as any[];
          this.paginationState.length = r.totalElements;
          if((r.totalPages > 0) && (r.numberOfElements == 0)){
            this.paginationState.pageIndex = r.totalPages - 1;
            this._groupsNextPage();
          }else{
            groups.map((item) => {
              if (item?.users) {
                item['manager'] = item.users.find(
                  (user) => user.type == userType.MANAGER
                )?.user;
              }
              return item;
            });
          }
          this.dataSource.data = groups;
          return groups;
        })
      )
      .toPromise();
    this.groups$.next(this.groups);

    this.groupsLoading = false;
    this.cdr.detectChanges();
  }

  onSubmit() {
    this.applyGroupsFilter();
  }

  async applyGroupsFilter() {
    this.groups = [];
    this.paginationState.pageIndex = 0;
    this.groupsLoading = false;
    this.groupsSearching = true;
    this.cdr.detectChanges();
    this.groups$.next([]);
    await this.groupsNextPage();
    this.groupsSearching = false;
    this.cdr.detectChanges();
  }

  clearSearch() {
    this.groupsLoading = true;
    this.form.reset();
    this.ngOnInit();
    this.groupsLoading = false;
  }

  // filter data
  getChildrenCategories() {
    const categories: any[] =
      this.commonService.getCommonData().incidentCategories;
    if (categories.length <= 0) {
      return [];
    }

    return categories.filter((item) => item.parent != null);
  }

  public downloadPDF() {
    this.groupsManagementService
      .downloadReport('PDF', this.form.value)
      .subscribe();
  }

  public downloadXlsx() {
    this.groupsManagementService
      .downloadReport('EXCEL', this.form.value)
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
