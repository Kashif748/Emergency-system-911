import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { IAuthService } from '@core/services/auth.service';
import {
  AssetAction,
  AssetState,
  CommonDataState,
  TaskAction,
  TaskState,
  UserAction,
  UserState,
} from '@core/states';
import { IncidentAction } from '@core/states/incident/incident.action';
import { IncidentState } from '@core/states/incident/incident.state';
import { FormUtils } from '@core/utils/form.utils';
import { Select, Store } from '@ngxs/store';
import { FilesListComponent } from '@shared/attachments-list/files-list/files-list.component';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { MapComponent } from '@shared/sh-components/map/map.component';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { TreeNode } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { Observable, Subject } from 'rxjs';
import {
  auditTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  AssetsCategoryProjection,
  IdNameProjection,
  IncidentIdSubjectProjection,
  OrgAssetsProjection,
  PriorityProjection,
  TaskDetails,
  TaskStatus,
  TaskType,
} from 'src/app/api/models';
import { BrowseTasksAction } from '../../states/browse-tasks.action';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  UploadTagIdConst = UploadTagIdConst;
  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(IncidentState.orgs)
  orgs$: Observable<IdNameProjection[]>;

  @Select(UserState.users)
  users$: Observable<IdNameProjection[]>;

  @Select(TaskState.groups)
  groups$: Observable<IdNameProjection[]>;

  @Select(TaskState.blocking)
  blocking$: Observable<boolean>;

  @Select(CommonDataState.priorities)
  public priorities$: Observable<PriorityProjection[]>;

  @Select(CommonDataState.taskTypes)
  public types$: Observable<TaskType[]>;
  public nonOrgTypes$: Observable<TaskType[]>;
  public disabledTypes$: Observable<TaskType[]>;

  @Select(CommonDataState.taskStatuses)
  public statuses$: Observable<TaskStatus[]>;

  @Select(CommonDataState.assetsCategories)
  public assetsCategories$: Observable<AssetsCategoryProjection[]>;

  @Select(AssetState.assets)
  public assets$: Observable<OrgAssetsProjection[]>;

  @Select(IncidentState.transLoading)
  incidentLoading$: Observable<boolean>;

  @ViewChild('incidentId') incidentDropdown: Dropdown;
  @ViewChild('assignTo') assigneeDropdown: Dropdown;

  @ViewChildren(Dropdown) dropdowns: QueryList<Dropdown>;

  @ViewChild('attachContainer', { read: ViewContainerRef })
  attachContainer: ViewContainerRef;
  attachComponent: FilesListComponent;

  @ViewChild('mapContainer', { read: ViewContainerRef })
  mapContainer: ViewContainerRef;
  mapComponent: MapComponent;

  @ViewChild('workLogContainer', { read: ViewContainerRef })
  workLogContainer: ViewContainerRef;

  @ViewChild('notificationsContainer', { read: ViewContainerRef })
  notificationsContainer: ViewContainerRef;

  public get minDate() {
    return new Date();
  }

  @Input()
  orgsTree: TreeNode[];
  viewOnly$: Observable<boolean>;

  @Select(IncidentState.incidents)
  incidents$: Observable<IncidentIdSubjectProjection[]>;

  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};

  destroy$ = new Subject();

  private auditLoadIncidents$ = new Subject<string>();
  private auditLoadUsers$ = new Subject<string>();
  private auditLoadGroups$ = new Subject<string>();
  private auditLoadAssets$ = new Subject<string>();

  _taskId: number;
  get loggedinTaskId() {
    return this.auth.getClaim('sub');
  }

  get loggedinOrgId() {
    return this.auth.getClaim('orgId');
  }

  get editMode() {
    return this._taskId !== undefined && this._taskId !== null;
  }

  @Input()
  set taskId(v: number) {
    this._taskId = v;
    this.buildForm();
    this.mapContainer?.clear();
    this.mapComponent = undefined;
    this.attachContainer?.clear();
    this.attachComponent = undefined;
    this.notificationsContainer?.clear();

    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new TaskAction.GetTask({ id: v }))
      .pipe(
        switchMap(() => this.store.select(TaskState.task)),
        takeUntil(this.destroy$),
        take(1),
        tap((task: TaskDetails) => {
          this.defaultFormValue = {
            ...this.defaultFormValue,
            ...task,
            dueDate: new Date(task.dueDate),
            assigneeType: task.assignTo?.type,
            priorityId: { id: task.priorityId },
            statusId: { id: task.statusId },
          };
          this.form.patchValue({
            ...this.defaultFormValue,
          });

          this.form.patchValue({
            assignTo: task.assignTo,
          });
          // insure incident dropdown is in the right state
          const incidentSubject = (task.incidentId as any)?.subject;
          this.incidentDropdown.filterValue = incidentSubject;
          this.loadIncidents(incidentSubject, true);

          // insure assignee dropdown is in the right state
          this.dropdowns.changes
            .pipe(take(1))
            .subscribe((dropdowns: QueryList<Dropdown>) => {
              dropdowns
                .filter((d) => d.inputId === 'assignTo')
                .forEach((d) => {
                  d.filterValue = this.translateObj.transform(task.assignTo);
                });
            });
          switch (task.assignTo?.type) {
            case 'user':
              this.loadUsers(this.translateObj.transform(task.assignTo), true);
              break;
            case 'group':
              this.loadGroups(this.translateObj.transform(task.assignTo), true);
              break;
            case 'org':
              this.loadOrgs((task.incidentId as any)?.id);
              break;
            default:
              break;
          }

          if (task.taskType?.type === 'supplies') {
            this.addAssetFields({
              asset: (task.taskType as any)?.asset,
              category: (task.taskType as any)?.asset?.assetsCategory,
              details: task.taskType?.desc,
              requestQuantity: (task.taskType as any)?.requestQuantity,
              provisionedQuantity: (task.taskType as any)?.provisionedQuantity,
            });
          }
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private auth: IAuthService,
    private route: ActivatedRoute,
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private translateObj: TranslateObjPipe
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.taskId = id;
      });

    this.nonOrgTypes$ = this.types$.pipe(
      map((ts) =>
        ts.map((t) => {
          return { ...t, disabled: t.nameEn?.toLowerCase() === 'supplies' };
        })
      )
    );
    this.disabledTypes$ = this.types$.pipe(
      map((ts) =>
        ts.map((t) => {
          return { ...t, disabled: true };
        })
      )
    );
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
  }

  ngOnInit() {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    this.auditLoadIncidents$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((searchText) => {
        this.store.dispatch(
          new IncidentAction.LoadIncidents({ subject: searchText })
        );
      });

    this.auditLoadUsers$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search) => {
        this.store.dispatch(
          new UserAction.LoadUsers({
            search,
            page: 0,
            size: 15,
          })
        );
      });

    this.auditLoadGroups$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search) => {
        this.store.dispatch(
          new TaskAction.LoadGroups({
            search,
            page: 0,
            size: 15,
          })
        );
      });

    this.auditLoadAssets$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search) => {
        this.store.dispatch(
          new AssetAction.LoadAssets({
            search,
            orgId: this.loggedinOrgId,
            categoryId: this.form.get('category').value?.id,
            page: 0,
            size: 15,
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadIncidents(searchText?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new IncidentAction.LoadIncidents({ subject: searchText })
      );
      return;
    }
    this.auditLoadIncidents$.next(searchText);
  }

  loadUsers(search?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new UserAction.LoadUsers({
          search,
          page: 0,
          size: 15,
        })
      );
      return;
    }
    this.auditLoadUsers$.next(search);
  }

  loadAssets(search?: string, direct = false) {
    if (!this.form.get('category').value) {
      this.store.dispatch(
        new AssetAction.LoadAssets({
          clear: true,
        })
      );
      return;
    }

    if (direct) {
      this.store.dispatch(
        new AssetAction.LoadAssets({
          search,
          orgId: this.loggedinOrgId,
          categoryId: this.form.get('category').value?.id,
          page: 0,
          size: 15,
        })
      );
      return;
    }
    this.auditLoadAssets$.next(search);
  }

  loadOrgs(incidentId: number) {
    this.store.dispatch(new IncidentAction.LoadOrgs({ incidentId }));
  }

  loadGroups(search?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new TaskAction.LoadGroups({
          search,
          page: 0,
          size: 15,
        })
      );
      return;
    }
    this.auditLoadGroups$.next(search);
  }

  addAssetFields(value?: {
    category?: any;
    asset?: any;
    requestQuantity?: number;
    provisionedQuantity?: number;
    details?: string;
  }) {
    !this.form.contains('category') &&
      this.form.addControl(
        'category',
        this.formBuilder.control(value?.category, [Validators.required])
      );

    !this.form.contains('asset') &&
      this.form.addControl(
        'asset',
        this.formBuilder.control(value?.asset, [Validators.required])
      );

    if (value?.asset) {
      // insure asset dropdown is in the right state
      this.dropdowns.changes
        .pipe(take(1))
        .subscribe((dropdowns: QueryList<Dropdown>) => {
          dropdowns
            .filter((d) => d.inputId === 'asset')
            .forEach((d) => {
              d.filterValue = this.translateObj.transform(value.asset);
            });
        });
      this.loadAssets(this.translateObj.transform(value.asset), true);
    }

    !this.form.contains('requestQuantity') &&
      this.form.addControl(
        'requestQuantity',
        this.formBuilder.control(value?.requestQuantity, [Validators.required])
      );

    !this.form.contains('provisionedQuantity') &&
      this.form.addControl(
        'provisionedQuantity',
        this.formBuilder.control(value?.provisionedQuantity)
      );

    !this.form.contains('details') &&
      this.form.addControl('details', this.formBuilder.control(value?.details));

    this.form
      .get('category')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(() => {
        this.form.contains('asset') && this.form.get('asset').reset();
      });
  }

  removeAssetFields() {
    this.form.contains('category') && this.form.removeControl('category');
    this.form.contains('asset') && this.form.removeControl('asset');
    this.form.contains('requestQuantity') &&
      this.form.removeControl('requestQuantity');
    this.form.contains('provisionedQuantity') &&
      this.form.removeControl('provisionedQuantity');
    this.form.contains('details') && this.form.removeControl('details');
  }

  buildForm() {
    this.activeTab = 0;
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      priorityId: [null, [Validators.required]],
      taskType: [null, [Validators.required]],
      assignTo: [null, [Validators.required]],
      dueDate: [new Date(), [Validators.required]],
      statusId: [null],
      newLocation: [false],
      modifiable: [true],
      featureName: [null],
      body: [null, [Validators.required]],
      incidentId: [null, [Validators.required]],
      assigneeType: [null, Validators.required],
    });
    this.defaultFormValue = { dueDate: new Date(), modifiable: true };

    this.form
      .get('incidentId')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(() => {
        this.form.get('assigneeType').reset();
        this.form.get('assignTo').reset();
      });

    this.form
      .get('assigneeType')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(() => {
        this.form.get('assignTo').reset();
      });

    this.form
      .get('taskType')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((t) => {
        if (t?.nameEn === 'Supplies') {
          this.addAssetFields();
        } else {
          this.removeAssetFields();
        }
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

    let task = {
      ...this.form.getRawValue(),
      id: this._taskId,
    };

    task = {
      ...task,
      assignTo: {
        assigneeId: task.assignTo.id,
        type: task.assigneeType,
      },
      incidentId: task.incidentId.id,
      priorityId: task.priorityId.id,
      statusId: task.statusId?.id ?? 2,
      taskType: {
        typeId: task.taskType?.id,
        type: task.taskType?.type ?? task.taskType?.nameEn?.toLowerCase(),
        desc: task.details,
        requestQuantity: task.requestQuantity,
        provisionedQuantity: task.provisionedQuantity,
        asset: {
          id: task.asset?.id,
        },
      },
      //
      asset: undefined,
      category: undefined,
    };

    if (this.mapComponent?.gType) {
      task.featureName = this.mapComponent?.gType;
    }

    if (this.editMode) {
      this.store.dispatch(new BrowseTasksAction.UpdateTask(task));
      await this.attachComponent?.upload(this._taskId, false);
      this.saveMap(task);
      setTimeout(() => {
        this.store.dispatch(new BrowseTasksAction.ToggleDialog({}));
      }, 1200);
    } else {
      this.store
        .dispatch(new BrowseTasksAction.CreateTask(task))
        .pipe(
          takeUntil(this.destroy$),
          switchMap(() => this.store.select(TaskState.createdTask)),
          filter((t) => !!t),
          take(1)
        )
        .subscribe(async (t) => {
          await this.attachComponent?.upload(t.id, false);
          task.id = t.id;
          this.saveMap(task);
          setTimeout(() => {
            this.store.dispatch(new BrowseTasksAction.ToggleDialog({}));
          }, 1200);
        });
    }
  }

  async saveMap(task) {
    if (this.mapComponent && this.mapComponent?.gType) {
      const org = this.store.selectSnapshot(CommonDataState.currentOrg);
      const priority = this.store
        .selectSnapshot(CommonDataState.priorities)
        .find((p) => p.id === task.priorityId);

      const type = this.store
        .selectSnapshot(CommonDataState.taskTypes)
        .find((t) => t.id === task.taskType?.typeId);

      const result = await this.mapComponent.save({
        refId: Number.parseInt(task.id),
        title: task.title,
        orgName: org.code,
        levelId: 1,
        priorityId: `${priority?.nameAr ?? ''} / ${priority?.nameEn ?? ''}`,
        dueDate: task.dueDate,
        type: `${type?.nameAr ?? ''} / ${type?.nameEn ?? ''}`,
        inc_ref_id: task.incidentId,
      });
      task.featureName = result.gType;
    }
  }

  clear() {
    const taskId = this._taskId;
    this.taskId = null;
    this.taskId = taskId;
  }

  close() {
    this.store.dispatch(new BrowseTasksAction.ToggleDialog({}));
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

    instance.recordId = this._taskId;
    instance.tagId = UploadTagIdConst.TASKS;
    instance.inline = true;
    this.attachComponent = instance;
    cdr.detectChanges();
  }

  async loadMapComponent() {
    if (this.mapComponent) return;

    this.mapContainer?.clear();
    const { MapComponent } = await import(
      '@shared/sh-components/map/map.component'
    );
    const factory = this.cfr.resolveComponentFactory(MapComponent);

    const { instance, changeDetectorRef: cdr } =
      this.mapContainer.createComponent(factory, null, this.injector);

    const task = this.store.selectSnapshot(TaskState.task);

    instance.config = {
      mapType: MapViewType.TASK,
      showSaveButton: false,
      zoomModel: {
        referenceId: task?.id,
        featureName: task?.featureName as any,
      },
      showLayers: false,
    };

    instance.OnSaveMap.subscribe((response) => {
      // this.addLocationToMapFunc = response?.ff;
      this.form.get('featureName').patchValue(response?.gType);
      if (response) {
        this.form.get('newLocation').patchValue(true);
      }
      cdr.detectChanges();
    });

    this.mapComponent = instance;
    cdr.detectChanges();
  }

  async loadTaskWorkLog() {
    this.workLogContainer.clear();
    const { LogComponent } = await import(
      'src/app/modules/incidents/log/log.component'
    );
    const workLogFactory = this.cfr.resolveComponentFactory(LogComponent);
    const { instance, changeDetectorRef } =
      this.workLogContainer.createComponent(
        workLogFactory,
        null,
        this.injector
      );
    instance.id = this._taskId;
    instance.type = 'task';
    instance.height = '100%';
    changeDetectorRef.detectChanges();
  }

  async loadNotifications() {
    if (this.notificationsContainer?.length) return;

    this.notificationsContainer?.clear();
    const { NotificationsTableComponent } = await import(
      'src/app/shared/components/notifications-table/notifications-table.component'
    );
    const notificationsFactory = this.cfr.resolveComponentFactory(
      NotificationsTableComponent
    );
    const { instance, changeDetectorRef } =
      this.notificationsContainer.createComponent(
        notificationsFactory,
        null,
        this.injector
      );
    instance.recordId = this._taskId;
    instance.moduleId = 3;
    changeDetectorRef.detectChanges();
  }

  tab(index: number) {
    switch (index) {
      case 1:
        this.loadMapComponent();
        break;
      case 2:
        this.loadAttachComponent();
        break;
      case 3:
        this.loadTaskWorkLog();
        break;
      case 4:
        this.loadNotifications();
        break;
      default:
        break;
    }
  }
}
