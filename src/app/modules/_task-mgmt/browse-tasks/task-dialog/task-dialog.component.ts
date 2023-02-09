import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegxConst } from '@core/constant/RegxConst';
import { MessageHelper } from '@core/helpers/message.helper';
import { IAuthService } from '@core/services/auth.service';
import { OrgAction, OrgState, TaskAction, TaskState } from '@core/states';
import { FormUtils } from '@core/utils/form.utils';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { OrgStructure, TaskDetails } from 'src/app/api/models';
import { BrowseTasksAction } from '../../states/browse-tasks.action';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  RegxConst = RegxConst;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(OrgState.orgs)
  orgs$: Observable<OrgStructure[]>;
  @Select(TaskState.blocking)
  blocking$: Observable<boolean>;

  @Input()
  orgsTree: TreeNode[];
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};

  destroy$ = new Subject();

  _taskId: number;
  get loggedinTaskId() {
    return this.auth.getClaim('sub');
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
    private messageHelper: MessageHelper,
    private translate: TranslateService,
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.activeTab = 0;
    const orgId = this.auth.getClaim('orgId');
    this.form = this.formBuilder.group({
      nameEn: ['', [Validators.required, GenericValidators.english]],
      nameAr: ['', [Validators.required, GenericValidators.arabic]],
      desEn: ['', [Validators.required, GenericValidators.english]],
      desAr: ['', [Validators.required, GenericValidators.arabic]],
      orgId: [{ key: orgId }, Validators.required],
      isActive: [true],
      inherited: [false],
      privileges: this.formBuilder.group({}),
    });
    this.defaultFormValue = { isActive: true };
    this.orgs$
      .pipe(
        takeUntil(this.destroy$),
        filter((orgs) => !!orgs),
        take(1),
        tap((orgs) => {
          const org = orgs?.find((o) => o.id === orgId);
          this.defaultFormValue = {
            ...this.defaultFormValue,
            orgId: {
              key: org?.id,
              labelAr: org?.nameAr,
              labelEn: org?.nameEn,
            },
          };
          if (org) {
            this.form.patchValue({
              orgId: this.defaultFormValue.orgId,
            });
          }
        })
      )
      .subscribe();

    this.form
      .get('orgId')
      .valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((org: TreeNode) => {
        this.store.dispatch(
          new OrgAction.LoadModules({ orgId: org?.key as any })
        );
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

    task.orgId = { id: task.orgId?.key };
    task.inherited = task.inherited ? 1 : 0;
    let privileges = [];

    Object.keys(task.privileges)
      .map((key) => task.privileges[key])
      .forEach((m) => {
        Object.keys(m).forEach((k) => {
          if (m[k]) {
            privileges = [...privileges, { id: k }];
          }
        });
      });

    if (privileges.length === 0) {
      this.messageHelper.error({
        detail: this.translate.instant(
          'USER_MANAGEMENT.ROLES.PIVILEGES.SELECT_ONE'
        ),
        severity: 'warn',
      });
      return;
    }

    task.privileges = privileges;
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
