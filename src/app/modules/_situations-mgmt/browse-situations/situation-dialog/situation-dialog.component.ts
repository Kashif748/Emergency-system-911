import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDataState } from '@core/states';
import { SituationsAction } from '@core/states/situations/situations.action';
import { SituationsState } from '@core/states/situations/situations.state';
import { FormUtils } from '@core/utils';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SituationProjection } from 'src/app/api/models';
import { BrowseSituationsAction } from '../../states/browse-situations.action';
import { Dialog } from 'primeng/dialog';
import { TabView } from 'primeng/tabview';
import { FilesListComponent } from '@shared/attachments-list/files-list/files-list.component';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import {
  BrowseSituationsState,
  BrowseSituationsStateModel,
} from '../../states/browse-situations.state';
import { SituationAttachmentDetails } from '../../../../api/models/situation-attachment-details';
import { PrivilegesService } from '@core/services/privileges.service';
import { AlertnessLevel } from '../../../../api/models/alertness-level';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { MessageHelper } from '@core/helpers/message.helper';
import { IAuthService } from '@core/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { AttachmentsService } from 'src/app/_metronic/core/services/attachments.service';
import {TaskStatus} from "../../../../api/models";

@Component({
  selector: 'app-situation-dialog',
  templateUrl: './situation-dialog.component.html',
  styleUrls: ['./situation-dialog.component.scss'],
})
export class SituationDialogComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  public attachmentPage$: Observable<SituationAttachmentDetails[]>;

  public alertnessLevel$: Observable<AlertnessLevel[]>;

  formDialog$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  plan$: Observable<boolean>;
  @ViewChild(Dialog) dialog: Dialog;
  @ViewChild(TabView) tabv: TabView;

  @Select(SituationsState.situationTotalRecords)
  public situationTotalRecords$: Observable<number>;

  @ViewChild('attachPlanContainer', { read: ViewContainerRef })
  attachPlanContainer: ViewContainerRef;
  attachPlanComponent: FilesListComponent;

  public get asDialog() {
    return this.route.component !== SituationDialogComponent;
  }

  totalRecords: number;

  @Select(CommonDataState.incidentCategories)
  public categories$: Observable<any[]>;

  public filterCategories$: Observable<any[]>;

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
    return this.route.snapshot.queryParams['_mode'] === 'viewonly';
  }

  _situationId: number;
  _mode: string;
  type: boolean;
  downloading = false;
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
      .dispatch(new SituationsAction.GetSituation({ id: v }))
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
            theme: t?.themeType,
          });
        })
      )
      .subscribe(() => {
        if (this.editAttachmentType) {
          this.loadAttachComponent();
        }
      });

    if (this.viewOnly) {
      const entityTags = this.store.selectSnapshot(CommonDataState.entityTags);

      this.store.dispatch(
        new BrowseSituationsAction.LoadAttachmentSituations({
          situationId: this._situationId,
          orgId: this.orgId,
          withSub: true,
        })
      );
      this.attachmentPage$ = this.store
        .select(SituationsState.situationAttachment)
        .pipe(
          filter((p) => !!p),
          map((attachments) => {
            return attachments.map((attachment) => {
              const tag = entityTags.find(
                (tag) => tag.id === attachment?.entityTag?.id
              );
              if (tag.description) {
                attachment = {
                  ...attachment,
                  description: JSON.parse(tag?.description),
                };
              }
              return attachment;
            });
          })
        );
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

  get orgId() {
    return this.auth.getClaim('orgId');
  }
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private privilegesService: PrivilegesService,
    private messageHelper: MessageHelper,
    private auth: IAuthService,
    private attachmentsService: AttachmentsService
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.situationId = id;
      });
    this.route.queryParams
      .pipe(
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
          } catch {}
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
          } catch {}
        }
      })
    );
  }

  ngOnInit(): void {
    this.buildForm();
    this.formDialog$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === '_form_dialog')
    );
    this.filterCategories$ = this.categories$.pipe(
      //map(category => category.filter(cat => cat.parent === null))  // task status is 8 for filter delete option
      map(categories => {
        const filteredCategories = categories.filter(cat => cat.parent === null);
        filteredCategories.sort((a, b) => a.serial - b.serial);
        return filteredCategories;
      }));
    this.store
      .dispatch(
        new SituationsAction.GetAlertnessLevel({
          page: 0,
          size: 10,
        })
      )
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        switchMap(
          () =>
            (this.alertnessLevel$ = this.store
              .select(SituationsState.alertness)
              .pipe(
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
        )
      )
      .subscribe();
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
      mainIncCategory: [null, [Validators.required]],
      theme: [null],
      alertnessLevel: [null],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
  }

  async submit() {
    if (this.editMode && this.editAttachmentType) {
    } else if (!this.form.valid) {
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
      if (this.editAttachmentType) {
        await this.attachPlanComponent?.upload(this._situationId, false);
        this.messageHelper.success();
        this.store.dispatch(new BrowseSituationsAction.LoadSituations());
        this.close();
      } else {
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
      }
    } else {
      this.store
        .dispatch(new BrowseSituationsAction.CreateSituations(situation))
        .pipe(
          takeUntil(this.destroy$),
          switchMap(() => this.store.select(SituationsState.createdSituation)),
          filter((t) => !!t),
          take(1)
        )
        .subscribe(async (t) => {});
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

  tab(index: number) {}

  public loadAttachmentPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseSituationsAction.LoadAttachmentSituations({
        situationId: this._situationId,
        orgId: this.orgId,
        withSub: true,
      })
    );
  }

  async loadAttachComponent() {
    this.attachPlanContainer?.clear();
    if (this.attachPlanComponent) return;
    this.attachPlanContainer?.clear();
    const { FilesListComponent } = await import(
      '@shared/attachments-list/files-list/files-list.component'
    );
    const factory = this.cfr.resolveComponentFactory(FilesListComponent);

    const { instance, changeDetectorRef: cdr } =
      this.attachPlanContainer.createComponent(factory, null, this.injector);
    const situation = this.store.selectSnapshot(SituationsState.situation);
    instance.withOrgId = true;

    instance.recordId = this._situationId;
    instance.foreignHelperId = (situation?.id as any)?.id;
    instance.tagId = this.type
      ? UploadTagIdConst.PLAN_SITUATION
      : UploadTagIdConst.SHIFT_SITUATION;
    instance.inline = true;
    this.attachPlanComponent = instance;
    cdr.detectChanges();
  }
  customSort(event: SortEvent) {
    // this.store.dispatch(
    //   new BrowseSituationsAction.SortAttachments({ field: event.field })
    // );
  }

  download(uuid, fileName) {
    this.downloading = true;
    this.attachmentsService
      .downloadFile(uuid)
      .subscribe((response: HttpResponse<Blob>) => {
        this.downloading = false;

        const binaryData = [];
        binaryData.push(response.body);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: 'blob' })
        );
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  ngAfterViewChecked() {
    const checkAttachment = this.privilegesService.checkActionPrivilege(
      'PRIV_ADD_FILE_SITUATION'
    );
    const checkAdd =
      this.privilegesService.checkActionPrivilege('PRIV_ADD_SITUATION');
    const checkEdit = this.privilegesService.checkActionPrivilege(
      'PRIV_ED_DEL_SITUATION'
    );
    if (checkAttachment) {
      if (checkEdit) {
      } else if (checkAdd) {
        if (this._situationId) {
          if (this.form) {
            try {
              this.form.disable();
            } catch {}
          }
        }
      } else {
        if (this.form) {
          try {
            this.form.disable();
          } catch {}
        }
      }
    }
  }
}
