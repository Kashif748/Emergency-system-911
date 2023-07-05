import {Component, ComponentFactoryResolver, Injector, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CommonDataState, TaskState} from '@core/states';
import { SituationsAction } from '@core/states/situations/situations.action';
import { SituationsState } from '@core/states/situations/situations.state';
import { FormUtils } from '@core/utils';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SituationProjection } from 'src/app/api/models';
import { BrowseSituationsAction } from '../../states/browse-situations.action';
import {TaskDialogComponent} from "../../../_task-mgmt/browse-tasks/task-dialog/task-dialog.component";
import {Dialog} from "primeng/dialog";
import {TabView} from "primeng/tabview";
import {UploadTagIdConst} from "@core/constant/UploadTagIdConst";
import {FilesListComponent} from "@shared/attachments-list/files-list/files-list.component";

@Component({
  selector: 'app-situation-dialog',
  templateUrl: './situation-dialog.component.html',
  styleUrls: ['./situation-dialog.component.scss'],
})
export class SituationDialogComponent implements OnInit, OnDestroy {
  formDialog$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  @ViewChild(Dialog) dialog: Dialog;
  @ViewChild(TabView) tabv: TabView;

  @ViewChild('attachContainer', { read: ViewContainerRef })
  attachContainer: ViewContainerRef;
  attachComponent: FilesListComponent;

  public get asDialog() {
    return this.route.component !== SituationDialogComponent;
  }

  @Select(CommonDataState.newsTypes)
  public newsTypes$: Observable<any[]>;

  @Select(SituationsState.blocking)
  blocking$: Observable<boolean>;

  @Input()
  loading: boolean;

  @Input()
  activeTab: number = 0;

  form: FormGroup;

  get editMode() {
    return this._situationId !== undefined && this._situationId !== null;
  }

  _situationId: number;
  _mode: string;
  @Input()
  set situationId(v: number) {
    this._situationId = v;
    this.buildForm();

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
            theme: t?.themeType,
            type: t?.newsType,
          });
        })
      )
      .subscribe();
  }

  destroy$ = new Subject();

  themeTypes = [
    {
      id: 0,
      color: 'golden',
      nameAr: 'المستوى الاستراتيجي',
      nameEn: 'Strategic Level',
    },
    {
      id: 1,
      color: 'silver',
      nameAr: 'المستوى العملياتي',
      nameEn: 'Operational Level',
    },
    {
      id: 2,
      color: 'bronze',
      nameAr: 'المستوى التكتيكي',
      nameEn: 'Tactical Level',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
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
  }

  ngOnInit(): void {
    this.buildForm();
    this.formDialog$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === '_form_dialog')
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      type: [null, [Validators.required]],
      theme: [null, [Validators.required]],
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
    } else {
      this.store
        .dispatch(new BrowseSituationsAction.CreateSituations(situation))
        .pipe(takeUntil(this.destroy$))
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
  tab(index: number) {
  }

  async loadAttachComponent() {
    if (this.attachComponent) return;

    this.attachContainer?.clear();
    const { FilesListComponent } = await import(
      '@shared/attachments-list/files-list/files-list.component'
      );
    const factory = this.cfr.resolveComponentFactory(FilesListComponent);

    const { instance, changeDetectorRef: cdr } =
      this.attachContainer.createComponent(factory, null, this.injector);
    const situation = this.store.selectSnapshot(SituationsState.situation);

    instance.recordId = this._situationId;
    instance.foreignHelperId = (situation?.id as any)?.id;
    instance.tagId = UploadTagIdConst.TASKS;
    instance.inline = true;
    this.attachComponent = instance;
    cdr.detectChanges();
  }
}
