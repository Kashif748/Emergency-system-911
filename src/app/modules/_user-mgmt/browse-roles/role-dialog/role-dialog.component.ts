import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegxConst } from '@core/constant/RegxConst';
import { MessageHelper } from '@core/helpers/message.helper';
import { IAuthService } from '@core/services/auth.service';
import { OrgAction, OrgState, RoleAction, RoleState } from '@core/states';
import { FormUtils } from '@core/utils/form.utils';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  OrgStructure,
  RoleProjection,
  UserModulePrivilegeProjection,
} from 'src/app/api/models';
import { BrowseRolesAction } from '../../states/browse-roles.action';
import { BrowseRolesState } from '../../states/browse-roles.state';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss'],
})
export class RoleDialogComponent implements OnInit {
  RegxConst = RegxConst;

  opened$: Observable<boolean>;
  @Input()
  activeTab: number = 0;

  @Select(OrgState.orgs)
  orgs$: Observable<OrgStructure[]>;
  @Select(RoleState.blocking)
  blocking$: Observable<boolean>;

  @Select(OrgState.modulesLoading)
  modulesLoading$: Observable<boolean>;

  modules$: Observable<any>;
  @Input()
  orgsTree: TreeNode[];
  viewOnly$: Observable<boolean>;

  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};

  destroy$ = new Subject();

  _roleId: number;
  get loggedinRoleId() {
    return this.auth.getClaim('sub');
  }

  get editMode() {
    return this._roleId !== undefined && this._roleId !== null;
  }

  @Input()
  set roleId(v: number) {
    this._roleId = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new RoleAction.GetRole({ id: v }))
      .pipe(
        switchMap(() => this.store.select(RoleState.role)),
        takeUntil(this.destroy$),
        take(1),
        tap((role: RoleProjection) => {
          this.defaultFormValue = {
            ...this.defaultFormValue,
            ...role,
            orgId: {
              key: role.orgId?.id,
              labelAr: role.orgId?.nameAr,
              labelEn: role.orgId?.nameEn,
            },
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
    this.modules$ = this.store.select(OrgState.modules).pipe(
      filter((ms) => !!ms),
      map((modules) => {
        const flatedModules = [];
        this.flatModules(modules, flatedModules);
        this.initPrivsForm(flatedModules);
        return flatedModules;
      })
    );
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.roleId = id;
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

  flatModules(modulesArr: UserModulePrivilegeProjection[], acc: any[]) {
    modulesArr.forEach((m) => {
      if (m.privileges) {
        acc.push({ module: m.module, privileges: m.privileges });
      }
      if (Object.getOwnPropertyNames(m).includes('children')) {
        m.children.forEach((sm) => {
          if (sm.privileges) {
            acc.push({ module: sm.module, privileges: sm.privileges });
          }
        });
      }
    });
  }

  initPrivsForm(allModules) {
    const viewOnly = this.route.snapshot.queryParams['_mode'] === 'viewonly';
    const assignedPrivs = this.defaultFormValue?.privileges as any[];
    for (let m of allModules) {
      let privsGroup = this.form.get('privileges') as FormGroup;

      privsGroup.setControl(`${m.module.id}`, this.formBuilder.group({}));
      let moduleGroup = this.form
        .get('privileges')
        .get(`${m.module.id}`) as FormGroup;

      for (let p of m.privileges) {
        moduleGroup.setControl(
          p.id,
          new FormControl({
            value: !!assignedPrivs?.find((pr) => pr.id == p.id),
            disabled: viewOnly,
          })
        );
      }
    }
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

    const role = {
      ...this.form.getRawValue(),
    };

    role.orgId = { id: role.orgId?.key };
    role.inherited = role.inherited ? 1 : 0;
    let privileges = [];

    Object.keys(role.privileges)
      .map((key) => role.privileges[key])
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

    role.privileges = privileges;
    role.id = this._roleId;
    if (this.editMode) {
      this.store.dispatch(new BrowseRolesAction.UpdateRole(role));
    } else {
      this.store.dispatch(new BrowseRolesAction.CreateRole(role));
    }
  }

  clear() {
    this.store.dispatch(new RoleAction.GetRole({}));
    this.form.reset();
    this.form.patchValue({
      ...this.defaultFormValue,
    });
  }

  close() {
    this.store.dispatch(new BrowseRolesAction.ToggleDialog({}));
  }
}
