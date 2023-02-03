import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { RoleService } from '@core/api/services/role.service';
import { OrgService } from '@core/api/services/org.service';

import { Observable, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  mergeMap,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { DialogService } from 'src/app/core/services/dialog.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { TranslationService } from '../../i18n/translation.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IStorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy, AfterViewInit {
  panelOpenState: boolean = false;
  form: FormGroup = this.fb.group({
    roleName: [''],
    orgName: [''],
    inherited: [''],
    status: [''],
  });

  allOrgs = [
    { nameAr: 'نعم', nameEn: 'Yes', value: '1' },
    { nameAr: 'لا', nameEn: 'No', value: '0' },
  ];

  status = [
    { nameAr: 'فعال', nameEn: 'active', value: 'true' },
    { nameAr: 'غير فعال', nameEn: 'Inactive', value: 'false' },
  ];
  public orgs$: Observable<any>;

  displayedColumns: string[] = [
    'nameAr',
    'nameEn',
    'inherited',
    'orgId',
    'isActive',
    'actions',
  ];
  private sortState;
  dataSource = new MatTableDataSource<any>();
  private subscriptions: Subscription[] = [];
  loading = false;
  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'paging',
  };
  public filterCrtl = new FormControl('');

  private paginationState: PageEvent;
  private filter: { name?: string } = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  lang = 'en';

  constructor(
    private roleService: RoleService,
    private orgService: OrgService,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private storageService: IStorageService
  ) {}

  ngOnInit(): void {
    let currentOrg =
      this.storageService.getItem('commonData')?.currentOrgDetails;
    this.lang = this.translationService.getSelectedLanguage();
    this.loadData();
    this.filterCrtl.valueChanges.pipe(
        filter((val) => val !== null && val !== ''),
        startWith(''),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data: string) => {
        this.filter = {name: data };

        this.loadData();
      });

    this.orgs$ = this.roleService
      .getOrgById(currentOrg?.id)
      .pipe(map((r) => r.result));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  sortChange(event) {
    this.sortState = event;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.orgService.getAll().pipe(
        map((response) => response.result),
        debounceTime(400),
        mergeMap((orgs: any[]) => {
          return this.roleService
            .getAll(
              this.paginationConfig.currentPage - 1,
              this.paginationConfig.itemsPerPage,
              this.sortState,
              this.form.value
            )
            .pipe(
              map((response) => {
                let roles = [...response.result.content];
                this.paginationConfig.totalItems =
                  response.result.totalElements;
                roles = roles.map((role) => {
                  const org = orgs.find((o) => o.id == role.orgId);
                  return { ...role, org: org };
                });
                return roles;
              })
            );
        }),
        finalize(() => this.loading = false),
        catchError((err, caught) => {
          return [];
        })
      ).subscribe(data => {
        this.dataSource.data = data;
        this.cd.detectChanges();
      })
  }



  async pageChange(event) {
    this.paginationConfig.currentPage = event;
    await this.loadData();
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter.name = filterValue;
    this.loadData();
  }

  clearSearch() {
    this.loading = true;
    this.form.reset({
      roleName: [''],
      orgName: [''],
      inherited: [''],
      status: [''],
    });
    this.form.reset();
    this.ngOnInit();
    this.loading = false;
    this.cd.detectChanges();
  }

  onSubmit() {
  

  // this.roleService.getAll(this.paginationConfig.currentPage ,
  //   this.paginationConfig.itemsPerPage,
  //   this.sortState,
  //   this.form.value).subscribe(res => {
  //     console.log(res);
      
  //   })
    this.loadData();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
function tap(arg0: (v: any) => void): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

