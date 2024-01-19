import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ILangFacade} from '@core/facades/lang.facade';
import {IAuthService} from '@core/services/auth.service';
import {BCState} from '@core/states';
import {VERSION_STATUSES} from '@core/states/bc/bc/bc.state';
import {FormUtils} from '@core/utils';
import {Select, Store} from '@ngxs/store';
import {GenericValidators} from '@shared/validators/generic-validators';
import {Observable, Subject} from 'rxjs';
import {filter, map, pairwise, switchMap, take, takeUntil, tap,} from 'rxjs/operators';
import {BcVersions} from 'src/app/api/models';
import {BrowseBCAction} from '../states/browse-bc.action';
import {BrowseBCState, BrowseBCStateModel} from '../states/browse-bc.state';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {PrivilegesService} from "@core/services/privileges.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-bc',
  templateUrl: './bc.component.html',
  styleUrls: ['./bc.component.scss'],
})
export class BCComponent implements OnInit, OnDestroy {
  VERSION_STATUSES = VERSION_STATUSES;
  @Select(BrowseBCState.state)
  public state$: Observable<BrowseBCStateModel>;

  @Select(BCState.loading)
  public loading$: Observable<boolean>;

  @Select(BCState.blocking)
  blocking$: Observable<boolean>;

  public dialogOpened$: Observable<boolean>;

  public versions$: Observable<BcVersions[]>;

  @Select(BCState.totalRecords)
  public totalRecords$: Observable<number>;

  selectedVersion: BcVersions;
  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }
  public showVersionForm = false;
  form: FormGroup;
  private destroy$ = new Subject();

  public sortableColumns = [
    {
      name: 'VERSION_LIST.NAME_AR',
      code: 'nameAr',
    },
    {
      name: 'VERSION_LIST.NAME_EN',
      code: 'nameEn',
    },
    { name: 'VERSION_LIST.CREATED_ON', code: 'createdOn' },
  ];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private auth: IAuthService,
    private langFacade: ILangFacade,
    private formBuilder: FormBuilder,
    public privilege: PrivilegesService,
    private translate: TranslateService,
    private confirmationService: ConfirmationService,
  ) {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params['_version']),
        pairwise(),
        filter(
          ([previousValue, currentValue]) => currentValue !== previousValue
        )
      )
      .subscribe(([previousValue, currentValue]) => {
        this.store.dispatch(
          new BrowseBCAction.GetVersion({
            versionId: currentValue,
          })
        );
      });
  }
  ngOnInit() {
    this.dialogOpened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'version_dialog')
    );

    this.createForm();

    this.store
      .select(BCState.selectedVersion)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        tap((version) => (this.selectedVersion = version))
      )
      .subscribe();

    this.versions$ = this.store.select(BCState.versions).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
          };
        })
      )
    );
  }
  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
    });
  }
  toggleDialog() {
    this.store.dispatch(new BrowseBCAction.ToggleDialog());
  }
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const businessCon = {
      ...this.form.getRawValue(),
    };
    businessCon.orgStructure = {
      id: this.loggedinUserId,
    };
    businessCon.isActive = true;
    this.store
      .dispatch(new BrowseBCAction.CreateBusinessContinuity(businessCon))
      .pipe(
        switchMap(() => this.store.select(BCState.selectedVersion)),
        takeUntil(this.destroy$),
        take(1),
        tap((bc) => {
          this.selectedVersion = bc;
          this.form.reset();
          this.showVersionForm = false;
          this.setValueGlobally(bc);
        })
      )
      .subscribe();
  }
  setValueGlobally(value: BcVersions) {
    this.store
      .dispatch(
        new BrowseBCAction.SetVersionId({
          versionId: value.id,
        })
      )
      .toPromise()
      .then(() => this.toggleDialog());
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sort(event) {
    this.store.dispatch(new BrowseBCAction.Sort({ field: event.value }));
  }
  order(event) {
    this.store.dispatch(
      new BrowseBCAction.Sort({ order: event.checked ? 'desc' : 'asc' })
    );
  }
  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseBCAction.LoadPage({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  deleteVersion(id) {
    return () => {
      this.confirmationService.confirm({
        target: event.target,
        message: this.translate.instant('CONFIRM'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store
            .dispatch(new BrowseBCAction.Delete({ id }))
            .toPromise()
            .then(() => {
              this.loadPage();
            });
        },
        reject: () => {
        },
      });
    };
  }

  changeStatues(id, status: VERSION_STATUSES) {
    return () => {
      this.confirmationService.confirm({
        target: event.target,
        message: this.translate.instant('CONFIRM'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(
            new BrowseBCAction.ChangeStatus({
              versionId: id,
              statusId: status,
            })
          );
        },
        reject: () => {
        },
      });
    };
  }
}
