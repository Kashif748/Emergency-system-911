import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CommonDataState} from '@core/states';
import {SituationsAction} from '@core/states/situations/situations.action';
import {SituationsState} from '@core/states/situations/situations.state';
import {FormUtils} from '@core/utils';
import {Select, Store} from '@ngxs/store';
import {GenericValidators} from '@shared/validators/generic-validators';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError, filter, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {SituationProjection} from 'src/app/api/models';
import {BrowseSituationsAction} from '../../states/browse-situations.action';
import {Dialog} from "primeng/dialog";
import {TabView} from "primeng/tabview";
import {FilesListComponent} from "@shared/attachments-list/files-list/files-list.component";
import {LazyLoadEvent, SortEvent} from "primeng/api";
import {BrowseSituationsState, BrowseSituationsStateModel} from "../../states/browse-situations.state";
import {SituationAttachmentDetails} from "../../../../api/models/situation-attachment-details";
import {PrivilegesService} from "@core/services/privileges.service";
import {AlertnessLevel} from "../../../../api/models/alertness-level";

@Component({
  selector: 'app-situation-dialog',
  templateUrl: './situation-dialog.component.html',
  styleUrls: ['./situation-dialog.component.scss'],
})
export class SituationDialogComponent implements OnInit, OnDestroy, AfterViewChecked {
  public attachmentPage$: Observable<SituationAttachmentDetails[]>;

  public alertnessLevel$: Observable<AlertnessLevel[]>;

  formDialog$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  plan$: Observable<boolean>;
  @ViewChild(Dialog) dialog: Dialog;
  @ViewChild(TabView) tabv: TabView;
  @Select(SituationsState.situationTotalRecords)
  public situationTotalRecords$: Observable<number>;

  @ViewChild('attachPlanContainer', {read: ViewContainerRef})
  attachPlanContainer: ViewContainerRef;
  attachPlanComponent: FilesListComponent;


  public get asDialog() {
    return this.route.component !== SituationDialogComponent;
  }


  totalRecords: number;

  @Select(CommonDataState.newsTypes)
  public newsTypes$: Observable<any[]>;

  @Select(SituationsState.blocking)
  blocking$: Observable<boolean>;

  @Select(SituationsState.attachmentLoading)
  loadingAttachment$: Observable<boolean>;

  @Input()
  loading: boolean;

  @Input()
  activeTab: number = 0;

  form: FormGroup;
  tabIndex: number;

  @Select(BrowseSituationsState.state)
  public state$: Observable<BrowseSituationsStateModel>;

