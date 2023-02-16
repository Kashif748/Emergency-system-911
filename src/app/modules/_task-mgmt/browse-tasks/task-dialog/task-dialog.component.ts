import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import * as Task from 'esri/tasks/Task';
import { TreeNode } from 'primeng/api';
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
  TaskType,
} from 'src/app/api/models';
import { BrowseTasksAction } from '../../states/browse-tasks.action';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
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

  @Select(CommonDataState.assetsCategories)
  public assetsCategories$: Observable<AssetsCategoryProjection[]>;

  @Select(AssetState.assets)
  public assets$: Observable<OrgAssetsProjection[]>;

  @Select(IncidentState.transLoading)
  incidentLoading$: Observable<boolean>;

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
            // orgId: {
            //   key: task.orgId?.id,
            //   labelAr: task.orgId?.nameAr,
            //   labelEn: task.orgId?.nameEn,
            // },
          };
          this.form.patchValue({
            ...this.defaultFormValue,
            privileges: {},
          });
        })
      )
      .subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private auth: IAuthService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.taskId = id;
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
    assets?: any;
    qty?: number;
    Pqty?: number;
    details?: string;
  }) {
    !this.form.contains('category') &&
      this.form.addControl(
        'category',
        this.formBuilder.control(value?.category, [Validators.required])
      );

    !this.form.contains('assets') &&
      this.form.addControl(
        'assets',
        this.formBuilder.control(value?.assets, [Validators.required])
      );

    !this.form.contains('qty') &&
      this.form.addControl(
        'qty',
        this.formBuilder.control(value?.qty, [Validators.required])
      );

    !this.form.contains('Pqty') &&
      this.form.addControl('Pqty', this.formBuilder.control(value?.Pqty));

    !this.form.contains('details') &&
      this.form.addControl('details', this.formBuilder.control(value?.details));
  }

  removeAssetFields() {
    this.form.contains('category') && this.form.removeControl('category');
    this.form.contains('assets') && this.form.removeControl('assets');
    this.form.contains('qty') && this.form.removeControl('qty');
    this.form.contains('Pqty') && this.form.removeControl('Pqty');
    this.form.contains('details') && this.form.removeControl('details');
  }

  buildForm() {
    this.activeTab = 0;
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskType: [null, [Validators.required]],
      assignTo: [null, [Validators.required]],
      // assets: [null],
      dueDate: [new Date(), [Validators.required]],
      status: [null],
      // qty: [null],
      // Pqty: [null],
      // category: [null],
      newLocation: [false],
      modifiable: [true],
      featureName: [null],
      body: [null, [Validators.required]],
      // details: [null],
      incidentId: [null, [Validators.required]],

      assingeeType: [null, Validators.required],
    });
    this.defaultFormValue = { dueDate: new Date(), modifiable: true };

    this.form
      .get('incidentId')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(() => {
        this.form.get('assingeeType').reset();
        this.form.get('assignTo').reset();
      });

    this.form
      .get('assingeeType')
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

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const task = {
      ...this.form.getRawValue(),
    };

    task.id = this._taskId;
    if (this.editMode) {
      this.store.dispatch(new BrowseTasksAction.UpdateTask(task));
    } else {
      this.store.dispatch(new BrowseTasksAction.CreateTask(task));
    }
  }

  clear() {
    this.store.dispatch(new TaskAction.GetTask({}));
    this.form.reset();
    this.form.patchValue({
      ...this.defaultFormValue,
    });
  }

  close() {
    this.store.dispatch(new BrowseTasksAction.ToggleDialog({}));
  }
}
