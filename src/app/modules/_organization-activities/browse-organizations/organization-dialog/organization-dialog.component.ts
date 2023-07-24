import {Component, ComponentFactoryResolver, Injector, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonDataState, TaskAction, TaskState, UserState} from "@core/states";
import {catchError, filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {EMPTY, Observable, Subject} from "rxjs";
import {Dialog} from "primeng/dialog";
import {IdNameProjection, IncidentIdSubjectProjection, TaskDetails} from "../../../../api/models";
import {IncidentState} from "@core/states/incident/incident.state";
import {IAuthService} from "@core/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {PrivilegesService} from "@core/services/privileges.service";
import {TaskDialogComponent} from "../../../_task-mgmt/browse-tasks/task-dialog/task-dialog.component";
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";
import {TreeNode} from "primeng/api";
import {FormUtils} from "@core/utils/form.utils";
import {TabView} from "primeng/tabview";
import {OrgActivityAction} from "@core/states/org-activities/orgActivity.action";
import {OrgActivityState} from "@core/states/org-activities/orgActivity.state";
import {BrowseOrganizationAction} from "../../states/browse-organization.action";
import {ActivityFrquencyState} from "@core/states/bc/activity-frquency/activity-frquency.state";
import {BcActivityFrequencies} from "../../../../api/models/bc-activity-frequencies";
import {OrgDetailState} from "@core/states/bc/org-details/org-detail.state";
import {BcOrgHierarchyType} from "../../../../api/models/bc-org-hierarchy-type";
import {BcOrgHierarchy} from "../../../../api/models/bc-org-hierarchy";

@Component({
  selector: 'app-organization-dialog',
  templateUrl: './organization-dialog.component.html',
  styleUrls: ['./organization-dialog.component.scss']
})
export class OrganizationDialogComponent implements OnInit, OnDestroy {

  @ViewChild(Dialog) dialog: Dialog;
  @ViewChild(TabView) tabv: TabView;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;
  justifyOptions = [
    {icon: 'pi pi-user', nameAr: 'خارجي', nameEn: 'External'},
    {icon: 'pi pi-tablet', nameAr: 'داخلي', nameEn: 'Internal'},
  ];
  @Select(ActivityFrquencyState.page)
  activityFre$: Observable<BcActivityFrequencies[]>;

  @Select(TaskState.blocking)
  blocking$: Observable<boolean>;


  sector$: Observable<any>;
  section$: Observable<any>;
  department$: Observable<BcOrgHierarchy[]>;

  public get asDialog() {
    return this.route.component !== TaskDialogComponent;
  }

  public get closedStatus() {
    const task = this.store.selectSnapshot(TaskState.task);
    return this.store
      .selectSnapshot(CommonDataState.taskStatuses)
      .find((s) => s.id === task?.statusId)?.closedStatus;
  }

  @Input()
  orgsTree: TreeNode[];
  viewOnly$: Observable<boolean>;

  @Select(IncidentState.incidents)
  incidents$: Observable<IncidentIdSubjectProjection[]>;

  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};

  destroy$ = new Subject();

  _orgActivityId: number;
  get loggedinTaskId() {
    return this.auth.getClaim('sub');
  }

  get loggedinOrgId() {
    return this.auth.getClaim('orgId');
  }

  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }

  get editMode() {
    return this._orgActivityId !== undefined && this._orgActivityId !== null;
  }

  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly' ||
      this.closedStatus
    );
  }
  @Input()
  set orgActivityId(v: number) {
    this._orgActivityId = v;
    this.buildForm();

    this.store
      .dispatch(new OrgActivityAction.GetOrgActivities({ id: v }))
      .pipe(
        switchMap(() => this.store.select(OrgActivityState.orgActivity)),
        takeUntil(this.destroy$),
        take(1),
        filter((t) => !!t),
        tap((TaskDetails) => {
          console.log('test');
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
    private translateObj: TranslateObjPipe,
    private privileges: PrivilegesService,
    private router: Router
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.orgActivityId = id;
      });


    this.viewOnly$ = this.route.queryParams.pipe(
      map((params) => params['_mode'] === 'viewonly')
    );
  }

  updateStatus(status: IdNameProjection) {
    this.store.dispatch(
      new TaskAction.UpdateStatus({ id: this._orgActivityId, statusId: status.id })
    );
  }

  ngOnInit() {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
    /*this.department$.pipe(
      filter((p) => !!p),
      map((items) => items.filter((item) => item.bcOrgHirType?.id === 2))
    ).subscribe();*/

    this.department$ = this.store.select(OrgDetailState.orgHir).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          if (u?..id === 2) {
            return {
              ...u
            };
          }
        })
      )
    );
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  buildForm() {
    this.activeTab = 0;
    this.form = this.formBuilder.group({
      sector: [null, [Validators.required]],
      dept: [null, [Validators.required]],
      section: [null, [Validators.required]],
      nameAr: [null, [Validators.required]],
      nameEn: [null, [Validators.required]],
      activityDesc: [null],
      activityFreq: [null],
      arisGuid: [null],
      activityArea: [true]
    });
    this.defaultFormValue = { dueDate: new Date(), modifiable: true };
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
      id: this._orgActivityId,
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


    if (this.editMode) {
      !this.viewOnly &&
      this.store
        .dispatch(new BrowseOrganizationAction.UpdateOrganization(task))
        .pipe(
          tap(() => {
            setTimeout(() => {
              this.close();
            }, 1200);
          }),
          catchError(() => {
            return EMPTY;
          }),
          takeUntil(this.destroy$),
          take(1)
        )
        .subscribe();
    } else {
      this.store
        .dispatch(new BrowseOrganizationAction.CreateOrganization(task))
        .pipe(
          takeUntil(this.destroy$),
          switchMap(() => this.store.select(TaskState.createdTask)),
          filter((t) => !!t),
          take(1)
        )
        .subscribe(async (t) => {});
    }
  }

  clear() {
    const orgActivityId = this._orgActivityId;
    this.orgActivityId = null;
    this.orgActivityId = orgActivityId;
  }

  get redirect() {
    return [this.route.snapshot.queryParams['_redirect'] ?? '..'];
  }

  close() {
    if (this.asDialog) {
      this.store.dispatch(new BrowseOrganizationAction.ToggleDialog({}));
    } else {
      this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }
}