  get editMode() {
    return this._situationId !== undefined && this._situationId !== null;
  }

  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }

  _situationId: number;
  _mode: string;
  type: boolean;
  editAttachmentType: boolean;



  @Input()
  set situationId(v: number) {
    this._situationId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.attachPlanContainer?.clear();
    this.attachPlanComponent = undefined;

    this.store
      .dispatch(new SituationsAction.GetSituation({id: v}))
      .pipe(
        switchMap(() => this.store.select(SituationsState.situation)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((t: SituationProjection) => {
          this.form.patchValue({
            ...t,
            startDate: new Date(t.startDate),
            endDate: new Date(t.endDate),
            themeType: t?.themeType,
            type: t?.newsType,
            theme: t?.alertnessLevel
          });
        })
      )
      .subscribe(() => {
        if (this.editAttachmentType) {
          this.loadAttachComponent();
        }
      });

    if (this.viewOnly) {
      this.store.dispatch(
        new BrowseSituationsAction.LoadAttachmentSituations({
          id: this._situationId,
          pageRequest: {
            first: 0,
            rows: 10,
          },
        })
      ).pipe(
        switchMap(() =>    this.attachmentPage$ = this.store.select(SituationsState.situationAttachmentPage).pipe(
          filter((p) => !!p),
          map((page) =>
            page[0].attachments?.map((u) => {
              return {
                ...u,
              };
            })
          )
        ))
      ).subscribe();
    }
  }

  destroy$ = new Subject();

  themeTypes = [
    {
      id: 0,
      nameAr: 'الوضع الذهبي',
      nameEn: 'Golden Theme',
    },
    {
      id: 1,
      nameAr: 'الوضع الفضي',
      nameEn: 'Silver Theme',
    },
    {
      id: 2,
      nameAr: 'الوضع البرونزي',
      nameEn: 'Bronze Theme',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private privilegesService: PrivilegesService,
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.situationId = id;
      });
    this.route.queryParams.pipe(
      map((params) => params['_mode']),
      takeUntil(this.destroy$)
    )
      .subscribe((mode) => {
        this._mode = mode;
      });
    this.viewOnly$ = this.route.queryParams.pipe(
      map((params) => params['_mode'] === 'viewonly'),
      tap((v) => {
        if (this.form) {
          try {
            if (v) {
              this.form.disable();
            } else {
              this.form.enable();
            }
          } catch {
          }
        }
      })
    );
    this.plan$ = this.route.queryParams.pipe(
      map((params) => params['_type']),
      tap((v) => {
        this.editAttachmentType = v;
        if (this.form) {
          try {
            if (v == 'plan') {
              // this.editAttachmentType = true;
              this.type = true;
            } else {
              this.type = false;
              // this.editAttachmentType = true;
            }
          } catch {
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.buildForm();
    this.formDialog$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === '_form_dialog')
    );

    this.store.dispatch(
      new SituationsAction.GetAlertnessLevel({
          page: 0,
          size: 10,
      })
    ).pipe(
      takeUntil(this.destroy$),
      take(1),
      switchMap(() =>    this.alertnessLevel$ = this.store.select(SituationsState.alertness).pipe(
        takeUntil(this.destroy$),
        take(1),
        filter((p) => !!p),
        map((page) =>
          page?.map((u) => {
            return {
              ...u,
            };
          })
        )
      ))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.activeTab = 0;
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      type: [null, [Validators.required]],
      theme: [null],
      alertnessLevel: [null],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
  }

  async submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    let situation = {
      ...this.form.getRawValue(),
      id: this._situationId,
    };

    situation = {
      ...situation,
      type: situation.type?.id,
      theme: situation.theme?.id,
    };

    if (this.editMode) {
      this.store
        .dispatch(new BrowseSituationsAction.UpdateSituations(situation))
        .pipe(
          catchError(() => {
            return EMPTY;
          }),
          takeUntil(this.destroy$),
          take(1)
        )
        .subscribe();
      await this.attachPlanComponent?.upload(this._situationId, false);

    } else {
      this.store
        .dispatch(new BrowseSituationsAction.CreateSituations(situation))
        .pipe(
          takeUntil(this.destroy$),
          switchMap(() => this.store.select(SituationsState.createdSituation)),
          filter((t) => !!t),
          take(1)
        )
        .subscribe(async (t) => {
        });
    }
  }

  close() {
    this.store.dispatch(new BrowseSituationsAction.ToggleDialog({}));
  }

  clear() {
    const situationId = this._situationId;
    this.situationId = null;
    this.situationId = situationId;
  }

  tab(index: number) {
  }

  public loadAttachmentPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseSituationsAction.LoadAttachmentSituations({
        id: this._situationId,
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  async loadAttachComponent() {
    this.attachPlanContainer?.clear();
    if (this.attachPlanComponent) return;
    this.attachPlanContainer?.clear();
    const {FilesListComponent} = await import(
      '@shared/attachments-list/files-list/files-list.component'
      );
    const factory = this.cfr.resolveComponentFactory(FilesListComponent);

    const {instance, changeDetectorRef: cdr} =
      this.attachPlanContainer.createComponent(factory, null, this.injector);
    const situation = this.store.selectSnapshot(SituationsState.situation);

    instance.recordId = this._situationId;
    instance.foreignHelperId = (situation?.id as any)?.id;
    instance.tagId = this.type ? 32 : 33;
    instance.inline = true;
    this.attachPlanComponent = instance;
    cdr.detectChanges();
  }
  customSort(event: SortEvent) {
    this.store.dispatch(
      new BrowseSituationsAction.SortAttachments({ field: event.field })
    );
  }

  ngAfterViewChecked() {
    const checkAttachment = this.privilegesService.checkActionPrivilege('PRIV_ADD_FILE_SITUATION');
    const checkAdd = this.privilegesService.checkActionPrivilege('PRIV_ADD_SITUATION');
    const checkEdit = this.privilegesService.checkActionPrivilege('PRIV_ED_DEL_SITUATION');
    if (checkAttachment) {
      if (checkEdit) {

      } else if (checkAdd) {
        if (this._situationId) {
          if (this.form) {
            try {
              this.form.disable();
            } catch {
            }
          }
        }
      } else {
        if (this.form) {
          try {
            this.form.disable();
          } catch {
          }
        }
      }
    }
  }
}
