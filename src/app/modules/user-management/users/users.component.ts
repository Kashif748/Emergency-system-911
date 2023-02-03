import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { UserService } from '@core/api/services/user.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { TranslationService } from '../../i18n/translation.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RoleService } from '@core/api/services/role.service';
import {
  debounceTime,
  map,
  startWith,
  switchMap,
  tap,
  throttleTime,
  takeWhile,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ExcelDialogComponent } from './excel-dialog/excel-dialog.component';
import { CommonService } from '@core/services/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  // UI
  form: FormGroup = this.fb.group({
    name: [''],
    emiratesId: [''],
    orgName: [''],
    userName: [''],
    roleName: [''],
  });

  searchControl: FormControl;

  // pagination
  public rolesList$ = new BehaviorSubject([]);
  isCompletedRoles: boolean = false;
  private rolesList = [];
  private usersPage = 0;
  private completeusers = false;
  public rolesLoading = false;
  private nextPageStore = new Subject();
  private nextPage$ = this.nextPageStore

    .asObservable()
    .pipe(throttleTime(1000));

  private paginationState: PageEvent;
  @Input() placeholder: string;
  @Input() appearance = 'outline';
  @Output() selectedOrg = new EventEmitter();

  // Variables.
  public loading$: Observable<any>;
  panelOpenState = false;
  public orgs$: Observable<any>;
  public roles$: Observable<any>;
  roles = [];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
  loading = true;
  private subscriptions: Subscription[] = [];
  lang: string;
  control: FormControl;
  filteredOptions: Observable<any[]>;
  totalElements = 0;
  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'paging',
  };
  users$: Observable<any[]>;
  private sortState: any;
  filteredRoles: any[];
  roleControl = new FormControl();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private roleService: RoleService,
    private dialog: MatDialog,
    private readonly commonService: CommonService
  ) {}

  ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();
    this.searchControl = new FormControl('');
    this.nextPage(event);
    const currentOrg = this.commonService.getCommonData().currentOrgDetails;
    this.loading$ = this.userService.loading$;
    let sub = this.userService.onUsersListChange.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.subscriptions = [...this.subscriptions, sub];

    this.paginationState = { pageIndex: 0, pageSize: 10, length: 10 };
    this.users$ = this.userService.onUsersListChange;
    sub = this.userService.onPaginationConfigChange.subscribe((data) => {
      this.paginationConfig.itemsPerPage = data.itemsPerPage;
      this.paginationConfig.totalItems = data.totalItems;
      this.paginationConfig.currentPage = data.currentPage + 1;
    });

    this.subscriptions = [...this.subscriptions, sub];
    this.orgs$ = this.roleService
      .getOrgById(currentOrg?.id)
      .pipe(map((r) => r.result));
    this.roleService
      .getAll(
        this.paginationConfig.currentPage - 1,
        this.paginationConfig.itemsPerPage,
        this.sortState
      )
      .subscribe((data: any) => {
        this.roles = [
          { nameEn: 'noRole', nameAr: 'بدون ادوار' },
          ...data?.result?.content,
        ];
        this.filteredRoles = this.roles;
        this.cdr.detectChanges();
      });
    this.form
      .get('roleName')
      .valueChanges.pipe(
        startWith(''),
        map((filter) => this.filter(filter))
      )
      .subscribe((roles) => {
        this.filteredRoles = roles;
        this.cdr.detectChanges();
      });
  }

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.roles.filter((option) => {
      return (
        option.nameEn.toLowerCase().includes(filterValue) ||
        option.nameAr.toLowerCase().includes(filterValue)
      );
    });
  }

  nextPage(event) {
    of(event)
      .pipe(
        tap(() => (this.rolesLoading = true)),
        takeWhile(() => !this.isCompletedRoles),
        debounceTime(500),
        switchMap((value) =>
          this.roleService.getAll(this.usersPage, 10, this.searchControl.value)
        )
      )
      .subscribe((response) => {
        let newRoles = response?.result?.content;
        this.roles = [...this.roles, ...newRoles];
        this.filteredRoles = this.roles;
        this.isCompletedRoles = newRoles.length == 0;
        this.usersPage++;
        this.rolesLoading = false;
        this.cdr.detectChanges();
      });
  }

  onPagination(event) {
    if (typeof event == 'number') {
      this.paginationState.pageIndex = event - 1;
    } else {
      this.paginationState.pageIndex = event.pageIndex;
    }
    this.userService.getAllProfiles(
      this.paginationState.pageSize,
      this.paginationState.pageIndex,
      this.form.value,
      this.sortState
    );
  }

  sortChange(event) {
    this.sortState = event;
    this.onPagination(this.paginationState);
  }

  addUser() {
    this.router.navigate(['/user-management/users/add'], {
      relativeTo: this.route,
    });
  }

  editUser(userId) {
    this.router.navigate(['/user-management/users/edit/' + userId], {
      relativeTo: this.route,
    });
  }

  getSelectedOrg(id) {
    this.selectedOrg.emit(id);
  }

  activateUser(userId) {
    try {
      this.userService.activate(userId).toPromise();
      this.onPagination(this.paginationState);
    } catch (error) {
      this.alertService.openFailureSnackBarWithMsg(
        this.lang == 'en'
          ? error?.error?.error?.messageEn
          : error?.error?.error?.messageAr
      );
    }
  }

  applyFilter(event: Event) {
    this.onPagination({ pageIndex: 0, pageSize: 10, length: 10 });
  }

  search(event: Event) {
    this.onPagination({ pageIndex: 0, pageSize: 10, length: 10 });
  }

  onSubmit() {
    this.loading = true;
    this.paginationConfig.currentPage = 0;
    this.userService.getAllProfiles(
      this.paginationConfig.itemsPerPage,
      this.paginationConfig.currentPage,
      this.form.value,
      { length: 10 }
    );
  }

  clearSearch() {
    this.form.reset({
      name: [''],
      EId: [''],
      orgName: [''],
      userName: [''],
    });

    this.loading = true;
    this.form.reset();
    this.onPagination({ pageIndex: 0, pageSize: 10, length: 10 });
    this.ngOnInit();
    this.loading = false;
    this.cdr.detectChanges();
  }

  public downloadPDF() {
    this.userService.downloadReport('PDF', this.form.value).subscribe();
  }

  public downloadXlsx() {
    this.userService.downloadReport('EXCEL', this.form.value).subscribe();
  }

  excelDialog() {
    this.dialog.open(ExcelDialogComponent);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
